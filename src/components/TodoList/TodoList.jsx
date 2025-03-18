import styles from '../../App.module.css';
import { TodoItemEdition } from '../TododItem/TodoItemEdition';

export const TodoList = ({ todos, updateTodo, deleteTodo }) => {
	return (
		<ul className={styles['todo-list']}>
			{todos.map((todo) => (
				<li key={todo.id}>
					<TodoItemEdition
						todo={todo}
						onUpdateTodo={updateTodo}
						deleteTodo={deleteTodo}
					/>
				</li>
			))}
		</ul>
	);
};
