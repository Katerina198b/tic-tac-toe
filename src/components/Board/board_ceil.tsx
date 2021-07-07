import React, {memo, ReactElement, ReactNode} from 'react';
import {withNaming} from '@bem-react/classname';

import './board_ceil.scss';

const cn = withNaming({ n: '', e: '__', m: '_' });

interface BoardCeil {
    type: ' ' | 'o' | 'x';
    onClick: (id: string) => () => void;
    id: string;
}

const b = cn('board-ceil');

export const BoardCeil = memo(({
    type,
    onClick,
    id,
}: BoardCeil): ReactElement => {
    
    return (
        <div
            className={b({type})}
            onClick={onClick(id)}
        >
        </div>
    );
});
