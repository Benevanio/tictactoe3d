// ============================================================
// CONSTANTS — Todas as configurações globais do jogo
// ============================================================

export const PLAYER = {
  HUMAN: 'X',
  AI: 'O',
  NONE: null
};

export const GAME_STATE = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  WIN: 'WIN',
  LOSE: 'LOSE',
  DRAW: 'DRAW'
};

export const DIFFICULTY = {
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
  IMPOSSIBLE: 'IMPOSSIBLE'
};

export const DIFFICULTY_LABELS = {
  MEDIUM: 'Médio',
  HARD: 'Difícil',
  IMPOSSIBLE: 'Impossível'
};

export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]           
];

export const STRATEGIC_POSITIONS = {
  CENTER: 4,
  CORNERS: [0, 2, 6, 8],
  EDGES: [1, 3, 5, 7]
};

export const QUALITY = {
  LOW: {
    shadowMapSize: 512,
    particleCount: 50,
    antialias: false,
    pixelRatio: 1
  },
  MEDIUM: {
    shadowMapSize: 1024,
    particleCount: 100,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 1.5)
  },
  HIGH: {
    shadowMapSize: 2048,
    particleCount: 200,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
};

export const COLORS = {
  X: 0x00f5ff,    
  O: 0xff2079,      
  BOARD: 0x0a0f2e,  
  GRID: 0x1a2a6c,   
  WIN: 0xffd700,    
  BG_TOP: 0x000510,
  BG_BOTTOM: 0x0a0020,
  AMBIENT: 0x111133,
  POINT_X: 0x00d4ff,
  POINT_O: 0xff1a6e
};

export const STORAGE_KEY = 'ttt3d_stats';
