import React, {memo, ReactElement, ReactNode, useState, useCallback, ChangeEvent} from 'react';
import {withNaming} from '@bem-react/classname';

import {User} from 'components/User';
import {Board} from 'components/Board/board';
import {Modal} from 'components/Modal';
import {Button} from 'components/Button';
import {Select} from 'components/Select';

import './game_field.scss';

const cn = withNaming({ n: '', e: '__', m: '_' });

interface GameField {
}


const b = cn('game-field');

export const GameField = ({
}: GameField): ReactElement => {

    const [isFirstGamerActive, setIsFirstGamerActive] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [rowSize, setRowSize] = useState(3);

    const onRowSizeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setRowSize(Number(e.target.value));
    }, [rowSize])

    const onButtonClick = useCallback(() => {
        setIsModalOpen(false);
    }, [])

    return (
        <div className={b()}>
            <Modal isOpen={isModalOpen}>
                <p className={b('title')}>Выберите количество крестиков или ноликов в ряд, необходимых для выигрыша</p>
                <Select
                    onChange={onRowSizeChange}
                >
                    {[3, 4, 5].map(count =>
                        <option
                            key={count}
                            value={count}
                        >
                            {count}
                        </option>
                    )}
                </Select>
                <Button onClick={onButtonClick} type='success'>
                  Начать игру
                </Button>
            </Modal>
            <div className={b('user')}>
                <User id={'Игрок 1'} isActive={isFirstGamerActive} type='x'/>
            </div>
            <Board
                boardSize={10}
                rowSize={rowSize}
                currentSymbol={isFirstGamerActive ? 'x' : 'o'}
                setIsFirstGamerActive={setIsFirstGamerActive}
            />
            <div className={b('user')}>
                <User id={'Игрок 2'} isActive={!isFirstGamerActive} type='o'/>
            </div>
        </div>
    );
};
