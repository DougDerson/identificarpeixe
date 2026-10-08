# Identificador de Peixes — versão 1

## Como executar
1. Extraia a pasta.
2. Abra `index.html` no navegador.
3. No celular, para a câmera funcionar de forma confiável, publique a pasta em um endereço HTTPS (GitHub Pages, Netlify, Vercel etc.).
4. A câmera pode ser aberta pelo botão "Abrir câmera".

## O que esta versão já faz
- Interface responsiva para celular.
- Abre a câmera traseira.
- Permite selecionar foto da galeria.
- Mostra a foto capturada.
- Possui banco inicial de espécies.
- Permite cadastrar novas espécies.
- Guarda os cadastros no localStorage do navegador.
- Possui tela de resultado.
- Está preparada para receber um modelo de IA.

## Importante
A identificação nesta V1 é apenas uma DEMONSTRAÇÃO. Ela sorteia uma espécie cadastrada.
Isso é proposital: o próximo passo é colocar um modelo de visão computacional real.

## Próxima versão recomendada
Treinar um classificador com fotos reais de cada espécie e carregar o modelo no navegador com TensorFlow.js ou Teachable Machine.
