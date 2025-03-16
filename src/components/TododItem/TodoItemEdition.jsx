import { useState } from 'react';
import styles from '../../App.module.css';

export const TodoItemEdition = ({ updateTodo, todo, handlerIsDeleteTodo }) => {
	const [isEditing, seIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(todo.title);

	const handleStartEdit = () => {
		seIsEditing(true);
	};

	const handleCancelEdit = () => {
		seIsEditing(false);
		setEditTitle(todo.title);
	};

	const handleSaveEdit = () => {
		updateTodo(todo.id, editTitle);
		setEditTitle(false);
	};

	const handleDelete = () => {
		handlerIsDeleteTodo(todo.id);
	};

	return (
		<li>
			{isEditing ? (
				<>
					<input
						className={styles.input}
						type="text"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
					<button
						className={styles['button-todos-cancel']}
						onClick={handleCancelEdit}
					>
						Отменить
					</button>

					<button
						className={styles['button-todos-save']}
						onClick={() => handleSaveEdit(todo.id)}
					>
						Сохранить
					</button>
				</>
			) : (
				<>
					<button
						onClick={handleDelete}
						className={styles['button-todos-delete']}
					>
						Удалить дело
					</button>

					<button onClick={handleStartEdit} className={styles['button-todos']}>
						Изменить дело
					</button>
				</>
			)}
		</li>
	);
};
