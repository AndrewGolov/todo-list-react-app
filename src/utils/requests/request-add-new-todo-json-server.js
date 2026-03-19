import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const requestAddNewTodoJsonServer = (title = 'Новая задача') => {
	fetch(TODOS_URL_JSON_SERVER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: 1,
			title: title,
			completed: false,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => console.log('Задача добавлена'))
		.catch((error) => console.log('Ошибка добавления задачи', error));
};
