import React, {ReactElement} from 'react';
import {cn} from '@bem-react/classname';

const b = cn('modal');

interface ModalCloseButtonProps {
	onClick: () => void;
}

export const ModalCloseButton = ({
	onClick,
}: ModalCloseButtonProps): ReactElement => (
	<button
		type="button"
		className={b('close')}
		aria-label="Close"
		onClick={onClick}
	>
		<span aria-hidden="true">×</span>
	</button>
);
