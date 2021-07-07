import React, {ButtonHTMLAttributes, memo, ReactElement} from 'react';
import {withNaming} from '@bem-react/classname';
import './button.scss';

const cn = withNaming({ n: '', e: '__', m: '_' });

// @ts-ignore
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type: 'success' | 'warning' | 'empty' | 'danger' | 'info'
	style?: 'second' | 'first',
	loading?: boolean;
	rounded?: boolean;
}

const b = cn('button');
//console.log('styles', style, b());

const Button = ({
	onClick,
	className,
	disabled,
	children,
	loading = false,
	rounded = false,
	type,
	style,
}: ButtonProps): ReactElement => {
	return (
		<button
			className={b({type, style, loading, rounded}, [className])}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{children}
		</button>
	);
};

const ButtonMemo = memo(Button);
export {ButtonMemo as Button};
