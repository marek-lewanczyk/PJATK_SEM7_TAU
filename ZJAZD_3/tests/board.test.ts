import {
    generateBoard,
    createEmptyBoard,
    areAdjacentOrSame,
} from '../src/board';

describe('Board generation', () => {
    test('throws for dimensions smaller than 5x5', () => {
        expect(() => createEmptyBoard(4, 5)).toThrow();
        expect(() => createEmptyBoard(5, 4)).toThrow();
    });

    test('start and stop are on edges and not adjacent', () => {
        const board = generateBoard(5, 5, 3);
        const { start, stop, rows, cols } = board;

        const isOnEdge = (p: typeof start) =>
            p.row === 0 || p.row === rows - 1 || p.col === 0 || p.col === cols - 1;

        expect(isOnEdge(start)).toBe(true);
        expect(isOnEdge(stop)).toBe(true);

        expect(start.row === stop.row && start.col === stop.col).toBe(false);
        expect(areAdjacentOrSame(start, stop)).toBe(false);
    });
});
