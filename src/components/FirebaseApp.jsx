import { useState, useRef, useEffect } from 'react';
import {
	RenderTodoItem,
	RenderEditBtnBlock,
	requestAddTaskToDataBase,
	requestCompletedTask,
	requestDeleteTask,
	requestEditTask,
	requestClearTodos,
} from '../utils';
import { useRequestGetTodosFirbase } from '../hooks/use-request-get-todos-firebase';
import { List, Loader, ConfirmModal, PromptModal, Field } from '.';
import stylesTodoList from '../utils/styles/TodoList.module.css';

export const FirebaseApp = () => {
	const { todosFirebase, isLoadingFirebase } = useRequestGetTodosFirbase();
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

	const handleRequestAddTask = ({ title }) =>
		requestAddTaskToDataBase({ title, handeClosePromptModal: () => setIsModalPromptOpen(false) });

	const handleRequestCompleteTodos = ({ id, completed }) => requestCompletedTask({ id, completed });

	const handleDeleteTask = ({ id }) => {
		setIsModalConfirmOpen(true);
		setIdToDelete(id);
	};
	const onConfirmDeleteTask = () => {
		requestDeleteTask({ id: idToDelete, handleCloseConfirmModal: () => setIsModalConfirmOpen(false) });
		setIdToDelete(null);
	};

	const handleEditTask = ({ id }) => {
		setIdToEdit(id);
		setIsModalEditPromptOpen(true);
	};

	const saveEditedTask = ({ title }) => {
		requestEditTask({ id: idToEdit, title, handeCloseEditPromptModal: () => setIsModalEditPromptOpen(false) });
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
			? todosFirebase.toSorted((a, b) =>
					a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }),
				)
			: todosFirebase;

		return searchTask && isSearchFieldOpen
			? sorted.filter((item) => item.title.toLowerCase().includes(searchTask.toLowerCase()))
			: sorted;
	};

	const handleClearTodos = () => {
		setIsModalConfirmDeleteAllOpen(true);
	};
	const handleAcceptedDeleteAllTodos = () =>
		requestClearTodos({ handleCloseDeleteAllModal: () => setIsModalConfirmDeleteAllOpen(false) });

	return (
		<div className="component-list">
			{isLoadingFirebase ? (
				<Loader />
			) : (
				<div>
					<List
						name="firebase-todo-list"
						titleList="Тудушка Firebase"
						listArr={getPrintArr()}
						isLoading={isLoadingFirebase}
						renderItem={(item) =>
							RenderTodoItem({ item, handleRequestCompleteTodos, handleDeleteTask, handleEditTask })
						}
						emptyList="Список задач пуст"
						style={stylesTodoList}
					>
						{/* ========== Блок кнопок управления  ========== */}

						<RenderEditBtnBlock
							dataBase={todosFirebase}
							disabled={isLoadingFirebase}
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
						initialValue={todosFirebase.find((item) => item.id === idToEdit)?.title.trim() || ''}
					/>

					{/* ========= Модалка для подтверждения удаления задачи ========= */}

					<ConfirmModal
						isOpen={isModalConfirmOpen}
						onClose={() => setIsModalConfirmOpen(false)}
						onConfirm={() => onConfirmDeleteTask()}
						titleConfirmModal="Вы уверены, что хотите удалить эту задачу?"
					/>
					<ConfirmModal
						isOpen={isModalConfirmDeleteAllOpen}
						onClose={() => setIsModalConfirmDeleteAllOpen(false)}
						onConfirm={() => handleAcceptedDeleteAllTodos()}
						titleConfirmModal="Вы уверены, что хотите очистить список дел?"
					/>
				</div>
			)}
		</div>
	);
};
