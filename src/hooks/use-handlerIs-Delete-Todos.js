import { useState } from 'react';

export const useHandlerIsDeleteTodos = (setTodos) => {
	const [isDeletingTodos, setIsDeletingTodos] = useState(false);

	const TODOS_URL = 'http://localhost:3005/todos';

	const handlerIsDeleteTodos = (todoId) => {
		setIsDeletingTodos(true);
		fetch(`${TODOS_URL}/${todoId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
				console.log('Удалено дело, ответ сервера', response);
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setIsDeletingTodos(false);
			});
	};
	return { handlerIsDeleteTodos, isDeletingTodos };
};
