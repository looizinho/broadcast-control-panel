# Briefing para reconstrução da interface esqueumórfica em web

## Contexto
A referência visual enviada é um painel de controle com estética esqueumórfica, inspirado em hardware broadcast/switcher. A interface possui profundidade visual, sombras, botões com volume, LEDs, sliders laterais, indicadores e um knob central de navegação.

A recomendação principal é **não fatiar a imagem em vários PNGs** para montar a interface.

## Decisão recomendada
Usar a imagem inteira **apenas como referência visual** e reconstruir a interface com:

- componentes independentes
- HTML/CSS moderno
- React para estrutura e comportamento
- SVG/CSS para ícones, LEDs e alguns elementos visuais

## Por que não fatiar a imagem
Fatiar a imagem em elementos separados tende a piorar o projeto, porque:

- reduz a responsividade
- dificulta estados visuais como hover, active e disabled
- complica animações
- limita escalabilidade
- transforma a interface numa montagem rígida baseada em imagens

## Estratégia correta
A interface deve ser refeita como sistema de componentes.

### Estrutura sugerida
```txt
components/
  Slider.tsx
  Button.tsx
  Knob.tsx
  LedIndicator.tsx
  ChannelButton.tsx
  AudioMeter.tsx
```

Cada parte visual vira um componente reutilizável.

## Exemplo de botão esqueumórfico
O visual dos botões pode ser recriado só com CSS, sem imagem.

### CSS base
```css
.switcher-button {
  background: linear-gradient(145deg, #3a3f45, #1e2227);
  border-radius: 8px;
  box-shadow:
    inset 0 1px 2px rgba(255,255,255,0.1),
    inset 0 -2px 4px rgba(0,0,0,0.6),
    0 4px 8px rgba(0,0,0,0.6);
  color: #ddd;
  padding: 12px 18px;
}
```

### Estado pressionado
```css
.switcher-button:active {
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.8);
}
```

## Sliders
Os sliders laterais podem ser implementados com `input type="range"` e estilizados via CSS.

## LEDs
Os LEDs verdes, vermelhos e amarelos podem ser feitos com brilho usando `box-shadow`.

### Exemplo
```css
.led-green {
  background: #2cff6c;
  box-shadow: 0 0 6px #2cff6c;
}
```

## Knob central
O knob circular central pode ser construído com:

- `div`
- pseudo-elementos
- radial gradients
- sombras internas e externas

## Stack recomendada

### UI
- React
- Tailwind CSS ou CSS Modules

### Interação
- Framer Motion para microanimações
- React Spring, se quiser sensação mais física

### Layout
- CSS Grid

## Como organizar o layout
Uma boa abordagem é usar um grid principal para estruturar a interface.

### Ideia de composição
```txt
---------------------------------------
| meters | controls | knobs | meters |
---------------------------------------
|     program row / preview row      |
---------------------------------------
```

Isso pode ser implementado com `grid-template-areas`.

## Ordem certa de desenvolvimento
A interface tem muitos elementos. Não é inteligente construir tudo de uma vez.

### Ordem sugerida
1. Botão base
2. Slider
3. LED
4. Channel button
5. Audio meter
6. Knob
7. Painel completo

## Uso de SVG
Essa interface combina muito bem com SVG, principalmente para:

- ícones
- LEDs
- detalhes gráficos
- formas circulares

### Vantagens do SVG
- escala infinita
- ótima nitidez
- animação via CSS/JS
- melhor controle visual

## Leitura funcional da interface
Esse painel segue lógica típica de switcher broadcast:

```txt
PGM
PVW
Transition
Sources
Audio
```

Ou seja, além de ser uma interface bonita, ela já sugere uma arquitetura funcional clara para um controlador virtual.

## Conclusão
A melhor estratégia é:

**usar a imagem como blueprint e recriar a interface em componentes**, sem recortar a arte em pedaços.

### Benefícios
- escalável
- responsiva
- animável
- reutilizável
- mais fácil de manter

## Próximos passos ideais
Depois disso, o fluxo ideal seria:

1. fazer o breakdown visual da interface
2. mapear todos os componentes
3. montar o layout base em CSS Grid
4. criar um primeiro protótipo React funcional

---

Esse material serve como briefing inicial para abrir uma lousa/canvas e continuar o desenvolvimento sem perder a linha de raciocínio.

