import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const requestDeleteTaskTodoJsonServer = (id) => {
	fetch(`${TODOS_URL_JSON_SERVER}/${id}`, {
		method: 'DELETE',
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => console.log('Задача удалена'))
		.catch((error) => console.error('Ошибка при удалении задачи', error));
};
