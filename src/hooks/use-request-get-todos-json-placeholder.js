import { useState, useEffect } from 'react';
import { TODOS_URL_JSON_PLACEHOLDER } from '../constants/constants';
import { normalizeData } from '../utils';

export const useRequestGetTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(TODOS_URL_JSON_PLACEHOLDER)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(normalizeData(loadedTodos));
			})
			.catch((error) => {
				console.error('Ошибка при загрузке задач', error);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return {
		todos,
		isLoading,
	};
};
