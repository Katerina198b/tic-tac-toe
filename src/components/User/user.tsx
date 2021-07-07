import React, {memo, ReactElement, ReactNode} from 'react';
import {withNaming} from '@bem-react/classname';

import './user.scss';


interface User {
    isActive: boolean;
    score?: number;
    id: string;
    className?: string;
    type: 'o' | 'x';
}

const cn = withNaming({ n: '', e: '__', m: '_' });
const b = cn('user');

export const User = memo(({
    isActive,
    id,
    score = 0,
    className,
    type,
}: User): ReactElement => {

    // const ceils = Array(rowSize ** 2).fill();

    return (
        <div className={b({active: isActive}, [className])}>
            <div className={b('avatar', {type})} />
            <p className={b('id')}>
                {id}
            </p>
        </div>
    );
});
