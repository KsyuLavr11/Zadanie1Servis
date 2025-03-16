export const sortTodos = (todos, isSorted) => {
	if (isSorted) {
		return [...todos.toSorted((a, b) => a.title.localeCompare(b.title))];
	}
	return todos;
};
