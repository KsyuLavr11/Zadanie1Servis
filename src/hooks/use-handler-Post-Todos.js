import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../Firebase';

export const useHandlerPostTodos = () => {
	const [newTodos, setNewTodos] = useState('');
	const [isCreating, setIsCreating] = useState(false);

	const handlerPostTodos = () => {
		setIsCreating(true);
		const todosDbRef = ref(db, 'todos');

		return push(todosDbRef, {
			title: newTodos,
		})
			.then((newTodoRef) => {
				const newTodoId = newTodoRef.key;
				const newTodo = {
					id: newTodoId,
					title: newTodos,
				};

				setNewTodos('');
				console.log('Добавлено новое дело, ответ сервера', newTodo);
				return newTodo;
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
