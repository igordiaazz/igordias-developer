# Liquid Glass (efeito de vidro líquido com distorção)

## Objetivo
Aplicar um efeito de "liquid glass" (vidro líquido estilo visionOS/iOS 26) com refração/distorção
real do conteúdo atrás dos elementos e brilho especular nas bordas. Sem dependências novas,
sem JS de runtime (efeito estático), adaptável a dark/light.

## Decisões (confirmadas com o usuário)
- **Técnica:** filtro SVG (`feTurbulence` + `feDisplacementMap`) referenciado via `backdrop-filter: url(#...)`
  + realce especular em CSS. Leve, sem libs.
- **Escopo:** todas as superfícies "glass" do site.
- **Interação:** estática + brilho (sem reatividade ao ponteiro).

## Superfícies alvo (substituir `bg-background/xx backdrop-blur-*`)
1. `src/components/header.tsx:62` — `<header>` desktop (sticky top, `sm:block`).
2. `src/components/header.tsx:86` — container de toggles no mobile (`sm:hidden`).
3. `src/components/header.tsx:91-93` — **dockbar** (nav inferior mobile, `sm:hidden`) — foco principal.
4. `src/components/sections/hero.tsx:77` — botão "Download" transparente do hero.
5. `src/components/eldoraui/cobe-globe.tsx:563` — botões de rotate-to-location (sobre o globo).

## Plano de implementação

### 1. Filtro SVG global (uma vez)
Em `src/app/[lang]/layout.tsx`, dentro de `<body>` (antes de fechar), adicionar SVG oculto:
```tsx
<svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
  <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="4" result="turb" />
    <feGaussianBlur in="turb" stdDeviation="0.6" result="soft" />
    <feDisplacementMap in="SourceGraphic" in2="soft" scale="22" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
```
`SourceGraphic` no contexto de `backdrop-filter` é o conteúdo atrás do elemento → refração real.
Valores (`baseFrequency`, `scale`) são tunáveis para mais/menos distorção.

### 2. Utilitário CSS em `src/app/globals.css`
Adicionar (Tailwind v4 `@utility` ou classe comum) `.liquid-glass`:
```css
@utility liquid-glass {
  position: relative;
  isolation: isolate;
  background: color-mix(in srgb, var(--background) 35%, transparent);
  border: 1px solid color-mix(in srgb, var(--foreground) 14%, transparent);
  /* fallback (Firefox não suporta url() em backdrop-filter) */
  -webkit-backdrop-filter: blur(8px) saturate(140%);
  backdrop-filter: blur(8px) saturate(140%);
  /* refração real em Chromium/Safari */
  -webkit-backdrop-filter: url(#liquid-glass) blur(0.5px) saturate(140%);
  backdrop-filter: url(#liquid-glass) blur(0.5px) saturate(140%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.35),
    inset 0 -1px 1px rgba(0, 0, 0, 0.15),
    0 8px 24px rgba(0, 0, 0, 0.18);
}
.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 42%);
  pointer-events: none;
  z-index: 0;
}
.liquid-glass > * { position: relative; z-index: 1; }
```
- `border-radius: inherit` faz o brilho seguir o raio (funciona em `rounded-full`, `rounded-2xl`).
- A declaração `blur()` vem antes da `url()` para o Firefox manter ao ignorar a inválida.
- Tinta `color-mix(... var(--background) 35%)` mantém legibilidade e respeita dark/light.

### 3. Aplicar nas superfícies
Remover as classes concorrentes (`bg-background/70`, `backdrop-blur-xl`, `border-border/60`,
`shadow-lg`, `bg-background/40`, `backdrop-blur-md`, `bg-background/80`) e adicionar `liquid-glass`:
- **header.tsx** (3 lugares): trocar pelo utilitário; manter `rounded-*`/`sticky`/`fixed`/`z-50`/`sm:*`.
- **hero.tsx:77**: `<a ... className="... liquid-glass rounded-full border ...">` (o `border` reaproveita
  o do utilitário; pode remover o explícito se quiser).
- **cobe-globe.tsx:563**: adicionar `liquid-glass` aos botões de localização.

### 4. Acessibilidade / performance
- Respeitar `prefers-reduced-motion` (não há animação nova; se alguém adicionar `shine`, gateá-lo).
- Wide header com `url()` displacement é mais custoso em GPU: manter `scale` baixo (~18-22) e,
  se houver queda de FPS, usar variante só-blur no header mais largo (manter specular para consistência).
- Conteúdo interno (ícones/texto) fica acima do `::before` via `z-index` (já tratado).

## Validação
- `npx tsc --noEmit` e `npm run build` (sem mudança de tipos; garante compile do CSS).
- Abrir em **Chromium** e **Safari**: alternar dark/light e conferir distorção + brilho na dockbar e no
  botão do hero. Verificar que o texto continua legível.
- Abrir em **Firefox**: deve degradar graciosamente para blur comum (sem quebrar o layout).
- Checar mobile (dockbar visível) e desktop (header).

## Riscos / notas
- `backdrop-filter: url()` não tem suporte no Firefox → fallback blur (aceitável, documentado).
- Safari exige `-webkit-backdrop-filter` (incluído).
- Filtro é global por documento; id único `liquid-glass`.
- Distorção por `feTurbulence` dá efeito "líquido" uniforme; para lente com bordas curvas nítidas
  seria necessário bump map `feImage` por forma (enhancement, fora do escopo inicial).
