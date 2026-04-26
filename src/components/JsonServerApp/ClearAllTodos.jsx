import { ConfirmModal } from '../../components';
import { requestDeleteTaskTodoJsonServer } from '../../utils';

import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const ClearAllTodos = ({ arr, setRefreshList, isModalConfirmDeleteAllOpen, setIsModalConfirmDeleteAllOpen }) => {
	const confirmedDeleteAll = () => {
		Promise.all(
			arr.map((item) => {
				requestDeleteTaskTodoJsonServer({
					link: TODOS_URL_JSON_SERVER,
					id: item.id,
				});
			}),
		)
			.then(() => console.log('Все задачи удалены'))
			.then(() => setRefreshList((prev) => !prev))
			.catch((error) => console.log('Ошибка очистки списка задач', error))
			.finally(() => setIsModalConfirmDeleteAllOpen(false));
	};

	return (
		<div>
			<ConfirmModal
				isOpen={isModalConfirmDeleteAllOpen}
				onClose={() => setIsModalConfirmDeleteAllOpen(false)}
				titleConfirmModal="Вы уверены, что хотите очистить список дел?"
				onConfirm={() => {
					console.log('Подтверждено');
					confirmedDeleteAll();
				}}
			/>
		</div>
	);
};
