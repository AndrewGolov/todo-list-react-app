import styles from './Field.module.css';

export const Field = ({ type, value, onChange, placeholder, ref }) => {
	return (
		<div className={styles['field__wrapper']}>
			<input
				ref={ref}
				type={type}
				value={value || ''}
				onChange={onChange}
				placeholder={placeholder}
				className={styles['field__input']}
			/>
		</div>
	);
};
