import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const requestEditTodoTaskJsonServer = (id, title = 'Новая задача') => {
	fetch(`${TODOS_URL_JSON_SERVER}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: title,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => console.log('Задача обновлена'))
		.catch((error) => console.log('Ошибка обновления задачи', error));
};
