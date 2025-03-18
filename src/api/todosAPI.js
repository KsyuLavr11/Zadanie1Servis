import config from '../config.json';

const BASE_URL = config.BASE_URL;
const TODOS_ENDPOINT = 'todos/';

export const todosAPI = {
	readALL: async () => {
		const response = await fetch(BASE_URL + TODOS_ENDPOINT);
		if (!response.ok) {
			throw new Error('Ошибка при выполнении запроса');
		}
		return await response.json();
	},
	create: async (newTodos) => {
		const response = await fetch(BASE_URL + TODOS_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newTodos }),
		});
		if (!response.ok) {
			throw new Error('Ошибка при добавлении задачи');
		}
		return await response.json();
	},
	update: async (id, newTitle) => {
		const response = await fetch(BASE_URL + TODOS_ENDPOINT + `${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTitle,
			}),
		});
		if (!response.ok) {
			throw new Error('Ошибка при изменении задачи');
		}
		return await response.json();
	},
	delete: async (id) => {
		const response = await fetch(BASE_URL + TODOS_ENDPOINT + `${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('Ошибка при удалении задачи');
		}
		return;
	},
};
