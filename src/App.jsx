import { useRequestGetTodosJsonServer } from './hooks';
import { TODOS_URL_JSON_SERVER } from './constants/constants';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';

import {
	Error404,
	JsonServerTodoList,
	FirebaseApp,
	Loader,
	AddNewTask,
	TaskPage,
	Button,
	ClearAllTodos,
	SearchTaskComponent,
} from './components';

import { ImSearch, ImSortAlphaAsc, ImListNumbered } from 'react-icons/im';

/*====================== */

export const App = () => {
	const { todosJsonServer, isLoadingJsonServer, setRefreshList } = useRequestGetTodosJsonServer();

	const handleMouseEnter = (e) => {
		const element = e.currentTarget;
		const rect = element.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const width = rect.width;
		const distFromLeft = x;
		const distFromRight = width - x;

		if (distFromLeft < distFromRight) {
			element.classList.add('from-left');
			element.classList.remove('from-right');
		} else {
			element.classList.add('from-right');
			element.classList.remove('from-left');
		}
	};

	const handleMouseLeave = (e) => {
		const element = e.currentTarget;
		element.classList.remove('from-left', 'from-right');
	};

	return (
		<div className="app__wrapper">
			<div className="Navbar__wrapper">
				<ul className="Navbar__list">
					<li className="Navbar__list-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						<Link to="/">Список задач JSON-server</Link>
					</li>

					<li className="Navbar__list-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						<Link className="Navbar__list-item_link" to="/firebase">
							Firebase App
						</Link>
					</li>
				</ul>
			</div>

			{/* Json server List*/}
			<div>{isLoadingJsonServer && <Loader />}</div>

			<Routes>
				<Route
					path="/"
					element={<JsonServerTodoList dataArr={todosJsonServer} setRefreshList={setRefreshList} />}
				/>
				<Route
					path="/jsonservertodos/task/:id"
					element={<TaskPage todos={todosJsonServer} setRefreshList={setRefreshList} />}
				/>

				<Route path="/firebase" element={<FirebaseApp />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</div>
	);
};
