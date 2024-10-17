// src/components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
	onSearch: (query: string, category: string) => void;
	suggestions: string[];
	onSuggestionSelect: (suggestion: string) => void;
	category: string;
	onCategoryChange: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	suggestions,
	onSuggestionSelect,
	category,
	onCategoryChange,
}) => {
	const [query, setQuery] = React.useState('');

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query, category);
	};

	return (
		<form
			onSubmit={handleSearchSubmit}
			className='mb-4'>
			<div className='flex space-x-4'>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className='border p-2 flex-grow'
					placeholder='Search...'
				/>

				<select
					value={category}
					onChange={(e) => onCategoryChange(e.target.value)}
					className='border p-2'>
					<option value='__all__'>All categories</option>
					<option value='tool-or-service'>Tools & services</option>
					<option value='training-material'>Training materials</option>
					<option value='publication'>Publications</option>
					<option value='dataset'>Datasets</option>
					<option value='workflow'>Workflows</option>
				</select>

				<button
					type='submit'
					className='bg-blue-500 text-white p-2'>
					Search
				</button>
			</div>

			{/* Suggestions Dropdown */}
			{suggestions.length > 0 && (
				<ul className='absolute z-10 bg-white border shadow-md'>
					{suggestions.map((suggestion) => (
						<li
							key={suggestion}
							onClick={() => onSuggestionSelect(suggestion)}
							className='p-2 hover:bg-gray-200 cursor-pointer'>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</form>
	);
};

export default SearchBar;
