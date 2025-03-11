import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDe9bdEYtKFnz7Wskge9mxTIP50_F8_kUo',
	authDomain: 'todosproject-a9cba.firebaseapp.com',
	projectId: 'todosproject-a9cba',
	storageBucket: 'todosproject-a9cba.firebasestorage.app',
	messagingSenderId: '145718978254',
	appId: '1:145718978254:web:49fc13b8cccca43ebcd29f',
	databaseURL:
		'https://todosproject-a9cba-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
