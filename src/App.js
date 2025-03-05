import { useEffect, useState } from 'react';
import styles from './App.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<div className={styles.body}>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				todos.map(({ id, title }) => <div key={id}>{title}</div>)
			)}
		</div>
	);
};
