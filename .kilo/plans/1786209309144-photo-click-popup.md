# Plano: Clique 5x na foto → popup "Oi :)"

## Contexto
O portfólio (Next.js 16 + React 19) tem a foto pessoal do usuário em `src/components/sections/about.tsx:13`
(`/about/igor.webp`, alt "Foto de Igor Dias"). A foto está dentro de um container `<div>` que possui um
`shine` overlay com `pointer-events-none`, então cliques no container passam normalmente.

Objetivo: ao clicar **5 vezes** nessa foto, exibir um popup com o texto **"Oi :)"**.

## Decisões
- **Foto alvo**: a imagem em `about.tsx` (única foto pessoal do usuário no projeto).
- **Popup**: modal customizado (não `alert()`), estilizado com Tailwind, para combinar com o visual do site.
- **Contador**: estado local; zera se passar > 1.5s entre cliques (evita disparo acidental por cliques espalhados).
- **Após o 5º clique**: mostra o modal e zera o contador.
- **Fechar o popup**: clique no botão "Fechar", clique fora do modal, ou tecla `Escape`.

## Alterações
1. Em `src/components/sections/about.tsx`:
   - Adicionar `"use client"` no topo.
   - Importar `useState`, `useRef`, `useEffect` do react.
   - Criar estado `count` e `showPopup`, e uma ref `lastClick` para o timestamp.
   - `handlePhotoClick`: se `now - lastClick > 1500` zera `count`; incrementa; atualiza `lastClick`;
     se `count >= 5` → `setShowPopup(true)` e `setCount(0)`.
   - Anexar `onClick={handlePhotoClick}` ao container da imagem (linha 12).
   - Adicionar o modal condicional `{showPopup && (...)}` com overlay + caixa central "Oi :)" e botão fechar.
   - Adicionar `useEffect` para listener de `Escape` que fecha o popup.

## Riscos
- `about.tsx` atualmente é Server Component (sem `"use client"`). Torná-lo client é seguro pois só renderiza conteúdo estático + Image.
- O container pai precisa de `cursor-pointer` para indicar clicabilidade.

## Validação
- `npm run dev` e abrir `/pt` (ou `/en`).
- Clicar 4x na foto: nada acontece.
- Clicar a 5ª vez: popup "Oi :)" aparece.
- Fechar via botão, clique externo e `Escape`.
- `npm run build` para garantir que compila (typecheck do Next).
