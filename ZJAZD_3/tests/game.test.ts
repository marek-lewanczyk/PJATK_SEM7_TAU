import { Board } from '../src/types';
import {
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    canMoveTo,
} from '../src/game';

function mockBoard(): Board {
    return {
        rows: 3,
        cols: 3,
        start: { row: 0, col: 0 },
        stop: { row: 2, col: 2 },
        grid: [
            ['START', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'EMPTY'],
            ['EMPTY', 'EMPTY', 'STOP'],
        ],
    };
}

describe('Movement logic', () => {
    test('cannot move up from top row', () => {
        const board = mockBoard();
        const current = { row: 0, col: 1 };
        const result = moveUp(board, current);
        expect(result).toBeNull();
    });

    test('cannot move left from leftmost column', () => {
        const board = mockBoard();
        const current = { row: 1, col: 0 };
        const result = moveLeft(board, current);
        expect(result).toBeNull();
    });

    test('cannot move into obstacle', () => {
        const board = mockBoard();
        board.grid[1][1] = 'OBSTACLE';
        const current = { row: 1, col: 0 };
        const result = moveRight(board, current);
        expect(result).toBeNull();
    });

    test('can move to empty cell', () => {
        const board = mockBoard();
        const current = { row: 1, col: 1 };
        const result = moveDown(board, current);
        expect(result).toEqual({ row: 2, col: 1 });
        expect(canMoveTo(board, result!)).toBe(true);
    });
});
