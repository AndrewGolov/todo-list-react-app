export const RenderTodoItemPlaceholder = (item) => {
	return (
		<>
			<label htmlFor={`todo-${item.id}`}>{item.title}</label>
		</>
	);
};
