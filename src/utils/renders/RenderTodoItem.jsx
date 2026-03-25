import { Button } from '../../components';
import { ImBin, ImPencil2, ImCheckmark2, ImCheckmark } from 'react-icons/im';

export const RenderTodoItem = ({ item, handleDeleteTask, handleRequestCompleteTodos, handleEditTask }) => (
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
				onClick={() => handleRequestCompleteTodos({ id: item.id, completed: item.completed })}
			/>
			<Button text={<ImBin />} type="button" onClick={() => handleDeleteTask({ id: item.id })} />
			<Button
				text={<ImPencil2 />}
				type="button"
				onClick={() => {
					handleEditTask({ id: item.id });
				}}
			/>
		</div>
	</>
);
