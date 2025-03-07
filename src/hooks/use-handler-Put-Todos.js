import { useState } from 'react';

export const useHandlerPutTodos = (setTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const TODOS_URL = 'http://localhost:3005/todos';

	const handlerPutTodos = (id, newTitle) => {
		return fetch(`${TODOS_URL}/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTitle,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				console.log('Обновлено дело, ответ сервера', updatedTodo);
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setIsUpdating(false);
			});
	};
	return { isUpdating, handlerPutTodos };
};
