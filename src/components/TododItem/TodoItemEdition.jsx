import { useState } from 'react';
import styles from '../../App.module.css';

export const TodoItemEdition = ({
	updateTodo,
	deleteTodo,
	setTodos,
	isLoading,
	todos,
	isDeletingTodo,
	handlerIsDeleteTodo,
}) => {
	const { isUpdating, setIsUpdating } = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null); //ID редактируемого дела
	const [editedTitle, setEditedTitle] = useState(''); //отредактированный заголовок дела

	const handleCancelEdit = () => {
		setEditingTodoId(null);
		setEditedTitle('');
	};

	const handleSaveEdit = (id) => {
		updateTodo(id, editedTitle)
			.then(() => {
				setEditingTodoId(null);
			})
			.catch((error) => {
				console.log('error', error);
			})
			.finally(() => {
				setEditedTitle('');
			});
	};

	const handleStartEdit = (todo) => {
		setEditingTodoId(todo.id);
		setEditedTitle(todo.title);
	};

	const handlerIsDeleteClick = () => {
		handlerIsDeleteTodo(todos.id);
	};

	return (
		<>
			{!isLoading && (
				<div>
					{todos.map(({ id, title }) => (
						<ul className={styles['todo-list']} key={id}>
							<li>
								{editingTodoId === id ? (
									<>
										<input
											className={styles.input}
											type="text"
											value={editedTitle}
											onChange={(e) =>
												setEditedTitle(e.target.value)
											}
										/>
										<button
											className={styles['button-todos-cancel']}
											onClick={handleCancelEdit}
										>
											Отменить
										</button>

										<button
											className={styles['button-todos-save']}
											disabled={isUpdating}
											onClick={() => handleSaveEdit(id)}
										>
											Сохранить
										</button>
									</>
								) : (
									<>
										{title}

										<button
											disabled={isDeletingTodo}
											onClick={handlerIsDeleteClick}
											className={styles['button-todos-delete']}
										>
											Удалить дело
										</button>

										<button
											disabled={isUpdating}
											onClick={() => handleStartEdit({ id, title })}
											className={styles['button-todos']}
										>
											Изменить дело
										</button>
									</>
								)}
							</li>
						</ul>
					))}
				</div>
			)}
		</>
	);
};
