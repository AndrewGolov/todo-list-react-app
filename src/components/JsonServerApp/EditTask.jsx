import { useState } from 'react';
import { requestEditTodoTaskJsonServer } from '../../utils';
import { PromptModal, Button } from '../../components';
import { ImPencil2 } from 'react-icons/im';
import { TODOS_URL_JSON_SERVER } from '../../constants/constants';
import styles from './styles/EditTask.module.css';

export const EditTask = ({ task, setRefreshList }) => {
	const [isModalEditPromptOpen, setIsModalEditPromptOpen] = useState(false);

	const saveEditedTask = ({ title }) => {
		requestEditTodoTaskJsonServer({
			link: TODOS_URL_JSON_SERVER,
			id: task.id,
			title: title,
			callModalEditPromptClose: () => setIsModalEditPromptOpen(false),
			callRefreshList: () => setRefreshList((prev) => !prev),
		});
	};

	return (
		<>
			<Button
				text={
					<>
						<ImPencil2 /> Редактировать
					</>
				}
				type="button"
				onClick={() => setIsModalEditPromptOpen(true)}
				className={styles['EditTask__edit-button']}
			/>
			{isModalEditPromptOpen && (
				<PromptModal
					submitText="Сохранить"
					isOpen={isModalEditPromptOpen}
					onClose={() => setIsModalEditPromptOpen(false)}
					onAction={saveEditedTask}
					titleModal="Редактировать задачу"
					placeholder="Откоректируйте название задачи..."
					initialValue={task.title.trim()}
				/>
			)}
		</>
	);
};
