import styles from '../../App.module.css';
import { TodoItemEdition } from '../TododItem/TodoItemEdition';

export const TodoList = (todos, updateTodo, deleteTodo) => {
	/*console.log('todosList', typeof todos);
	console.log('todosList2', todos);*/
	return (
		<ul className={styles['todo-list']}>
			{todos.map((todo) => (
				<li>
					<TodoItemEdition
						key={todo.id}
						todo={todo}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
					/>
				</li>
			))}
			|| {}
		</ul>
	);
};
