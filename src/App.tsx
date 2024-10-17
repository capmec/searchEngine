import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import FacetedFilter from './components/FacetedFilter';
import { fetchItems, SearchResponse, SearchResultItem } from './services/api';

const App: React.FC = () => {
	const [items, setItems] = useState<SearchResultItem[]>([]);
	const [facets, setFacets] = useState<Record<string, string[]>>({});
	const [suggestions, setSuggestions] = useState<string[]>([]); // State for suggestions
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
		} catch (error) {
			console.error('Error fetching items:', error);
		}
	};

	const handleSuggestionSelect = (suggestion: string) => {
		setQuery(suggestion);
		handleSearch(suggestion, category); // Trigger search with selected suggestion
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold'>Search Marketplace</h1>

			{/* SearchBar */}
			<SearchBar
				onSearch={handleSearch}
				suggestions={suggestions} // Pass suggestions to SearchBar
				onSuggestionSelect={handleSuggestionSelect} // Handle suggestion selection
				category={category}
				onCategoryChange={setCategory}
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
