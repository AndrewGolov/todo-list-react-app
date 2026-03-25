import { useState, useRef, useEffect } from 'react';
import { RenderTodoItem, RenderEditBtnBlock } from '../utils';
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

	const handleAddTask = () => {
		setIsModalPromptOpen(false);
	};

	const handleDeleteTask = (id) => {
		setIdToDelete(id);
		setIsModalConfirmOpen(true);
	};
	const onConfirmDeleteTask = () => {
		setIsModalConfirmOpen(false);
		setIdToDelete(null);
	};

	const handleEditTask = (id) => {
		setIdToEdit(id);
		setIsModalEditPromptOpen(true);
	};
	const saveEditedTask = () => {
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
						renderItem={(item) => RenderTodoItem(item, handleDeleteTask, handleEditTask)}
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
						initialValue={todosFirebase.find((item) => item.id === idToEdit)?.title.trim() || ''}
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
						onConfirm={() => alert('Еще не реализовано')}
						titleConfirmModal="Вы уверены, что хотите очистить список дел?"
					/>
				</div>
			)}
		</div>
	);
};
