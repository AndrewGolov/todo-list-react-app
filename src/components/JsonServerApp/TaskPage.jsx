import { useParams, useNavigate } from 'react-router-dom';
import { ImArrowLeft, ImPencil2, ImBin } from 'react-icons/im';
import { HandleActionCompleted } from './HandleActionCompleted';

import { Button, PromptModal } from '../../components';
import { TODOS_URL_JSON_SERVER } from '../../constants/constants';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import styles from './styles/TaskPage.module.css';

export const TaskPage = ({ todos, setRefreshList }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const task = todos.find((task) => Number(task.id) === Number(id));

	return (
		<div className={styles['TaskPage__container']}>
			<div className={styles['TaskPage__header']}>
				<div className={styles['TaskPage__header-content']}>
					<h5 className={styles['TaskPage__title']}>{task.title}</h5>
				</div>

				<div className={styles['TaskPage__action-buttons']}>
					<Button
						type="button"
						className={styles['TaskPage__back-button']}
						onClick={() => navigate(-1)}
						text={
							<>
								<ImArrowLeft />
								Назад
							</>
						}
					/>
					<EditTask task={task} setRefreshList={setRefreshList} />
					<DeleteTask id={task.id} setRefreshList={setRefreshList} />
					<HandleActionCompleted id={task.id} completed={task.completed} setRefreshList={setRefreshList} />

					{task.completed ? (
						<span className={styles['TaskPage__completed']}>Задача выполнена</span>
					) : (
						<span className={styles['TaskPage__not-completed']}>Задача не выполнена</span>
					)}
				</div>
			</div>
		</div>
	);
};
