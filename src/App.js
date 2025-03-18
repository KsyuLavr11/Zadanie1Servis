import './App.css';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';

export const App = () => {
	const {
		todos,
		isLoading,
		error,
		createTodo,
		updateTodo,
		deleteTodo,
		setIsSort,
		setSearchTerm,
		isSort,
	} = useTodos([]);

	if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
	if (error) return <div className={styles.error}>Ошибка{error.message}</div>;

	return (
		<div className="app">
			<ControlPanel
				createTodo={createTodo}
				isLoading={isLoading}
				todos={todos}
				isSort={isSort}
				setIsSort={setIsSort}
				setSearchTerm={setSearchTerm}
			/>
			<h4>Список дел</h4>
			<TodoList
				todo={todos}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				isLoading={isLoading}
			/>
		</div>
	);
};
