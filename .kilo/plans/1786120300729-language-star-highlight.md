# Plano: estrela de destaque em idiomas de proficiência alta

## Contexto
Na seção de Idiomas (`src/components/sections/languages.tsx`) são listados Português, Inglês, Espanhol e Francês vindos dos dicionários i18n (`pt.json`, `en.json`). O usuário quer destacar os idiomas de **proficiência alta** (nativo/fluente) com uma estrela ★, coerente com o destaque visual já usado nos projetos em destaque (`projects.tsx:71`, que usa `text-accent`).

Decisão confirmada: a estrela marca **Português (nativo)** e **Inglês (fluente C1)**, e não espanhol/francês.

## Passos

1. **`src/i18n/messages/pt.json`** — adicionar `"highlight": true` em `Português` e `Inglês`, e `"highlight": false` (ou omitir) em `Espanhol` e `Francês`, dentro de `languages.items`.
2. **`src/i18n/messages/en.json`** — espelhar: `"highlight": true` em `Portuguese` e `English`; `false`/omitir nos demais.
3. **`src/components/sections/languages.tsx`**:
   - Estender o tipo `Language` para incluir `highlight?: boolean`.
   - No `<li>` (linhas 30-38), após o `<span>{lang.name}</span>`, renderizar condicionalmente:
     ```tsx
     {lang.highlight ? <span className="text-accent" aria-label="Proficiência alta">★</span> : null}
     ```
   - Manter o alinhamento `items-baseline` já existente para não quebrar o layout.

## Riscos / notas
- Ambos os dicionários devem manter a mesma estrutura de campos para não quebrar a tipagem.
- `highlight` como opcional (`false` implícito) evita ruído nos itens sem estrela.

## Validação
- `npm run build` / `npm run dev` e inspecionar a seção Idiomas em pt e en: estrela aparece só ao lado de Português e Inglês, com cor `text-accent`.
