export const filterTodos = (todos, searchValue) => {
	return todos.filter((todo) =>
		todo.title.toLlowerCase().includes(searchValue.toLlowerCase()),
	);
};
