import { generateBoard, boardToString } from './board.js';

const board = generateBoard(5, 7, 0.2);

console.log('\nGenerated board:\n');
console.log(boardToString(board));
console.log('\nStart:', board.start, 'Stop:', board.stop);
