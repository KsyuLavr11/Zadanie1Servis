export const sortTodos = (todos) => {
	return todos.toSorted((a, b) => a.title.localeCompare(b.title));
};
