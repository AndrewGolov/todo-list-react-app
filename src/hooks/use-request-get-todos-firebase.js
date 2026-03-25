import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { normalizeDataFirebase } from '../utils';

export const useRequestGetTodosFirbase = () => {
	const [todosFirebase, setTodosFirebase] = useState([]);
	const [isLoadingFirebase, setIsLoadingFirebase] = useState(true);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');
		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			setTodosFirebase(normalizeDataFirebase(loadedTodos));
			setIsLoadingFirebase(false);
		});
	}, []);

	return {
		todosFirebase,
		isLoadingFirebase,
	};
};
