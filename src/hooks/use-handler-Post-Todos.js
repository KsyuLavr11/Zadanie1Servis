import { useState } from 'react';

export const useHandlerPostTodos = () => {
	const [newTodos, setNewTodos] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	const TODOS_URL = 'http://localhost:3005/todos';

	const handlerPostTodos = () => {
		setIsCreating(true);
		return fetch(TODOS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTodos,
			}),
		})
			.then(() => {
				setNewTodos('');
				console.log('Добавлено новое дело, ответ сервера', newTodos);
				return newTodos;
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setIsCreating(false);
			});
	};
	return { isCreating, newTodos, setNewTodos, handlerPostTodos };
};
