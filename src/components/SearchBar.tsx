import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SuggestionsDropdown from './SuggestionsDropdown';

interface SearchBarProps {
	onSearch: (query: string, category: string) => void;
	suggestions: any[];
	onSuggestionSelect: (suggestion: any) => void;
	category: string;
	onCategoryChange: (category: string) => void;
	fetchSuggestions: (query: string) => void;
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
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [inputFocused, setInputFocused] = useState(false);
	const suggestionsRef = useRef<HTMLUListElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate(); // Use useNavigate for navigation

	useEffect(() => {
		if (query && inputFocused) {
			fetchSuggestions(query);
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
	}, [query, inputFocused, fetchSuggestions]);

	const handleSuggestionClick = (suggestion: any) => {
		setQuery(suggestion.label);
		onSuggestionSelect(suggestion); // Trigger search using the suggestion's label
		setShowSuggestions(false);
		navigate(`/search?q=${suggestion.label}&category=${category}`); // Navigate with query and category
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query, category);
		navigate(`/search?q=${query}&category=${category}`); // Navigate to the search URL
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			suggestionsRef.current &&
			!suggestionsRef.current.contains(event.target as Node) &&
			inputRef.current &&
			!inputRef.current.contains(event.target as Node)
		) {
			setShowSuggestions(false);
			setInputFocused(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<form
			onSubmit={handleSearchSubmit}
			className='mb-4 relative'>
			<div className='flex space-x-4'>
				<input
					ref={inputRef}
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className='border p-2 flex-grow'
					placeholder='Search...'
					onFocus={() => setInputFocused(true)}
				/>

				<select
					value={category}
					onChange={(e) => onCategoryChange(e.target.value)}
					className='border p-2'>
					<option value='all'>All categories</option>
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

			{showSuggestions && query && (
				<SuggestionsDropdown
					ref={suggestionsRef}
					suggestions={suggestions}
					onSuggestionSelect={handleSuggestionClick}
				/>
			)}
		</form>
	);
};

export default SearchBar;
