import { useEffect, useState } from 'react';

export const useGetTodos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [loaderTodos, setLoaderTodos] = useState([]);
	const TODOS_URL = 'http://localhost:3005/todos';

	useEffect(() => {
		const fetchLoaderTodos = () => {
			setIsLoading(true);

			fetch(TODOS_URL)
				.then((loadedData) => loadedData.json())
				.then((data) => {
					setLoaderTodos(data);
				})
				.catch((error) => {
					console.log('error', error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};
		fetchLoaderTodos();
	}, []);

	return { isLoading, loaderTodos };
};
