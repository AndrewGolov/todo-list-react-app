import { Field } from '../../components';
import { useEffect, useRef } from 'react';

export const SearchTaskComponent = ({ setSearchTask, searchTask, isOpen }) => {
	const searchFieldRef = useRef(null);

	useEffect(() => {
		!isOpen && setSearchTask('');
		isOpen && searchFieldRef.current.focus();
	}, [isOpen, setSearchTask]);

	return (
		<Field
			inpRef={searchFieldRef}
			type="text"
			value={searchTask}
			onChange={(e) => setSearchTask(e.target.value)}
			placeholder="Введите название задачи для поиска..."
		/>
	);
};
