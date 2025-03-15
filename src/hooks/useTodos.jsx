import { useState } from 'react';
import { todosAPI } from '../api/todosAPI';

export const useTodos = (initialState = []) => {
	const [todos, setTodos] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const readTodos = async () => {
		setIsLoading(true);
		try {
			const data = await todosAPI.readALL();
			setTodos(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createTodo = async (todo) => {
		setIsLoading(true);
		try {
			const createTodos = await todosAPI.create(todo);
			setTodos([...todos, createTodos]);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	const updateTodo = async (todoId, newTitle) => {
		setIsLoading(true);
		try {
			await todosAPI.update(todoId, newTitle);
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === todoId ? { ...todo, title: newTitle } : todo,
				),
			);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};
	const deleteTodo = async (todoId) => {
		setIsLoading(true);
		try {
			await todosAPI.delete(todoId);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		todos,
		isLoading,
		error,
		readTodos,
		createTodo,
		updateTodo,
		deleteTodo,
	};
};
