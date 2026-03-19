import styles from './ConfirmModal.module.css';
import { Button, Title } from '../../index';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, titleConfirmModal = 'Подтверждаете?' }) => {
	const handleBackdropClick = (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.backdrop} onClick={handleBackdropClick}>
			<div className={styles.modal}>
				<Title text={titleConfirmModal} sizeTitle={5} className={styles.title} />
				<div className={styles.buttonGroup}>
					<Button text="Да" onClick={onConfirm} />
					<Button text="Нет" onClick={onClose} />
				</div>
			</div>
		</div>
	);
};
