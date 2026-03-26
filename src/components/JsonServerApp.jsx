import { useState, useRef, useEffect } from 'react';
import { useRequestGetTodosJsonServer } from '../hooks';
import {
	requestAddNewTodoJsonServer,
	requestDeleteTaskTodoJsonServer,
	requestCompletedTaskTodoJsonServer,
	requestEditTodoTaskJsonServer,
	RenderTodoItem,
	RenderEditBtnBlock,
} from '../utils';
import { Loader, List, PromptModal, ConfirmModal, Field } from '../components';
import stylesTodoList from '../utils/styles/TodoList.module.css';

export const JsonServerApp = ({ linkServer }) => {
	const { todosJsonServer, isLoadingJsonServer, setRefreshList } = useRequestGetTodosJsonServer();
	const [isModalPromptOpen, setIsModalPromptOpen] = useState(false);
	const [isModalEditPromptOpen, setIsModalEditPromptOpen] = useState(false);
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
	const [isModalConfirmDeleteAllOpen, setIsModalConfirmDeleteAllOpen] = useState(false);
	const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);
	const [idToDelete, setIdToDelete] = useState(null);
	const [idToEdit, setIdToEdit] = useState(null);
	const [searchTask, setSearchTask] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const searchFieldRef = useRef(null);

	useEffect(() => {
		if (isSearchFieldOpen) searchFieldRef.current.focus();
	}, [isSearchFieldOpen]);

	const handleRequestAddTask = ({ title }) => {
		requestAddNewTodoJsonServer({
			link: linkServer,
			title,
			callModalPromptClose: () => setIsModalPromptOpen(false),
			callRefreshList: () => setRefreshList((prev) => !prev),
		});
	};

	const handleRequestCompleteTodos = ({ id, completed }) =>
		requestCompletedTaskTodoJsonServer({
			id,
			completed,
			link: linkServer,
			callRefreshList: () => setRefreshList((prev) => !prev),
		});

	const handleDeleteTask = ({ id }) => {
		setIdToDelete(id);
		setIsModalConfirmOpen(true);
	};
	const onConfirmDeleteTask = ({ id }) => {
		requestDeleteTaskTodoJsonServer({
			id,
			link: linkServer,
			callRefreshList: () => setRefreshList((prev) => !prev),
		});
		setIsModalConfirmOpen(false);
		setIdToDelete(null);
	};

	const handleEditTask = ({ id }) => {
		setIdToEdit(id);
		setIsModalEditPromptOpen(true);
	};
	const saveEditedTask = ({ title }) => {
		requestEditTodoTaskJsonServer({
			link: linkServer,
			id: idToEdit,
			title,
			callModalEditPromptClose: () => setIsModalEditPromptOpen(false),
			callRefreshList: () => setRefreshList((prev) => !prev),
		});
		setIdToEdit(null);
	};
	const onCloseEditModal = () => {
		setIsModalEditPromptOpen(false);
		setIdToEdit(null);
	};

	const onSearchClick = () => {
		setIsSearchFieldOpen((prev) => !prev);
	};

	const onSortHandleClick = () => setIsSorted((prev) => !prev);

	const getPrintArr = () => {
		const sorted = isSorted
			? todosJsonServer.toSorted((a, b) =>
					a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }),
				)
			: todosJsonServer;

		return searchTask && isSearchFieldOpen
			? sorted.filter((item) => item.title.toLowerCase().includes(searchTask.toLowerCase()))
			: sorted;
	};

	const handleClearTodos = () => {
		setIsModalConfirmDeleteAllOpen(true);
	};

	const confirmedDeleteAll = () => {
		Promise.all(
			todosJsonServer.map((item) => {
				requestDeleteTaskTodoJsonServer({
					link: linkServer,
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
		<div className="component-list">
			{isLoadingJsonServer ? (
				<Loader />
			) : (
				<div>
					<List
						name="todosJsonServer"
						titleList="Тудушка JsonServer"
						listArr={getPrintArr()}
						isLoading={isLoadingJsonServer}
						renderItem={(item) =>
							RenderTodoItem({
								item,
								handleDeleteTask,
								handleRequestCompleteTodos,
								setRefreshList,
								handleEditTask,
							})
						}
						emptyList="Список задач пуст"
						style={stylesTodoList}
					>
						{/* ========== Блок кнопок управления  ========== */}

						<RenderEditBtnBlock
							dataBase={todosJsonServer}
							disabled={isLoadingJsonServer}
							onAddClick={() => setIsModalPromptOpen(true)}
							onSearchClick={onSearchClick}
							onSortHandleClick={onSortHandleClick}
							isSorted={isSorted}
							onClearAllTodos={handleClearTodos}
						/>
						{isSearchFieldOpen && (
							<Field
								inpRef={searchFieldRef}
								type="text"
								value={searchTask.trim()}
								onChange={(e) => setSearchTask(e.target.value)}
								placeholder="Поиск задач..."
							/>
						)}
					</List>

					{/* ========== Модалка для добавления задачи ========== */}

					<PromptModal
						submitText="Добавить"
						isOpen={isModalPromptOpen}
						onClose={() => setIsModalPromptOpen(false)}
						onAction={handleRequestAddTask}
						titleModal="Добавить задачу"
						placeholder="Введите название задачи..."
					/>

					{/* ========== Модалка для редактирования задачи ========== */}

					<PromptModal
						submitText="Сохранить"
						isOpen={isModalEditPromptOpen}
						onClose={() => onCloseEditModal()}
						onAction={saveEditedTask}
						titleModal="Редактировать задачу"
						placeholder="Откоректируйте название задачи..."
						initialValue={todosJsonServer.find((item) => item.id === idToEdit)?.title.trim() || ''}
					/>

					{/* ========= Модалка для подтверждения удаления задачи ========= */}

					<ConfirmModal
						isOpen={isModalConfirmOpen}
						onClose={() => setIsModalConfirmOpen(false)}
						onConfirm={() => onConfirmDeleteTask({ id: idToDelete })}
						titleConfirmModal="Вы уверены, что хотите удалить эту задачу?"
					/>
					<ConfirmModal
						isOpen={isModalConfirmDeleteAllOpen}
						onClose={() => setIsModalConfirmDeleteAllOpen(false)}
						onConfirm={() => confirmedDeleteAll()}
						titleConfirmModal="Вы уверены, что хотите очистить список дел?"
					/>
				</div>
			)}
		</div>
	);
};
