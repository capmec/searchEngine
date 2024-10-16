// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		onSearch(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-4'>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Search...'
				className='border p-2 w-full'
			/>
			<button
				type='submit'
				className='mt-2 p-2 bg-blue-500 text-white'>
				Search
			</button>
		</form>
	);
};

export default SearchBar;
