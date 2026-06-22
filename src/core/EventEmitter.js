export class EventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(event, listener) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }
    this._events.get(event).push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this._events.has(event)) return;
    const listeners = this._events.get(event).filter(l => l !== listener);
    this._events.set(event, listeners);
  }

  emit(event, ...args) {
    if (!this._events.has(event)) return;
    this._events.get(event).forEach(listener => listener(...args));
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

export const eventBus = new EventEmitter();

export const EVENTS = {
  CELL_CLICKED: 'cell:clicked',
  MOVE_MADE: 'move:made',
  GAME_OVER: 'game:over',
  GAME_RESET: 'game:reset',
  TURN_CHANGED: 'turn:changed',

  DIFFICULTY_CHANGED: 'difficulty:changed',
  SHOW_MENU: 'ui:show_menu',
  HIDE_MENU: 'ui:hide_menu',
  SHOW_RESULT: 'ui:show_result',

  PIECE_PLACED: 'graphics:piece_placed',
  WIN_ANIMATION: 'graphics:win_animation',
  CAMERA_SHAKE: 'graphics:camera_shake',

  QUALITY_CHANGED: 'quality:changed'
};
