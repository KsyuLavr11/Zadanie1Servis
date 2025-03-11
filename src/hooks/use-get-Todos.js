import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../Firebase';

export const useGetTodos = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loaderTodos, setLoaderTodos] = useState({});

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loaderDbTodos = snapshot.val() || {};

			setLoaderTodos(loaderDbTodos);
			setIsLoading(false);
		});
	}, []);

	return { isLoading, loaderTodos };
};
