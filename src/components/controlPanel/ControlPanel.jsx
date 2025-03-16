import { useState } from 'react';
import styles from '../../App.module.css';
import { sortTodos } from '../helpers/sortTodos';

export const ControlPanel = ({ createTodo, todos, setTodos, isLoading }) => {
	const [newTodo, setNewTodo] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const handleAddTodo = () => {
		if (newTodo.trim()) {
			createTodo(newTodo);
		}
	};

	const toggleSort = () => {
		setIsSorted(isSorted);
		setTodos(sortTodos(todos, !isSorted));
	};

	const handleSumbit = (event) => {
		event.preventDefault();
		if (newTodo.trim()) {
			ondeviceorientationabsolute({ newTodo });
			setNewTodo('');
		}
	};

	return (
		<>
			<div>
				<button className={styles['sort-button']} onClick={toggleSort}>
					{isSorted ? 'Отмена сортировки' : 'Сортировать по алфавиту'}
				</button>
			</div>
			{isLoading && <div className={styles.loader}>Загрузка...</div>}
			<form onSubmit={handleSumbit}>
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
