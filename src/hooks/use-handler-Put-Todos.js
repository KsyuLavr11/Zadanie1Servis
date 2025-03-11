import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../Firebase';

export const useHandlerPutTodos = (setTodos) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const handlerPutTodos = (id, newTitle) => {
		setIsUpdating(true);

		const newTitleDbRef = ref(db, `todos/${id}`);

		return update(newTitleDbRef, {
			title: newTitle,
		})
			.then(() => {
				setTodos((prevTodos) => {
					const newTodos = { ...prevTodos };
					newTodos[id] = { ...newTodos[id], title: newTitle };
					return newTodos;
				});
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
