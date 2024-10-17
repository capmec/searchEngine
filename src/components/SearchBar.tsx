// src/components/SearchBar.tsx

import React, { useEffect, useState } from 'react';
import SuggestionsDropdown from './SuggestionsDropdown';

interface SearchBarProps {
	onSearch: (query: string, category: string) => void;
	suggestions: any[]; // Adjust this based on the expected type of suggestions
	onSuggestionSelect: (suggestion: any) => void; // Adjust based on expected type
	category: string;
	onCategoryChange: (category: string) => void;
	fetchSuggestions: (query: string) => void; // Prop for fetching suggestions
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	suggestions,
	onSuggestionSelect,
	category,
	onCategoryChange,
	fetchSuggestions,
}) => {
	const [query, setQuery] = useState('');

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query, category);
	};

	// Fetch suggestions whenever the query changes
	useEffect(() => {
		if (query) {
			fetchSuggestions(query); // Fetch suggestions based on the current query
		} else {
			// Clear suggestions if input is empty
			// It's important to handle clearing suggestions if needed
		}
	}, [query, fetchSuggestions]); // Depend only on query

	return (
		<form
			onSubmit={handleSearchSubmit}
			className='mb-4 relative'>
			<div className='flex space-x-4'>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)} // Update local query state
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
			{query && (
				<SuggestionsDropdown
					suggestions={suggestions}
					onSuggestionSelect={onSuggestionSelect} // Handle suggestion selection
				/>
			)}
		</form>
	);
};

export default SearchBar;
