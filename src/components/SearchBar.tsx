// src/components/SearchBar.tsx

import { useState } from 'react';
import { fetchAutocomplete } from '@/services/api';

// Define the props interface for the SearchBar component
interface SearchBarProps {
	onSearch: (query: string) => void; // Type for onSearch function
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
		if (value) {
			try {
				const fetchedSuggestions = await fetchAutocomplete(value);
				setSuggestions(fetchedSuggestions);
			} catch (error) {
				console.error('Error fetching autocomplete suggestions:', error);
				setSuggestions([]);
			}
		} else {
			setSuggestions([]);
		}
	};

	const handleSearch = () => {
		onSearch(query);
		setSuggestions([]); // Clear suggestions after search
	};

	return (
		<div>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder='Search...'
				className='border p-2 w-full'
			/>
			{suggestions.length > 0 && (
				<ul className='border mt-2'>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => {
								setQuery(suggestion);
								setSuggestions([]); // Clear suggestions when a suggestion is clicked
							}}
							className='cursor-pointer p-2 hover:bg-gray-200'>
							{suggestion}
						</li>
					))}
				</ul>
			)}
			<button
				onClick={handleSearch}
				className='bg-blue-500 text-white p-2 mt-2'>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
