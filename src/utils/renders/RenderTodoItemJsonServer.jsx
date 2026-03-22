import { Button } from '../../components';
import { ImBin, ImPencil2, ImCheckmark2, ImCheckmark } from 'react-icons/im';

export const RenderTodoItemJsonServer = (
	item,
	handleDeleteTask,
	requestCompletedTaskTodoJsonServer,
	setRefreshList,
	handleEditTask,
) => {
	return (
		<>
			<label htmlFor={`todo-${item.id}`}>{item.title}</label>

			<div>
				<Button
					text={
						!item.completed ? (
							<ImCheckmark2 />
						) : (
							<span
								style={{
									color: 'green',
									fontSize: '16px',
									fontWeight: '500',
								}}
							>
								<ImCheckmark />
							</span>
						)
					}
					type="button"
					onClick={() => {
						requestCompletedTaskTodoJsonServer(item.id, item.completed);
						setRefreshList((prev) => !prev);
					}}
				/>
				<Button text={<ImBin />} type="button" onClick={() => handleDeleteTask(item.id)} />
				<Button
					text={<ImPencil2 />}
					type="button"
					onClick={() => {
						handleEditTask(item.id);
						setRefreshList((prev) => !prev);
					}}
				/>
			</div>
		</>
	);
};
