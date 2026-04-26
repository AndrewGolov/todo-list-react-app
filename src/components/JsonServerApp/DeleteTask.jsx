import { useState } from 'react';
import { requestDeleteTaskTodoJsonServer } from '../../utils';
import { useNavigate } from 'react-router-dom';

import { Button, ConfirmModal } from '../../components';
import { ImBin } from 'react-icons/im';
import { TODOS_URL_JSON_SERVER } from '../../constants/constants';
import styles from './styles/DeleteTask.module.css';

export const DeleteTask = ({ id, setRefreshList }) => {
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
	const navigate = useNavigate();

	const onConfirmDeleteTask = () => {
		requestDeleteTaskTodoJsonServer({
			id,
			link: TODOS_URL_JSON_SERVER,
			callRefreshList: () => setRefreshList((prev) => !prev),
		});
		navigate(-1);
	};

	return (
		<>
			<Button
				type="button"
				className={styles['DeleteTask__delete-button']}
				onClick={() => setIsModalConfirmOpen(true)}
				text={
					<>
						<ImBin />
						Удалить
					</>
				}
			/>
			{isModalConfirmOpen && (
				<ConfirmModal
					isOpen={isModalConfirmOpen}
					onClose={() => setIsModalConfirmOpen(false)}
					onConfirm={() => onConfirmDeleteTask()}
					titleConfirmModal="Вы уверены, что хотите удалить эту задачу?"
				/>
			)}
		</>
	);
};
