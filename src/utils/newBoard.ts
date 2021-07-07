export function getNewBoard(board, rowIndex, index, currentSymbol){
	const newBoard = [...board];
	newBoard[rowIndex] = [...newBoard[rowIndex]];
	newBoard[rowIndex][index] = currentSymbol;
	return newBoard;
}
