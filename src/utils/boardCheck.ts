export function boardCheck(rowIndex: number, index: number, rowSize: number, board): boolean {
	let count = 0;
	let symbol: 'x' | 'o'  = board[rowIndex][index];
	const length = board.length;
	//проверяем строку
	for (let i = 0; i < length; i++) {
		if (board[rowIndex][i] === symbol) {
			count++;
			if (count >= rowSize) {
				return true;
			}
			continue;
		}
		count = 0;
	}
	count  = 0;
	//проверяем колонку
	for (let i = 0; i < length; i++) {
		if (board[i][index] === symbol) {
			count++;
			if (count >= rowSize) {
				return true;
			}
			continue;
		}
		count = 0;
	}
	count = 0;
	//проверяем диагональ слева на право
	let min = Math.min(rowIndex, index);
	let diff = rowIndex + index - 2 * min;
	for (let i = 0; i < length - diff; i++) {
		if (board[rowIndex - min + i][index - min + i] === symbol) {
			count++;
			if (count >= rowSize) {
				return true;
			}
			continue;
		}
		count = 0;
	}
	//проверяем диагональ справа на лево

	min = Math.min(rowIndex, length - index - 1);
	diff = length - 1 - index + rowIndex - 2 * min;
	for (let i = 0; i < length - diff; i++) {
		if (board[rowIndex - min + i][index + min - i] === symbol) {
			count++;
			if (count >= rowSize) {
				return true;
			}
			continue;
		}
		count = 0;
	}
	return false;
}
