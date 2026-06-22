import { DIFFICULTY, PLAYER, STRATEGIC_POSITIONS, WIN_LINES } from '../core/constants.js';

export class AIEngine {
  constructor() {
    this.difficulty = DIFFICULTY.IMPOSSIBLE;
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
  getBestMove(board) {
    if (this.difficulty === DIFFICULTY.MEDIUM && Math.random() < 0.25) {
      return this._getRandomEmptyCell(board);
    }
    if (this.difficulty === DIFFICULTY.HARD && Math.random() < 0.05) {
      return this._getRandomEmptyCell(board);
    }
    return this._calculateBestMove(board);
  }

  _calculateBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = -1;

    const moves = this._getOrderedMoves(board);

    for (const cell of moves) {
      board[cell] = PLAYER.AI;
      const score = this._minimax(board, 0, false, -Infinity, Infinity);
      board[cell] = PLAYER.NONE;

      if (score > bestScore) {
        bestScore = score;
        bestMove = cell;
      }
    }

    return bestMove;
  }

  _minimax(board, depth, isMax, alpha, beta) {
    const winner = this._checkWinner(board);
    if (winner === PLAYER.AI) return 10 - depth;   
    if (winner === PLAYER.HUMAN) return depth - 10; 
    if (this._isBoardFull(board)) return 0;         

    if (isMax) {
      let maxScore = -Infinity;

      for (const cell of this._getOrderedMoves(board)) {
        board[cell] = PLAYER.AI;
        const score = this._minimax(board, depth + 1, false, alpha, beta);
        board[cell] = PLAYER.NONE;

        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);

        if (beta <= alpha) break;
      }

      return maxScore;
    } else {
      let minScore = Infinity;

      for (const cell of this._getOrderedMoves(board)) {
        board[cell] = PLAYER.HUMAN;
        const score = this._minimax(board, depth + 1, true, alpha, beta);
        board[cell] = PLAYER.NONE;

        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);

        if (beta <= alpha) break;
      }

      return minScore;
    }
  }
_getOrderedMoves(board) {
    const emptyCells = board
      .map((val, idx) => ({ val, idx }))
      .filter(({ val }) => val === PLAYER.NONE)
      .map(({ idx }) => idx);

    return emptyCells.sort((a, b) => {
      return this._cellPriority(b) - this._cellPriority(a);
    });
  }

  _cellPriority(cell) {
    if (cell === STRATEGIC_POSITIONS.CENTER) return 3;
    if (STRATEGIC_POSITIONS.CORNERS.includes(cell)) return 2;
    return 1; 
  }

  _checkWinner(board) {
    for (const [a, b, c] of WIN_LINES) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  _isBoardFull(board) {
    return board.every(cell => cell !== PLAYER.NONE);
  }

  _getRandomEmptyCell(board) {
    const empty = board
      .map((v, i) => ({ v, i }))
      .filter(({ v }) => v === PLAYER.NONE)
      .map(({ i }) => i);
    return empty[Math.floor(Math.random() * empty.length)];
  }
  detectFork(board, player) {
    const threats = [];

    for (const line of WIN_LINES) {
      const playerCount = line.filter(i => board[i] === player).length;
      const emptyCount = line.filter(i => board[i] === PLAYER.NONE).length;

      if (playerCount === 2 && emptyCount === 1) {
        const emptyCell = line.find(i => board[i] === PLAYER.NONE);
        threats.push(emptyCell);
      }
    }

    const uniqueThreats = [...new Set(threats)];
    return uniqueThreats.filter(cell =>
      threats.filter(t => t === cell).length >= 1
    );
  }

  analyzePosition(board) {
    return {
      winner: this._checkWinner(board),
      isFull: this._isBoardFull(board),
      aiForks: this.detectFork(board, PLAYER.AI),
      humanForks: this.detectFork(board, PLAYER.HUMAN),
      bestMove: this.getBestMove(board)
    };
  }
}
