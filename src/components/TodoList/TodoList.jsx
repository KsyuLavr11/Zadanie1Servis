import { sortTodos } from '../helpers/sortTodos';
import styles from '../../App.module.css';

export const TodoList = () => {
	return (
		<div>
			<button className={styles['sort-button']} onClick={sortTodos}>
				Сортировки дел по алфавиту
			</button>
		</div>
	);
};
