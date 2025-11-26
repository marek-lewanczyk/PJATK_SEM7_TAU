import { Board, Position } from './types.js';

export function isInside(board: Board, pos: Position): boolean {
    return (
        pos.row >= 0 &&
        pos.row < board.rows &&
        pos.col >= 0 &&
        pos.col < board.cols
    );
}

export function isObstacle(board: Board, pos: Position): boolean {
    return board.grid[pos.row][pos.col] === 'OBSTACLE';
}

export function canMoveTo(board: Board, pos: Position): boolean {
    if (!isInside(board, pos)) return false;
    if (isObstacle(board, pos)) return false;
    return true;
}

export function moveUp(board: Board, current: Position): Position | null {
    const target = { row: current.row - 1, col: current.col };
    return canMoveTo(board, target) ? target : null;
}

export function moveDown(board: Board, current: Position): Position | null {
    const target = { row: current.row + 1, col: current.col };
    return canMoveTo(board, target) ? target : null;
}

export function moveLeft(board: Board, current: Position): Position | null {
    const target = { row: current.row, col: current.col - 1 };
    return canMoveTo(board, target) ? target : null;
}

export function moveRight(board: Board, current: Position): Position | null {
    const target = { row: current.row, col: current.col + 1 };
    return canMoveTo(board, target) ? target : null;
}
