import { useState } from 'react';
import styles from '../../App.module.css';

export const ControlPanel = ({ readTodos, createTodo, isLoading, error, todos }) => {
	const [newTodo, setNewTodo] = useState('');

	const handleAddTodo = () => {
		if (newTodo.trim()) {
			createTodo(newTodo)
				.then(() => {
					readTodos();
				})
				.catch((error) => {
					console.log('error', error);
				})
				.finally(() => {
					setNewTodo('');
				});
		}
	};

	/*{error ? <div className={styles.error}>Ошибка загрузки задач</div> : null}}*/

	return (
		<>
			{isLoading && <div className={styles.loader}>Загрузка...</div>}
			<form onSubmit={(event) => event.preventDefault()}>
				<div className={styles['add-todo-container']}>
					<input
						className={styles.input}
						type="text"
						name="text"
						value={newTodo}
						placeholder="Ведите название дела"
						onChange={(event) => setNewTodo(event.target.value)}
					/>
					<button
						disabled={isLoading}
						onClick={handleAddTodo}
						className={styles.button}
					>
						Добавить дело
					</button>
				</div>
			</form>
		</>
	);
};
