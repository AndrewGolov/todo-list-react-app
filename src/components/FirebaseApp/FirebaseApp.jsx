import { useState, useRef, useEffect } from 'react';
import { useRequestGetTodosFirbase } from '../../hooks/use-request-get-todos-firebase';
import { Loader, ConfirmModal, PromptModal, Field } from '../../components';

import { FirebaseTodoList } from './FirebaseTodolist';

export const FirebaseApp = () => {
	const { todosFirebase, isLoadingFirebase } = useRequestGetTodosFirbase();
	const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);

	const searchFieldRef = useRef(null);

	useEffect(() => {
		if (isSearchFieldOpen) searchFieldRef.current.focus();
	}, [isSearchFieldOpen]);

	return (
		<div>
			{isLoadingFirebase ? (
				<Loader />
			) : (
				<div>
					<FirebaseTodoList dataArr={todosFirebase} />
				</div>
			)}
		</div>
	);
};
