import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDWG6gXbBFl_i7lBDlSE58Fp0eCOhusTBU',
	authDomain: 'todo-list-react-77120.firebaseapp.com',
	projectId: 'todo-list-react-77120',
	storageBucket: 'todo-list-react-77120.firebasestorage.app',
	messagingSenderId: '560066329826',
	appId: '1:560066329826:web:7027758b7de9a0334c72bb',
	databaseURL: 'https://todo-list-react-77120-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
