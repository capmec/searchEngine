import React, { useEffect, useState, useRef } from 'react';
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
	const [query, setQuery] = useState(''); // To store the text input
	const [showSuggestions, setShowSuggestions] = useState(false); // To control visibility of suggestions
	const [inputFocused, setInputFocused] = useState(false); // To track input focus state
	const suggestionsRef = useRef<HTMLUListElement | null>(null); // Ref for suggestions dropdown
	const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input field

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query, category); // Perform search with the current query and category
		setShowSuggestions(false); // Close suggestions on search submit
	};

	useEffect(() => {
		if (query && inputFocused) {
			fetchSuggestions(query); // Fetch suggestions when typing
			setShowSuggestions(true); // Show suggestions dropdown
		} else {
			setShowSuggestions(false); // Hide suggestions dropdown if query is empty or input is not focused
		}
	}, [query, inputFocused, fetchSuggestions]);

	const handleSuggestionClick = (suggestion: any) => {
		// Update the input with the selected suggestion label
		setQuery(suggestion.label);

		// Perform the search with the selected suggestion
		onSearch(suggestion.label, category); // You can also use suggestion.persistentId if needed

		setShowSuggestions(false); // Close suggestions after selecting one
	};

	// Handle clicks outside of the dropdown to close it
	const handleClickOutside = (event: MouseEvent) => {
		if (
			suggestionsRef.current &&
			!suggestionsRef.current.contains(event.target as Node) &&
			inputRef.current &&
			!inputRef.current.contains(event.target as Node)
		) {
			setShowSuggestions(false); // Close suggestions if clicked outside both input and suggestions
			setInputFocused(false); // Mark input as no longer focused
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleInputFocus = () => {
		setInputFocused(true); // Mark input as focused
		if (suggestions.length > 0 && query) {
			setShowSuggestions(true); // Only show suggestions if there is input and suggestions
		}
	};

	const handleInputBlur = () => {
		setInputFocused(false); // Mark input as no longer focused
	};

	return (
		<form
			onSubmit={handleSearchSubmit}
			className='mb-4 relative'>
			<div className='flex space-x-4'>
				<input
					ref={inputRef} // Attach ref to input field
					type='text'
					value={query} // Bind input value to query state
					onChange={(e) => setQuery(e.target.value)} // Update query state on input change
					className='border p-2 flex-grow'
					placeholder='Search...'
					onFocus={handleInputFocus} // Open suggestions on focus
					onBlur={handleInputBlur} // Handle input blur
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
			{showSuggestions && query && (
				<SuggestionsDropdown
					ref={suggestionsRef} // Attach ref to SuggestionsDropdown
					suggestions={suggestions}
					onSuggestionSelect={handleSuggestionClick} // Pass the suggestion click handler
				/>
			)}
		</form>
	);
};

export default SearchBar;
