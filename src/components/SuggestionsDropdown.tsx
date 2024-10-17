// src/components/SuggestionsDropdown.tsx

import React, { forwardRef } from 'react';
import { SearchResultItem } from '../services/api'; // Ensure you import the right type

interface SuggestionsDropdownProps {
	suggestions: SearchResultItem[];
	onSuggestionSelect: (suggestion: SearchResultItem) => void;
}

// Use forwardRef to accept a ref
const SuggestionsDropdown = forwardRef<
	HTMLUListElement,
	SuggestionsDropdownProps
>(({ suggestions, onSuggestionSelect }, ref) => {
	return (
		<ul
			ref={ref} // Attach ref here
			className='absolute z-10 bg-white border shadow-md mt-1 w-full max-h-60 overflow-y-auto'>
			{suggestions.length > 0 ? (
				suggestions.map((item) => (
					<li
						key={item.id} // Ensure each item has a unique key
						onClick={() => onSuggestionSelect(item)} // Use item object for selection
						className='p-2 hover:bg-gray-200 cursor-pointer'>
						{item.label} {/* Display the suggestion label */}
					</li>
				))
			) : (
				<li className='p-2'>No suggestions available</li>
			)}
		</ul>
	);
});

export default SuggestionsDropdown;
