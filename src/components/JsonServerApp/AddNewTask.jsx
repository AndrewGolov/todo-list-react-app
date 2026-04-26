// "Элемент для добавления новой задачи в список задач, который использует JSON Server в качестве бэкенда. Он содержит форму для ввода новой задачи и кнопку для отправки данных на сервер."
import { useState } from 'react';
import { PromptModal, Button } from '..';
import { ImPlus } from 'react-icons/im';
import { requestAddNewTodoJsonServer } from '../../utils';

export const AddNewTask = ({ linkServer, stateLoading, callbackRefreshList }) => {
	const [isModalPromptOpen, setIsModalPromptOpen] = useState(false);

	const handleRequestAddTask = ({ title }) =>
		requestAddNewTodoJsonServer({
			link: linkServer,
			title,
			callModalPromptClose: () => setIsModalPromptOpen(false),
			callRefreshList: () => callbackRefreshList(),
		});

	return (
		<>
			<Button text={<ImPlus />} disabled={stateLoading} onClick={() => setIsModalPromptOpen(true)} />
			<PromptModal
				submitText="Добавить"
				isOpen={isModalPromptOpen}
				onClose={() => setIsModalPromptOpen(false)}
				onAction={handleRequestAddTask}
				titleModal="Добавить задачу"
				placeholder="Введите название задачи..."
			/>
		</>
	);
};
