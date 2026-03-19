import { useState, useEffect } from 'react';
import { TODOS_URL_JSON_SERVER } from '../constants/constants';
import { normalizeData } from '../utils';

export const useRequestGetTodosJsonServer = () => {
	const [todosJsonServer, setTodosJsonServer] = useState([]);
	const [isLoadingJsonServer, setIsLoadingJsonServer] = useState(true);
	const [refreshList, setRefreshList] = useState(false);
	useEffect(() => {
		fetch(TODOS_URL_JSON_SERVER)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodosJsonServer(normalizeData(loadedTodos));
			})
			.catch((error) => {
				console.error('Ошибка при загрузке задач', error);
			})
			.finally(() => setIsLoadingJsonServer(false));
	}, [refreshList]);

	return {
		todosJsonServer,
		isLoadingJsonServer,
		setRefreshList,
	};
};
