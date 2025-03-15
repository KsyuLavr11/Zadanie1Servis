import { useEffect, useState } from 'react';
import './App.css';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { TodoItemEdition } from './components/TododItem/TodoItemEdition';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTodos } from './components/helpers/filterTodos';
import { useTodos } from './hooks';

export const App = () => {
	const {
		todos,
		isLoading,
		error,
		readTodos,
		createTodo,
		updateTodo,
		deleteTodo,
		setTodos,
	} = useTodos([]);
	const { isDeletingTodo, setIsDeletingTodo } = useState(false);

	useEffect(() => {
		readTodos();
	}, []);

	const handlerIsDeleteTodo = (todoId) => {
		setIsDeletingTodo(true);
		deleteTodo(todoId)
			.then((response) => {
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
				console.log('Удалено дело, ответ сервера', response);
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setIsDeletingTodo(false);
			});
	};

	/*const sortedTodos = isSort ? sortTodos(filtredTodos) : filtredTodos;*/

	/*const filtredTodos = searchTerm ? filterTodos(todos) : todos;*/

	/*if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
			if (error) return <div className={styles.error}>Ошибка{error}</div>;*/

	return (
		<div className="app">
			<h4>Список дел</h4>
			<FilterTodos />
			<TodoList todos={todos} />
			<TodoItemEdition
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
				setTodos={setTodos}
				isLoading={isLoading}
				handlerIsDeleteTodo={handlerIsDeleteTodo}
				isDeletingTodo={isDeletingTodo}
			/>
			<ControlPanel
				todos={todos}
				isLoading={isLoading}
				error={error}
				readTodos={readTodos}
				createTodo={createTodo}
			/>
		</div>
	);
};

/* <ControlPanel/> //input(search),input(new task),button (сортировка)
//TodoItem-todoID,TododIteEditing-todoeditem
    <TodosList/ sort={sortTodos} isLoading={isLoading}>
    </>*/
