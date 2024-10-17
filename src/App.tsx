import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { fetchItems, SearchResultItem } from './services/api';

const App: React.FC = () => {
	const [items, setItems] = useState<SearchResultItem[]>([]);
	const [category, setCategory] = useState('__all__');
	const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	// Function to fetch items based on query and category
	const handleSearch = async (
		searchQuery: string,
		selectedCategory: string,
	) => {
		const filters: Record<string, string> = {};
		if (selectedCategory !== '__all__') {
			filters.categories = selectedCategory;
		}

		try {
			const response = await fetchItems(
				searchQuery,
				currentPage,
				pageSize,
				filters,
			);
			setItems(response.items);
		} catch (error) {
			console.error('Error fetching items:', error);
		}
	};

	const fetchSuggestions = async (input: string) => {
		try {
			const response = await fetchItems(input, 1, 5, {});
			setSuggestions(response.items);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	};

	const handleSuggestionSelect = (suggestion: SearchResultItem) => {
		handleSearch(suggestion.label, category); // Search with the selected suggestion
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold'>Search Marketplace</h1>

			<SearchBar
				onSearch={handleSearch}
				suggestions={suggestions}
				onSuggestionSelect={handleSuggestionSelect}
				category={category}
				onCategoryChange={setCategory}
				fetchSuggestions={fetchSuggestions}
			/>

			<SearchResults
				items={items}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				pageSize={pageSize}
			/>
		</div>
	);
};

export default App;
