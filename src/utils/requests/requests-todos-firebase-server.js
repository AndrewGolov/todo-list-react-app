import { ref, push, update, remove, set } from 'firebase/database';
import { db } from '../../firebase';

export const requestAddTaskToDataBase = ({ title, handeClosePromptModal }) => {
	const dataBaseRef = ref(db, 'todos');
	push(dataBaseRef, { completed: false, title })
		.then(() => console.log('Задача успешно добавлена'))
		.then(() => handeClosePromptModal())
		.catch((error) => console.log('Ошибка ДОБАВЛЕНИЯ задачи', error));
};
export const requestCompletedTask = ({ id, completed }) => {
	const dataBaseRef = ref(db, `todos/${id}`);
	update(dataBaseRef, { completed: !completed })
		.then(() => console.log('Задача отмечена как ВЫПОЛНЕНА / НЕ ВЫПОЛНЕНА '))
		.catch((error) => console.log('Ошибка ДОБАВЛЕНИЯ задачи', error));
};
export const requestDeleteTask = ({ id, handleCloseConfirmModal }) => {
	const dataBaseRef = ref(db, `todos/${id}`);
	remove(dataBaseRef)
		.then(() => console.log('Задача УДАЛЕНА '))
		.then(() => handleCloseConfirmModal())
		.catch((error) => console.log('Ошибка УДАЛЕНИЯ задачи', error));
};
export const requestEditTask = ({ id, title, handeCloseEditPromptModal }) => {
	const dataBaseRef = ref(db, `todos/${id}`);
	set(dataBaseRef, { completed: false, title })
		.then(() => console.log('Задача успешно РЕДАКТИРОВАНА '))
		.then(() => handeCloseEditPromptModal())
		.catch((error) => console.log('Ошибка РЕДАКТИРОВАНИЯ задачи', error));
};
export const requestClearTodos = ({ handleCloseDeleteAllModal }) => {
	const dataBaseRef = ref(db, 'todos');
	set(dataBaseRef, null)
		.then(() => console.log('Все задачи УДАЛЕНЫ'))
		.catch((error) => console.log('Ошибка очистки списка задач', error))
		.finally(() => handleCloseDeleteAllModal());
};
