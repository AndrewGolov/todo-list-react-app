export const requestAddNewTodoJsonServer = ({ title, link, callRefreshList, callModalPromptClose }) => {
	console.log('title:', title, 'link:', link);
	return fetch(link, {
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
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка добавления новой задачи ${response.status}`);
			}
			return response.json();
		})
		.then(() => console.log('Новая задача ДОБАВЛЕНА'))
		.then(() => callRefreshList())
		.then(() => callModalPromptClose())
		.catch((error) => console.log('Ошибка добавления задачи', error));
};

export const requestCompletedTaskTodoJsonServer = ({ id, completed, link, callRefreshList }) => {
	const status = !completed;

	return fetch(`${link}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			completed: status,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка сервера ${response.status}`);
			}
			return response.json();
		})
		.then(() => console.log('Отмечено как задача ВЫПОЛНЕНА/НЕ ВЫПОЛНЕНА'))
		.then(() => callRefreshList())
		.catch((error) => console.error('Ошибка отметки ВЫПОЛНЕНО/НЕ ВЫПОЛНЕНО', error));
};

export const requestDeleteTaskTodoJsonServer = ({ link, id, callRefreshList }) => {
	return fetch(`${link}/${id}`, {
		method: 'DELETE',
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка сервера ${response.status}`);
			}
			return response.json();
		})
		.then(() => console.log('Задача УДАЛЕНА'))
		.then(() => callRefreshList?.())
		.catch((error) => console.error('Ошибка при УДАЛЕНИИ задачи', error));
};

export const requestEditTodoTaskJsonServer = ({
	link,
	id,
	title = 'Новая задача',
	callModalEditPromptClose,
	callRefreshList,
}) => {
	return fetch(`${link}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			title: title,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Ошибка сервера ${response.status}`);
			}
			return response.json();
		})
		.then(() => callModalEditPromptClose())
		.then(() => callRefreshList())
		.then(() => console.log('Задача обновлена'))
		.catch((error) => console.log('Ошибка обновления задачи', error));
};
