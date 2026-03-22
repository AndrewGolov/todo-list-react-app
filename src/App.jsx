import { useState, useRef, useEffect } from 'react';
import { useRequestGetTodos, useRequestGetTodosJsonServer } from './hooks';
import {
	requestAddNewTodoJsonServer,
	requestDeleteTaskTodoJsonServer,
	requestCompletedTaskTodoJsonServer,
	requestEditTodoTaskJsonServer,
	RenderTodoItemPlaceholder,
	RenderTodoItemJsonServer,
	RenderEditBtnBlock,
} from './utils';
import { List, Loader, Title, ConfirmModal, PromptModal, Field } from './components';
import './App.css';
import stylesTodoList from './utils/styles/TodoList.module.css';
import { TODOS_URL_JSON_SERVER } from './constants/constants';

export const App = () => {
	const { todos, isLoading } = useRequestGetTodos();
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

	const handleAddTask = (title) => {
		requestAddNewTodoJsonServer(title);
		setRefreshList((prev) => !prev);
		setIsModalPromptOpen(false);
	};

	const handleDeleteTask = (id) => {
		setIdToDelete(id);
		setIsModalConfirmOpen(true);
	};
	const onConfirmDeleteTask = (id) => {
		requestDeleteTaskTodoJsonServer(id);
		setRefreshList((prev) => !prev);
		setIsModalConfirmOpen(false);
		setIdToDelete(null);
	};

	const handleEditTask = (id) => {
		setIdToEdit(id);
		setIsModalEditPromptOpen(true);
	};
	const saveEditedTask = (title) => {
		requestEditTodoTaskJsonServer(idToEdit, title);
		setRefreshList((prev) => !prev);
		setIsModalEditPromptOpen(false);
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
		const filterCompleted = sorted.toSorted((a, b) => a.completed - b.completed);

		return searchTask && isSearchFieldOpen && filterCompleted
			? filterCompleted.filter((item) => item.title.toLowerCase().includes(searchTask.toLowerCase()))
			: filterCompleted;
	};

	const handleClearTodos = () => {
		setIsModalConfirmDeleteAllOpen(true);
	};

	const confirmedDeleteAll = () => {
		Promise.all(todosJsonServer.map((item) => fetch(`${TODOS_URL_JSON_SERVER}/${item.id}`, { method: 'DELETE' })))
			.then(() => console.log('Все задачи удалены'))
			.then(() => setRefreshList((prev) => !prev))
			.catch((error) => console.log('Ошибка очистки списка задач', error))
			.finally(() => setIsModalConfirmDeleteAllOpen(false));
	};

	return (
		<div>
			<Title text="Todo List" sizeTitle={1} />

			{/*=========================== Туду Лист Placeholder ===========================*/}
			<div className="component-list">
				{isLoading ? (
					<Loader />
				) : (
					<List
						name="todos"
						titleList="Список задач - Placeholder JSON"
						listArr={todos}
						isLoading={isLoading}
						renderItem={RenderTodoItemPlaceholder}
						emptyList="Список задач пуст"
						style={stylesTodoList}
					/>
				)}
			</div>

			{/*=========================== Туду Лист JSON-server ===========================*/}
			<div className="component-list">
				{isLoadingJsonServer ? (
					<Loader />
				) : (
					<div>
						<List
							name="todosJsonServer"
							titleList="Список задач - JSON Server"
							listArr={getPrintArr()}
							isLoading={isLoadingJsonServer}
							renderItem={(item) =>
								RenderTodoItemJsonServer(
									item,
									handleDeleteTask,
									requestCompletedTaskTodoJsonServer,
									setRefreshList,
									handleEditTask,
								)
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
									ref={searchFieldRef}
									type="text"
									value={searchTask}
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
							onAction={handleAddTask}
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
							onConfirm={() => onConfirmDeleteTask(idToDelete)}
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
		</div>
	);
};
