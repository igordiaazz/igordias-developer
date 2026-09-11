# Plano: Foto no card de projetos (First Kodes)

## Contexto
A seção de Projetos (`src/components/sections/projects.tsx`) renderiza `ProjectCard` a partir de `src/content/projects.ts`. O tipo `Project` já possui `image?: string`, mas o card não renderiza imagem alguma. Queremos adicionar a foto do projeto **First Kodes** como um banner no topo do card.

Imagens locais em `public/` funcionam com `next/image` sem configuração extra (o `next.config.ts` não define restrições de `images`). Convenção do projeto: `public/about/igor.webp` → `/about/igor.webp`.

Decisões confirmadas com o usuário:
- Layout: **banner no topo** do card (largura total, altura fixa, título/descrição abaixo).
- Formato: **`.webp`**.

## Tarefas
1. **Usuário deixar o arquivo** em `public/projects/first-kodes.webp`.
   - (Opcional, fora do código) Gerar a imagem com proporção ~16:9 e tamanho otimizado (ex.: largura ≤ 1200px, < 200KB).

2. **`src/content/projects.ts`** — apontar o campo `image` do primeiro projeto:
   ```ts
   image: "/projects/first-kodes.webp",
   ```
   (O campo `image?: string` já existe no tipo `Project`; nenhuma mudança de tipo necessária. O `image` continua opcional para os demais projetos.)

3. **`src/components/sections/projects.tsx`** — renderizar o banner no `ProjectCard`, antes do `<h3>` do título:
   - Usar `next/image` com `fill` dentro de um container `relative aspect-video w-full overflow-hidden rounded-t-2xl` (full-bleed no topo do card, aproveitando o `rounded-2xl` do `article`).
   - Aplicar `sizes` adequado (ex.: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`).
   - `alt` acessível: usar `item.title`.
   - Só renderizar o bloco quando `item.image` existir, preservando o layout atual dos cards sem imagem.
   - Ajustar o padding do `article` para que o banner encoste nas bordas do topo (ex.: trocar `p-6` por `p-0` no container raiz e aplicar `p-6` apenas no bloco de conteúdo, ou usar margens negativas `-m-6 mb-6 rounded-t-2xl`).

## Arquivos afetados
- `public/projects/first-kodes.webp` (novo, fornecido pelo usuário)
- `src/content/projects.ts` (1 linha: `image`)
- `src/components/sections/projects.tsx` (render do banner no `ProjectCard`)

## Riscos / notas
- O card usa `transition hover:-translate-y-1`; garantir que o banner não quebre o `overflow-hidden`/bordas arredondadas.
- Imagem faltante quebra o build apenas se o caminho estiver errado; por isso o `image` é opcional e o bloco é condicional.
- Manter consistência de tema (borda `border-border`, fundo `bg-card`).

## Validação
- `npm run build` deve passar e gerar `/pt` e `/en`.
- Verificar visualmente (dev) que o card de First Kodes mostra o banner no topo e os demais cards permanecem iguais.
- Conferir responsividade (1/2/3 colunas) e que a imagem respeita o tema claro/escuro.
