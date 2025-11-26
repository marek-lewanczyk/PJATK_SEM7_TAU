export type Cell = 'EMPTY' | 'START' | 'STOP' | 'OBSTACLE' | 'PATH';

export interface Position {
    row: number;
    col: number;
}

export interface Board {
    rows: number;
    cols: number;
    grid: Cell[][];
    start: Position;
    stop: Position;
}
