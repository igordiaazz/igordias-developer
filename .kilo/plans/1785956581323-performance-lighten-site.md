# Plano: deixar o site mais leve (2ª fase — fontes + bundle do `motion`)

## Contexto
A 1ª fase (já implementada) cobriu os maiores vilões: WebGL pesado (`three`/`postprocessing`/`cobe`) foi colocado em chunks lazy e pausado fora da tela; a imagem `about` foi reduzida de 378KB→40KB (webp); código morto (`faulty-terminal`/`ogl`) foi removido. Build confirma `three` (562KB) e `cobe` (15KB) fora do bundle inicial.

Restam duas fontes de peso no carregamento inicial:
1. **Biblioteca `motion`** — chunk de ~120KB (`3rmuamm85290-.js`) no caminho inicial (hero, splash, `Section`, globe importam `motion`). É o maior custo de JS restante.
2. **Fontes via `<link>` externo bloqueante** (`src/app/[lang]/layout.tsx:49`): Noto Sans Latin + JP + KR + SC. Latin já poderia usar o **Geist** (já self-hosted via `next/font`); o CJK só é usado nos glifos do splash.

Decisões confirmadas com o usuário:
- **`motion`**: usar `LazyMotion` + componente `<m>` (features `domAnimation`), mantendo as animações.
- **Fontes**: texto em Latin usa **Geist** (já disponível); as fontes **CJK do Noto Sans são carregadas somente durante o splash** (injeta o `<link>` no mount do splash e remove ao terminar).

## Passos

### 1. Reduzir bundle do `motion` via LazyMotion
- Em `src/app/[lang]/layout.tsx`: envolver `{children}` e `<SplashScreen />` com `<LazyMotion features={domAnimation}>`.
  - Importar `LazyMotion, domAnimation` de `motion/react`.
  - Aviso: todo `<m.*>` precisa estar sob um `LazyMotion`; como hero/section/splash/globe estão sob `children` (ou splash é irmão direto), envolver ambos garante cobertura.
- Substituir `<motion.X>` por `<m.X>` nos arquivos:
  - `src/components/sections/hero.tsx` (h1, p, div)
  - `src/components/section.tsx` (`motion.section` → `m.section`)
  - `src/components/splash-screen.tsx` (`motion.div`, `motion.span`)
  - `src/components/ui/globe.tsx` (`motion.div`)
  - Manter `useReducedMotion` (funciona sob `LazyMotion`).
- Não usar `domMax` (sem drag/layout animations no projeto).

### 2. Otimizar fontes
- Em `src/app/[lang]/layout.tsx`: **remover** o `<link>` do Google Fonts (linhas 49-52) e os `preconnect` relacionados ao Google Fonts (ou manter só se úteis em outro lugar — não são).
  - O Latin já usa Geist via `font-sans` (variável `--font-geist-sans`). Confirmar em `globals.css` que `--font-sans` aponta para Geist; se houver fallback para Noto Sans Latin, remover.
- No splash (`src/components/splash-screen.tsx`): injetar dinamicamente (client-only, via effect) o stylesheet CJK **apenas quando o splash for exibido**:
  - No effect, se o splash vai mostrar (`!sessionStorage.getItem(FLAG)`), criar `link = document.createElement("link")` com `href` do Noto Sans JP/KR/SC (`display=swap`), `rel="stylesheet"`, append no `document.head`.
  - No cleanup/finish, remover esse `link` do head.
  - Assim o documento inicial não tem request bloqueante de fonte; o CJK aparece só no splash (FOUT breve dos glifos CJK é aceitável).
- Verificar se `hero.tsx` usa `fontFamily: Noto Sans...` (sim, no `style` do span do splash) — isso continua válido pois o CJK é injetado no splash.

### 3. (Opcional / menor) Ajustes de runtime WebGL
- `src/components/ui/globe.tsx`: reduzir `mapSamples: 16000` → `8000` (menor custo de geração do mapa, sem impacto visual relevante).
- PixelBlast já está lazy + pausado; sem mudança necessária.

## Riscos / pontos de atenção
- `LazyMotion` com `domAnimation` **não** inclui gestos (drag) nem layout animations. O projeto não usa esses recursos — verificar com grep que não há `drag`, `layout`, `whileHover`/gestures além do básico.
- O provider `LazyMotion` deve envolver **todos** os usos de `<m>`; esquecer um componente gera erro de runtime ("you have to wrap..."). Cobrir layout (children + SplashScreen).
- A injeção de fonte CJK no splash pode causar FOUT nos caracteres `你好/こんにちは/안녕하세요/Привет`. Aceitável; se o usuário quiser zero-FOUT, alternativa é `next/font` para CJK (porém aumenta o peso do chunk do splash).
- Remover o `<link>` global pode quebrar a exibição de CJK em **outros lugares** além do splash — checar se algum texto do site usa CJK fora do splash (provavelmente não).

## Validação
- `npm run build` e conferir chunks: o chunk do `motion` deve encolher (~30–50%); `three`/`cobe` seguem em chunks separados (lazy).
- `npm run start` + DevTools → Network: sem request a `fonts.googleapis.com` no carregamento inicial; o `<link>` CJK aparece só durante o splash e some depois.
- Lighthouse / Performance: melhoria em TBT e LCP; sem erros de runtime do `LazyMotion` (abrir home em PT e EN, e o splash em visita nova).
- Verificar visualmente que animações de hero/sections/splash/globe continuam iguais.

## Perguntas em aberto
- Acceptável o breve FOUT dos glifos CJK no splash, ou prefere `next/font` (CJK self-hosted, sem FOUT, porém chunk do splash maior)?
