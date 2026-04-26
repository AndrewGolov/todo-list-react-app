import { Link } from 'react-router-dom';
import style from './styles/FirebaseApp.module.css';

export const FirebaseTodoList = ({ dataArr }) => {
	console.log('dataArr: ', dataArr);
	return (
		<div className={style['list__wrapper']}>
			<h4>Тудушка Firebase</h4>
			<ul className={style['list']}>
				{dataArr.length === 0 ? (
					<div className={style['list__empty']}>Список задач пуст</div>
				) : (
					dataArr.map((item) => (
						<li
							key={item.id}
							className={
								item.completed
									? `${style['list__item']} ${style['list__item-completed']}`
									: style['list__item']
							}
						>
							{
								<Link className={style['list__item-link']} to={`/firebase/task/${item.id}`}>
									{item.title}
								</Link>
							}
						</li>
					))
				)}
			</ul>
		</div>
	);
};
