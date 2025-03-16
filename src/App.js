import { useEffect } from 'react';
import './App.css';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { TodoItemEdition } from './components/TododItem/TodoItemEdition';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/helpers/filterTodos';
import { useTodos } from './hooks';
import styles from './App.module.css';

export const App = () => {
	const {
		todos,
		isLoading,
		error,
		deleteTodo,
		readTodos,
		createTodo,
		updateTodo,
		setTodos,
	} = useTodos([]);
	console.log(readTodos);
	useEffect(() => {
		readTodos();
	}, [readTodos]);

	/*{error ? <div className={styles.error}>Ошибка загрузки задач</div> : null}}*/
	/*const sortedTodos = isSort ? sortTodos(filtredTodos) : filtredTodos;*/

	/*const filtredTodos = searchTerm ? filterTodos(todos) : todos;*/

	return (
		<div className="app">
			<h4>Список дел</h4>
			<FilterTodos todos={todos} />
			{isLoading ? (
				<div className={styles.loader}>Загрузка...</div>
			) : error ? (
				<div className={styles.error}>Ошибка{error}</div>
			) : (
				<TodoList todos={todos} isLoading={isLoading} />
			)}
			<TodoItemEdition
				key={todos.id}
				todos={todos}
				onUpdateTodo={updateTodo}
				onDelete={deleteTodo}
			/>
			<ControlPanel
				createTodo={createTodo}
				todos={todos}
				setTodos={setTodos}
				isLoading={isLoading}
			/>
		</div>
	);
};

/* <ControlPanel/> //input(search),input(new task),button (сортировка)
//TodoItem-todoID,TododIteEditing-todoeditem
    <TodosList/ sort={sortTodos} isLoading={isLoading}>
    </>*/
