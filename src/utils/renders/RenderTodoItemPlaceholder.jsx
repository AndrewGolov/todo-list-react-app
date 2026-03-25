export const RenderTodoItemPlaceholder = (item) => (
	<>
		<label htmlFor={`todo-${item.id}`}>{item.title}</label>
	</>
);
