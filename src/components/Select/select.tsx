import React, {ChangeEvent, memo, ReactElement, ReactNode} from 'react';
import {withNaming} from '@bem-react/classname';

import './select.scss';

const cn = withNaming({ n: '', e: '__', m: '_' });

interface SelectProps {
	id?: string;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	children: ReactNode;
	value?: string;
}

const b = cn('select');

function Select({
	id,
	onChange,
	children,
	value,
}: SelectProps): ReactElement {
	return (
		<select
			className={b()}
			id={id}
			onChange={onChange}
			value={value}
		>
			{children}
		</select>
	);
}

const SelectMemo = memo(Select);
export {SelectMemo as Select};
