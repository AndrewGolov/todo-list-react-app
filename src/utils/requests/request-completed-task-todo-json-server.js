import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const requestCompletedTaskTodoJsonServer = (id, completed) => {
	const status = completed ? false : true;

	return fetch(`${TODOS_URL_JSON_SERVER}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			completed: status,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => console.log('Задача выполнена'))
		.catch((error) => console.error('Ошибка при пометке задачи как выполненной', error));
};
