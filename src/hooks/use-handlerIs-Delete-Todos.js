import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../Firebase';

export const useHandlerIsDeleteTodos = (setTodos) => {
	const [isDeletingTodos, setIsDeletingTodos] = useState(false);

	const handlerIsDeleteTodos = (todoId) => {
		setIsDeletingTodos(true);

		const deleteDbRef = ref(db, `todos/${todoId}`);

		remove(deleteDbRef)
			.then(() => {
				setTodos((prevTodos) => {
					const newTodos = Object.fromEntries(
						Object.entries(prevTodos).filter(([key]) => key !== todoId),
					);
					return newTodos;
				});
				console.log('Удалено дело, ответ сервера');
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
