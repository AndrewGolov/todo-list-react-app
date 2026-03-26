import { Title } from './components';
import './App.css';
import { TODOS_URL_JSON_SERVER } from './constants/constants';

import { FirebaseApp, JsonServerApp, PlaceholderTodosApp } from './components';

export const App = () => {
	return (
		<div>
			<Title text="Todo Lists" sizeTitle={1} />
			<PlaceholderTodosApp />
			<JsonServerApp linkServer={TODOS_URL_JSON_SERVER} />
			<FirebaseApp />
		</div>
	);
};
