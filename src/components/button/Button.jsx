import styles from './Button.module.css';

export const Button = ({ text, onClick, disabled = false, type, className = '', ...props }) => {
	const normolizeClassName = `${styles.button} ${className}`.trim();
	return (
		<button onClick={onClick} className={normolizeClassName} disabled={disabled} type={type} {...props}>
			{text}
		</button>
	);
};
