# Plan: Favicon com crop-zoom e cantos arredondados

## Context
O arquivo `src/app/favicon.ico` é, na verdade, um **JPEG 2048×2048 RGB sem alpha** (magic `\xff\xd8\xff\xe0`), apenas com extensão `.ico`. O usuário quer editar **este** favicon (não a foto `public/about/igor.webp`) aplicando:
1. **crop-zoom** — zoom em uma região (foco no rosto / centro-superior).
2. **cantos arredondados** — estilo ícone de app (rounded square), com transparência nos cantos.

Resultado final deve continuar em `src/app/favicon.ico` como um **ICO válido multi-tamanho com alpha**, para renderizar corretamente na aba do navegador.

## Decisões
- **Fonte:** o próprio `src/app/favicon.ico` (lido como JPEG via PIL).
- **Enquadramento:** crop centrado horizontalmente, com o centro vertical deslocado para ~42% da altura (foco no rosto / centro-superior). Zoom padrão `z = 1.6` (recorte de lado `2048/1.6 ≈ 1280px`), ajustável.
- **Raio dos cantos:** `r = 0.22 * tamanho` por ícone (rounded square).
- **Saída:** ICO válido (`RGBA`) com tamanhos `[(16,16),(24,24),(32,32),(48,48),(64,64),(128,128),(256,256)]`.
- **Ferramenta:** Python + Pillow (`PIL` já disponível, v12.3.0). Sem dependências novas.

## Passos de implementação
1. Criar script temporário `/tmp/kilo/favicon_build.py` que:
   - Abre `src/app/favicon.ico` via `Image.open(...).convert("RGBA")`.
   - **Crop-zoom:** calcula lado `S = 2048 / z`; `left = (2048 - S)//2`; `top = int(2048*0.42 - S/2)` (clamp >=0); recorta `crop = im.crop((left, top, left+S, top+S))`.
   - **Redimensiona** o recorte para cada tamanho alvo.
   - **Cantos arredondados:** para cada tamanho, cria máscara `L` preta com retângulo arredondado branco (raio `0.22*size`); aplica como alpha (`img.putalpha(mask)`).
   - **Salva** tudo em `src/app/favicon.ico` via `img.save(path, format="ICO", sizes=[...])`.
   - Imprime tamanhos e modo para validação.
2. Executar o script (comando mutante — deve ser rodado pelo agente de implementação, não aqui).
3. **Validar:**
   - `PIL Image.open` → `format == "ICO"`, `mode in ("RGBA","P")`.
   - Pixel do canto `(0,0)` tem alpha `0` (canto transparente).
   - Tamanho de arquivo cai de ~930 KB para algo muito menor (esperado < 100 KB).
   - `n_frames`/sizes contém 256 etc.
4. Opcional: commit apenas do `favicon.ico` se solicitado.

## Riscos / notas
- O arquivo atual é JPEG disfarçado; ao salvar como ICO real, a aba do navegador passa a ter transparência e cantos arredondados (browsers já clipam favicons em container arredondado, mas o alpha garante consistência).
- Próximo.js serve `app/favicon.ico` automaticamente — nenhuma mudança de código necessária.
- Se o recorte não focar bem o rosto, ajustar `z` e o fator de deslocamento vertical (parâmetros no topo do script).
- Não mexer em `public/about/igor.webp` nem em nenhum componente React.

## Validação final
- Abrir o site em `next dev`, inspecionar a aba → favicon com cantos arredondados e zoom no rosto.
- `python3` check de alpha/canto transparente e redução de tamanho.
