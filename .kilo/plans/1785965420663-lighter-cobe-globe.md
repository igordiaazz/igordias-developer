# Deixar o globo (cobe) mais leve

## Contexto
O site usa o componente `Cobe` do ElDoraUI em `src/components/sections/languages.tsx` (lado esquerdo da seção de idiomas). Ele é carregado via `dynamic(..., { ssr: false })`. Hoje o componente (`src/components/eldoraui/cobe-globe.tsx`):
- depende de `react-spring` (puxa ~250 pacotes) só para o efeito de "mola" do arrastar (`useSpring`/`api.start`/`r.get()`);
- roda um loop `requestAnimationFrame` **contínuo** (mesmo fora da tela);
- usa `mapSamples: 16000` e `devicePixelRatio: 2` (render pesado);
- não respeita `prefers-reduced-motion`.

Objetivo (confirmado com o usuário): reduzir **bundle** e **runtime**.

## Decisões
1. **Remover `react-spring`** e substituir o offset de rotação do arrasto por um `ref` + lerp manual no loop. Mantém o arrastar, elimina ~250 pacotes.
2. **Pausar o loop quando o globo sai da viewport** via `IntersectionObserver` (o globo fica abaixo do fold, então quase sempre parado).
3. **Reduzir custo de render**: `mapSamples` 16000 → `10000` (configurável via prop) e `devicePixelRatio` fixo `2` → `Math.min(window.devicePixelRatio || 1, 1.5)`.
4. **Respeitar `prefers-reduced-motion`**: se o usuário prefere menos movimento, renderizar **um único frame estático** (sem auto-rotação e sem loop rAF).

## Arquivos afetados
- `src/components/eldoraui/cobe-globe.tsx` — todas as mudanças.
- `package.json` — remover `react-spring` (e desinstalar).
- `src/components/sections/languages.tsx` — só passar `mapSamples` menor se quiser (opcional; default já fica 10000).

## Plano de implementação (ordem)

### 1. Remover react-spring
- Apagar `import { useSpring } from "react-spring"`.
- Remover `const [{ r }, api] = useSpring<{ r: number }>(() => ({ r: 0, config: {...} }))`.
- Adicionar refs: `const dragOffset = useRef(0)` e `const targetDragOffset = useRef(0)`.
- Em `handleMouseMove`: trocar `api.start({ r: delta / 200 })` por `targetDragOffset.current = delta / 200`.
- Em `handleTouchMove`: trocar `api.start({ r: delta / 100 })` por `targetDragOffset.current = delta / 100`.
- No `render()`, nos casos `default`/`draggable`/`auto-draggable`, substituir `r.get()` por `dragOffset.current` e aplicar suavização: `dragOffset.current += (targetDragOffset.current - dragOffset.current) * 0.1` antes de usá-lo.
- Remover `r` do array de dependências do `useEffect`.

### 2. Reduzir custo de render
- `mapSamples` default: `16000` → `10000`.
- Em `createGlobe`: `devicePixelRatio: 2` → `devicePixelRatio: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)`.

### 3. Pausar fora da tela (IntersectionObserver)
- Adicionar `const containerRef = useRef<HTMLDivElement>(null)` e usar no `<div>` raiz (onde hoje está `className={cn("", className)} style={containerStyle}`).
- Dentro do `useEffect` do globo: criar `const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) startLoop(); else stopLoop(); }, { threshold: 0 })`, observar `containerRef.current`, e `io.disconnect()` no cleanup.
- Refatorar o controle do loop:
  - `let frame = 0`
  - `const startLoop = () => { if (!frame) frame = requestAnimationFrame(render) }`
  - `const stopLoop = () => { if (frame) { cancelAnimationFrame(frame); frame = 0 } }`
  - No fim do `render()`: só agendar próximo frame se visível — `if (visibleRef.current) frame = requestAnimationFrame(render)` (usar um `visibleRef` atualizado pelo observer). Se não visível, não reschedule (loop para sozinho).
  - Iniciar com `startLoop()` ao montar (o observer vai parar se já estiver fora da tela).

### 4. Respeitar prefers-reduced-motion
- No início do `useEffect`: `const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Se `reduce`: após `createGlobe`, chamar `globe.update({ phi, width: width*2, height: ... })` **uma vez** e NÃO iniciar o loop (`startLoop` só se `!reduce`). Também desabilitar os handlers de ponteiro (ou simplesmente não iniciar loop; o drag sem loop não anima, então ignore).
- Manter `globe.destroy()` no cleanup.

### 5. Limpeza de dependências
- `package.json`: remover `"react-spring"` de `dependencies`.
- Rodar `npm uninstall react-spring` (atualiza lockfile e node_modules).

## Riscos / edge cases
- `react-spring` só é usado aqui → remover é seguro (verificar com grep por `react-spring` e `useSpring`/`api.start`).
- `dynamic(..., { ssr: false })` já isola o uso de `window`; manter.
- Ao parar o loop fora da tela, o `onResize` continua atualizando `width`; quando voltar a ficar visível o loop recalcula tamanho normalmente.
- `prefers-reduced-motion` + drag: com loop parado, o arrasto não produz animação; aceitável para acessibilidade.
- O `IntersectionObserver` precisa do `containerRef` no `<div>` raiz; hoje esse div não tem ref.

## Validação
1. `npx tsc --noEmit` sem erros.
2. `npm run build` conclui e gera `/pt` e `/en`.
3. `grep -rn "react-spring" src package.json` não retorna nada.
4. Verificação manual (dev): globo aparece e gira; ao rolar para fora e voltar, o loop para/recomeça (checar no DevTools Performance/CPU que não há rAF contínuo fora da tela); com "Reduce motion" do SO ativado, o globo fica estático.
