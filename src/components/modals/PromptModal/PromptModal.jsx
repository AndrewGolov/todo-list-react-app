import { useState, useEffect } from 'react';
import styles from './PromptModal.module.css';
import { Button, Title } from '../../index';

export const PromptModal = ({
	submitText = 'Submit',
	isOpen,
	onClose,
	onAction,
	titleModal,
	placeholder = 'Введите описание задачи...',
	initialValue = '',
}) => {
	const [title, setTitle] = useState(initialValue);
	useEffect(() => {
		setTitle(initialValue);
	}, [initialValue]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (title.trim()) {
			onAction({ title });
			setTitle('');
		}
	};

	const handleCancelClick = (event) => {
		if (event.target === event.currentTarget) {
			setTitle('');
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.backdrop} onClick={handleCancelClick}>
			<div className={styles.modal}>
				<Button text="✕" className={styles.closeButton} onClick={onClose} />

				<Title sizeTitle={4} text={titleModal} className={styles.title} />

				<form onSubmit={handleSubmit} className={styles.form}>
					<input
						type="text"
						className={styles.input}
						placeholder={placeholder}
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						autoFocus
					/>
					<div className={styles.buttonGroup}>
						<Button type="submit" text={submitText} disabled={!title.trim()} />
						<Button type="button" text="Отмена" onClick={onClose} />
					</div>
				</form>
			</div>
		</div>
	);
};
