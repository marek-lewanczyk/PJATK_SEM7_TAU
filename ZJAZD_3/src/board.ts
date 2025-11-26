import { Board, Cell, Position } from './types.js';

export function validateDimensions(rows: number, cols: number): void {
    if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
        throw new Error('Rows and cols must be integers');
    }
    if (rows < 5 || cols < 5) {
        throw new Error('Minimum board size is 5x5');
    }
}

export function createEmptyBoard(rows: number, cols: number): Cell[][] {
    validateDimensions(rows, cols);
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 'EMPTY' as Cell),
    );
}

export function randomEdgePosition(rows: number, cols: number): Position {
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
        case 0:
            return { row: 0, col: Math.floor(Math.random() * cols) };
        case 1:
            return { row: rows - 1, col: Math.floor(Math.random() * cols) };
        case 2:
            return { row: Math.floor(Math.random() * rows), col: 0 };
        case 3:
        default:
            return { row: Math.floor(Math.random() * rows), col: cols - 1 };
    }
}

export function areAdjacentOrSame(a: Position, b: Position): boolean {
    const dr = Math.abs(a.row - b.row);
    const dc = Math.abs(a.col - b.col);
    return dr <= 1 && dc <= 1;
}

export function placeStartAndStop(
    grid: Cell[][],
): { grid: Cell[][]; start: Position; stop: Position } {
    const rows = grid.length;
    const cols = grid[0].length;

    let start = randomEdgePosition(rows, cols);
    grid[start.row][start.col] = 'START';

    let stop: Position;
    do {
        stop = randomEdgePosition(rows, cols);
    } while (areAdjacentOrSame(start, stop));

    grid[stop.row][stop.col] = 'STOP';

    return { grid, start, stop };
}

export function placeRandomObstacles(
    grid: Cell[][],
    obstacleProbability = 0.2,
): Cell[][] {
    const rows = grid.length;
    const cols = grid[0].length;

    const result = grid.map((row) => [...row]);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (result[r][c] === 'EMPTY') {
                if (Math.random() < obstacleProbability) {
                    result[r][c] = 'OBSTACLE';
                }
            }
        }
    }
    return result;
}

export function generateBoard(
    rows: number,
    cols: number,
    obstacleProbability = 0.2,
): Board {
    let grid = createEmptyBoard(rows, cols);
    const placed = placeStartAndStop(grid);
    grid = placeRandomObstacles(placed.grid, obstacleProbability);

    return {
        rows,
        cols,
        grid,
        start: placed.start,
        stop: placed.stop,
    };
}

export function boardToString(board: Board): string {
    return board.grid
        .map((row) =>
            row
                .map((cell) => {
                    switch (cell) {
                        case 'START':
                            return 'A';
                        case 'STOP':
                            return 'B';
                        case 'OBSTACLE':
                            return 'X';
                        case 'PATH':
                            return '*';
                        case 'EMPTY':
                        default:
                            return '.';
                    }
                })
                .join(' '),
        )
        .join('\n');
}
