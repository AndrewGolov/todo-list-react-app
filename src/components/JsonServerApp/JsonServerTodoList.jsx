import { useState } from 'react';
import style from './styles/JsonServerApp.module.css';
import { Link } from 'react-router-dom';
import { TODOS_URL_JSON_SERVER } from '../../constants/constants';
import { HandleActionCompleted } from './HandleActionCompleted';
import { AddNewTask, SearchTaskComponent, Button, ClearAllTodos } from '../../components';
import { ImSearch, ImListNumbered, ImSortAlphaAsc } from 'react-icons/im';
import { filteredSearchArr, sortedArrTodos } from '../../utils';

export const JsonServerTodoList = ({ dataArr, setRefreshList }) => {
	const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);
	const [searchTask, setSearchTask] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [isModalConfirmDeleteAllOpen, setIsModalConfirmDeleteAllOpen] = useState(false);

	return (
		<div className={style['list__wrapper']}>
			<h4>Тудушка JSON Server</h4>
			<div className={style['actionBar__wrapper']}>
				<ul className={style['actionBar__list']}>
					{dataArr.length < 2 ? (
						<li>
							<AddNewTask
								callbackRefreshList={() => setRefreshList((prev) => !prev)}
								linkServer={TODOS_URL_JSON_SERVER}
							/>
						</li>
					) : (
						<>
							<li>
								<AddNewTask
									callbackRefreshList={() => setRefreshList((prev) => !prev)}
									linkServer={TODOS_URL_JSON_SERVER}
								/>
							</li>
							<li>
								<Button text={<ImSearch />} onClick={() => setIsSearchFieldOpen((prev) => !prev)} />
							</li>
							<li>
								<Button
									text={isSorted ? <ImSortAlphaAsc /> : <ImListNumbered />}
									onClick={() => setIsSorted((prev) => !prev)}
								/>
							</li>
							<li>
								<Button text="Clear All" onClick={() => setIsModalConfirmDeleteAllOpen(true)} />
							</li>
						</>
					)}
				</ul>

				<ClearAllTodos
					arr={dataArr}
					setRefreshList={setRefreshList}
					isModalConfirmDeleteAllOpen={isModalConfirmDeleteAllOpen}
					setIsModalConfirmDeleteAllOpen={setIsModalConfirmDeleteAllOpen}
				/>
			</div>

			{isSearchFieldOpen && (
				<SearchTaskComponent isOpen={isSearchFieldOpen} searchTask={searchTask} setSearchTask={setSearchTask} />
			)}

			<ul className={style['list']}>
				{dataArr.length === 0 ? (
					<div className={style['list__empty']}>Список задач пуст</div>
				) : (
					sortedArrTodos({
						arr: filteredSearchArr({ arr: dataArr, searchTask, isSearchFieldOpen }),
						isSorted,
					}).map((item) => (
						<li
							key={item.id}
							className={
								item.completed
									? `${style['list__item']} ${style['list__item-completed']}`
									: style['list__item']
							}
						>
							{
								<Link className={style['list__item-link']} to={`/jsonservertodos/task/${item.id}`}>
									{item.title}
								</Link>
							}
							<HandleActionCompleted
								id={item.id}
								completed={item.completed}
								setRefreshList={setRefreshList}
								linkServer={TODOS_URL_JSON_SERVER}
							/>
						</li>
					))
				)}
			</ul>
		</div>
	);
};
