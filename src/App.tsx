// src/App.tsx

import { useState } from 'react';
import FacetedFilter from './components/FacetedFilter';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { fetchItems, SearchResultItem } from './services/api';

const App: React.FC = () => {
	// State declarations remain the same
	const [items, setItems] = useState<SearchResultItem[]>([]);
	const [facets, setFacets] = useState<Record<string, string[]>>({});
	const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
	const [category, setCategory] = useState('__all__');
	const [query, setQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const handleSearch = async (
		searchQuery: string,
		selectedCategory: string,
	) => {
		const filters: Record<string, string> = {};
		if (selectedCategory && selectedCategory !== '__all__') {
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
			setFacets(response.facets);
			setSuggestions([]); // Clear suggestions after search
		} catch (error) {
			console.error('Error fetching items:', error);
		}
	};

	const handleSuggestionSelect = (suggestion: SearchResultItem) => {
		setQuery(suggestion.label);
		handleSearch(suggestion.label, category); // Trigger search with selected suggestion
	};

	const fetchSuggestions = async (query: string) => {
		if (query) {
			try {
				const response = await fetch(
					`https://marketplace-api.sshopencloud.eu/api/item-search?q=${query}&page=1&pageSize=5`,
				);
				if (response.ok) {
					const data = await response.json();
					// Check if data is an array before using map
					if (Array.isArray(data.items)) {
						setSuggestions(data.items); // Update suggestions based on fetched data
					} else {
						console.error('Expected an array, received:', data); // Log unexpected data format
					}
				} else {
					console.error('Error fetching suggestions:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching suggestions:', error);
			}
		} else {
			setSuggestions([]); // Clear suggestions if the input is empty
		}
	};

	// Ensure the useEffect does not cause infinite loops by managing dependencies correctly
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold'>Search Marketplace</h1>

			{/* SearchBar */}
			<SearchBar
				onSearch={handleSearch}
				suggestions={suggestions}
				onSuggestionSelect={handleSuggestionSelect}
				category={category}
				onCategoryChange={setCategory}
				fetchSuggestions={fetchSuggestions} // Pass fetchSuggestions to SearchBar
			/>

			{/* FacetedFilter */}
			<FacetedFilter
				facets={facets}
				onFilterChange={handleSearch}
				query={query}
				category={category}
			/>

			{/* SearchResults */}
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
