# TicTacToe 3D — IA Impossível de Vencer

Jogo da Velha 3D com visual futurista e IA baseada em Minimax com poda Alpha-Beta.

## 🚀 Instalação Rápida

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no navegador.

## 📦 Scripts Disponíveis

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build otimizado para produção |
| `npm run preview` | Pré-visualiza o build de produção |

## 🏗️ Arquitetura

```
src/
├── core/
│   ├── constants.js      # Constantes globais (cores, posições, estados)
│   └── EventEmitter.js   # Sistema de eventos desacoplado
├── game/
│   └── GameLogic.js      # Estado e fluxo do jogo
├── ai/
│   └── AIEngine.js       # Minimax + Alpha-Beta + Fork detection
├── ui/
│   └── UIManager.js      # Menus, HUD, tela de resultado
├── graphics/
│   ├── SceneManager.js   # Setup Three.js (renderer, cena, luzes)
│   ├── BoardRenderer.js  # Tabuleiro 3D futurista
│   ├── PieceRenderer.js  # X e O com animações
│   ├── ParticleSystem.js # Partículas de fundo
│   └── CameraController.js # Câmera suave com shake
├── mobile/
│   ├── DeviceManager.js  # Detecção de dispositivo e qualidade
│   └── InputHandler.js   # Mouse e touch (raycasting)
├── utils/
│   └── StatsManager.js   # Persistência com LocalStorage
└── main.js               # Orquestrador principal
```

## 🤖 IA

A IA implementa:

1. **Minimax completo** — avalia todos os estados possíveis do jogo
2. **Poda Alpha-Beta** — elimina ramos impossíveis (até 60% mais rápido)
3. **Profundidade** — prefere vitórias rápidas, evita derrotas tardias
4. **Ordem estratégica** — centro → cantos → bordas para melhor poda
5. **Detecção de fork** — identifica armadilhas com duas ameaças
6. **Modo Impossível** — jogo perfeito, nunca perde

### Por que a IA nunca perde?

O Jogo da Velha tem um espaço de estados pequeno (~255.168 partidas possíveis). O Minimax explora **todos** os estados futuros possíveis e escolhe sempre a jogada optimal. Com profundidade completa e poda Alpha-Beta, a IA é matematicamente perfeita.

## 🎮 Modos de Dificuldade

- **Impossível** (padrão) — IA perfeita, nunca perde
- **Difícil** — 5% de chance de jogada subótima
- **Médio** — 25% de chance de jogada aleatória

## 📱 Mobile

- Touch events otimizados (distingue tap de swipe)
- Detecção automática de dispositivo móvel
- Ajuste automático de qualidade gráfica por FPS
- Layout responsivo para portrait e landscape
- Botões com min-height 44px (padrão Apple HIG)

## 🎨 Visual

- Renderização Three.js com PCFSoft shadows
- Tone mapping ACES Filmic
- Partículas com shaders GLSL customizados
- Efeito glow via Additive Blending
- Animação elástica nas peças
- Câmera com lerp suave e shake de impacto

## 📋 Requisitos

- Node.js 18+
- Navegador moderno com WebGL 1.0+
