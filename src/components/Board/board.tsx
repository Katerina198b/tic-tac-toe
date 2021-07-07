import React, {memo, ReactElement, ReactNode, useState, useMemo, useCallback, useEffect} from 'react';
import {withNaming} from '@bem-react/classname';
import {getNewBoard} from 'utils/newBoard';
import './board.scss';
import {BoardCeil} from './board_ceil';
import {Modal} from 'components/Modal';
import {boardCheck} from 'utils/boardCheck';
import {Button} from 'components/Button';

const cn = withNaming({ n: '', e: '__', m: '_' });

interface Board {
    boardSize: number;
    rowSize: number;
    className?: string;
    close?: () => void;
    currentSymbol: 'o' | 'x';
    setIsFirstGamerActive: (isX: boolean) => void;
}

const b = cn('board');

export const Board = ({
	boardSize,
	className = '',
	rowSize,
	currentSymbol,
	setIsFirstGamerActive,
}: Board): ReactElement | null => {

	const [board, setBoard] = useState<('x' | 'o' | ' ')[][]>(new Array(boardSize).fill(new Array(boardSize).fill(' ')));
	const [whoWin, setWhoWin] = useState<string>(' ');

	const onRepeat = useCallback(() => {
		setBoard(new Array(boardSize).fill(new Array(boardSize).fill(' ')));
		setWhoWin(' ');
	}, []);

	const onCeilClick = useCallback((key) => () => {
		const [rowIndex, index] = key.split('_');

		const newBoard = getNewBoard(board, rowIndex, index, currentSymbol);

		if (boardCheck(Number(rowIndex), Number(index), rowSize, newBoard)) {
			setWhoWin(currentSymbol);
		}
		setBoard((board) => {
			const newBoard = getNewBoard(board, rowIndex, index, currentSymbol);
			return newBoard;
		});
		setIsFirstGamerActive(currentSymbol !== 'x');

	}, [board, rowSize, currentSymbol, setIsFirstGamerActive]);

	const ceils = useMemo(() => board.map((row, rowIndex) => {
		return (
			<div className={b('row')} key={rowIndex}>
				{row.map((type, index) => {
					const key = `${rowIndex}_${index}`;
					return (
						<BoardCeil
							type={type}
							key={key}
							onClick={onCeilClick}
							id={key}
						/>
					);
				})}
			</div>
		);
	}), [board, onCeilClick]);

	return (
        <>
            <Modal isOpen={whoWin !== ' '}>
                🎉 Победил {whoWin} 🎉
            	<Button onClick={onRepeat} type='success'>
                    Еще раз
            	</Button>
            </Modal>
            <div className={b()}>
            	{ceils}
            </div>
        </>
	);
};
