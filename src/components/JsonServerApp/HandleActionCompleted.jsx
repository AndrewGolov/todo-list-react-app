import { Button } from '..';
import { ImCheckmark2, ImCheckmark } from 'react-icons/im';
import { requestCompletedTaskTodoJsonServer } from '../../utils';
import { TODOS_URL_JSON_SERVER } from '../../constants/constants';

export const HandleActionCompleted = ({ id, completed, setRefreshList }) => {
	const handleRequestCompleteTodos = () =>
		requestCompletedTaskTodoJsonServer({
			id: id,
			completed,
			link: TODOS_URL_JSON_SERVER,
			callRefreshList: () => setRefreshList((prev) => !prev),
		});

	return (
		<div>
			<Button
				text={
					!completed ? (
						<ImCheckmark2 />
					) : (
						<span style={{ color: 'green', fontSize: '16px', fontWeight: '500' }}>
							<ImCheckmark />
						</span>
					)
				}
				type="button"
				onClick={() => handleRequestCompleteTodos()}
			/>
		</div>
	);
};
