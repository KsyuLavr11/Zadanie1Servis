import { useEffect, useState, useCallback } from 'react';
import './App.css';
import styles from './App.module.css';
import {
	useGetTodos,
	useHandlerPostTodos,
	useHandlerPutTodos,
	useHandlerIsDeleteTodos,
} from './hooks';
import debounce from 'lodash/debounce';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const { isLoading, loaderTodos } = useGetTodos();
	const { isCreating, newTodos, setNewTodos, handlerPostTodos } = useHandlerPostTodos();
	const { isUpdating, handlerPutTodos } = useHandlerPutTodos(setTodos);
	const { isDeletingTodos, handlerIsDeleteTodos } = useHandlerIsDeleteTodos(setTodos);

	useEffect(() => {
		if (loaderTodos) {
			setTodos(loaderTodos);
		}
	}, [loaderTodos]);

	const handleAddTodo = () => {
		handlerPostTodos()
			.then((newTodo) => {
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			})
			.catch((error) => {
				console.log('error', error);
			});
	};

	const handleStartEdit = (todo) => {
		setEditingTodoId(todo.id);
		setEditedTitle(todo.title);
	};

	const handleCancelEdit = () => {
		setEditingTodoId(null);
		setEditedTitle('');
	};

	const handleSaveEdit = (id) => {
		handlerPutTodos(id, editedTitle)
			.then(() => {
				setEditingTodoId(null);
				setEditedTitle('');
			})
			.catch((error) => {
				console.log('error', error);
			});
	};

	const handleSortTodos = () => {
		const sortTodos = [...todos];
		sortTodos.sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
			if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
			return 0;
		});
		setTodos(sortTodos);
	};

	useEffect(() => {
		if (searchTerm) {
			const results = todos.filter((todo) =>
				todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	}, [todos, searchTerm]);

	const handleSearch = (value) => {
		setSearchTerm(value);
	};

	const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

	return (
		<div className={styles.body}>
			<h4>Список дел</h4>
			<div>
				<input
					className={styles.input}
					type="text"
					name="text"
					placeholder="Ведите текст для поиска"
					onChange={(event) => debouncedHandleSearch(event.target.value)}
				/>
				{searchTerm && (
					<div className={styles['search-results']}>
						<h3>Результаты поиска:</h3>
						{searchResults.length > 0 ? (
							searchResults.map(({ id, title }) => (
								<ul className={styles.text} key={id}>
									<li>{title}</li>
								</ul>
							))
						) : (
							<p>Ничего не найдено.</p>
						)}
					</div>
				)}
				<div>
					<button className={styles.button}>Поиск</button>
				</div>
			</div>
			<div>
				<button className={styles['sort-button']} onClick={handleSortTodos}>
					Сортировки дел по алфавиту
				</button>
			</div>
			{!searchTerm && !isLoading && (
				<div>
					{todos.map(({ id, title }) => (
						<ul className={styles.text} key={id}>
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
											disabled={isDeletingTodos}
											onClick={() => handlerIsDeleteTodos(id)}
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
			{isLoading && <div className={styles.loader}>Загрузка...</div>}
			<form onSubmit={(event) => event.preventDefault()}>
				<div>
					<input
						className={styles.input}
						type="text"
						name="text"
						value={newTodos}
						placeholder="Ведите название дела"
						onChange={(event) => setNewTodos(event.target.value)}
					/>
					<button
						disabled={isCreating}
						onClick={handleAddTodo}
						className={styles.button}
					>
						Добавить дело
					</button>
				</div>
			</form>
		</div>
	);
};
