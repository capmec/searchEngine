import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { fetchItems, SearchResultItem } from './services/api'; // Import SearchResultItem from your API

const App: React.FC = () => {
	const [items, setItems] = useState<SearchResultItem[]>([]); // Explicitly set the type
	const [, setFacets] = useState({});
	const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]); // Also set the correct type for suggestions
	const [category, setCategory] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [searchParams] = useSearchParams();

	// Fetch items when URL parameters (query or category) change
	useEffect(() => {
		const searchQuery = searchParams.get('q') || '';
		const selectedCategory = searchParams.get('category') || 'all';
		if (searchQuery) {
			handleSearch(searchQuery, selectedCategory);
		}
	}, [searchParams]);

	const handleSearch = async (
		searchQuery: string,
		selectedCategory: string,
	) => {
		try {
			const filters: Record<string, string> = {};
			if (selectedCategory && selectedCategory !== 'all') {
				filters.categories = selectedCategory;
			}

			const response = await fetchItems(
				searchQuery,
				currentPage,
				pageSize,
				filters,
			);
			setItems(response.items); // No more error here
			setFacets(response.facets);
		} catch (error) {
			console.error('Error fetching items:', error);
		}
	};

	const fetchSuggestions = async (searchQuery: string) => {
		try {
			const response = await fetchItems(searchQuery, 1, 5, {});
			setSuggestions(response.items);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	};

	const handleSuggestionSelect = (suggestion: any) => {
		handleSearch(suggestion.label, category);
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
				onPageSizeChange={setPageSize}
			/>
		</div>
	);
};

export default App;
