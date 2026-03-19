import styles from './Title.module.css';

export const Title = ({ text, sizeTitle = 4, className }) => {
	const Tag = `h${sizeTitle}`;
	return (
		<div className={`${styles.title} ${className}`}>
			<Tag>{text}</Tag>
		</div>
	);
};
