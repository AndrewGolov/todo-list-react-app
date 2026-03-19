import styles from './Field.module.css';

export const Field = ({ type, value, onChange, placeholder }) => {
	return (
		<div className={styles['field__wrapper']}>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={styles['field__input']}
			/>
		</div>
	);
};
