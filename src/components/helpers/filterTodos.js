import { useState, useEffect } from 'react';
import styles from '../../App.module.css';

export const FilterTodos = (todos) => {
	const [searchTerm, setSearchTerm] = useState(''); //хранение поискового запроса
	const [searchResults, setSearchResults] = useState('');

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

	return (
		<div className={styles['search-container  ']}>
			<input
				className={styles.input}
				type="text"
				name="text"
				placeholder="Ведите текст для поиска"
				onChange={(event) => setSearchTerm(event.target.value)}
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
	);
};
