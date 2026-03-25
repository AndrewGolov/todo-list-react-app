import stylesTodoList from '../utils/styles/TodoList.module.css';
import { RenderTodoItemPlaceholder } from '../utils';
import { useRequestGetTodos } from '../hooks';
import { List, Loader } from '../components';

export const PlaceholderTodosApp = () => {
	const { todos, isLoading } = useRequestGetTodos();
	return (
		<div className="component-list">
			{isLoading ? (
				<Loader />
			) : (
				<List
					name="todos"
					titleList="Тудушка Json Placeholder "
					listArr={todos}
					isLoading={isLoading}
					renderItem={RenderTodoItemPlaceholder}
					emptyList="Список задач пуст"
					style={stylesTodoList}
				/>
			)}
		</div>
	);
};
