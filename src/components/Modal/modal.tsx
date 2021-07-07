import React, {memo, ReactElement, ReactNode} from 'react';
import {withNaming} from '@bem-react/classname';
import {ModalCloseButton} from './modal-close-button';

import './modal.scss';

const cn = withNaming({ n: '', e: '__', m: '_' });

interface Modal {
	isOpen: boolean;
	children: ReactNode;
	className?: string;
	close?: () => void;
}

const b = cn('modal');

export const Modal = memo(({
	isOpen,
	children,
	className = '',
	close,
}: Modal): ReactElement => {
	return (
		<div className={b({'show' : isOpen})}
		>
			<div className={b('modal-backdrop')}
				 onClick={close}
			/>
			<div className={b('modal-dialog')}>
				<div className={b('modal-content',{} , [className])}>
					{close && <ModalCloseButton onClick={close} /> }
					{children}
				</div>
			</div>
		</div>
	);
});
