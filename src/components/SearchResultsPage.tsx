// src/pages/SearchResultsPage.tsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchItems } from '../services/api'; // Adjust the import as necessary
import SearchResults from '../components/SearchResults';
import SearchBar from '../components/SearchBar';

const SearchResultsPage: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const initialQuery = queryParams.get('q') || '';
	const initialCategory = queryParams.get('category') || 'all'; // Set a default category
	const [query, setQuery] = useState(initialQuery);
	const [category, setCategory] = useState(initialCategory);
	const [items, setItems] = useState<any[]>([]); // Adjust type based on your SearchResultItem
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [, setTotalItems] = useState(0);

	const fetchData = async () => {
		if (query) {
			const filters = { categories: category }; // Apply category as a filter
			try {
				const response = await fetchItems(query, 1, pageSize, filters);
				setItems(response.items);
				setTotalItems(response.count);
			} catch (error) {
				console.error('Error fetching items:', error);
			}
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const q = params.get('q');
		const cat = params.get('category') || 'all';

		if (q) {
			setQuery(q);
		}
		setCategory(cat);
	}, [location.search]);

	useEffect(() => {
		const fetchData = async () => {
			if (query) {
				const filters = { categories: category }; // Apply category as a filter
				const response = await fetchItems(query, 1, pageSize, filters);
				setItems(response.items);
				setTotalItems(response.count);
			}
		};

		fetchData();
	}, [query, category, currentPage, pageSize]);

	const handleCategoryChange = async (newCategory: string) => {
		setCategory(newCategory);
		await fetchData();
		navigate(`?q=${encodeURIComponent(query)}&category=${newCategory}`);
		setCurrentPage(1);
	};

	// Handle page size change
	const handlePageSizeChange = (size: number) => {
		setPageSize(size);
		setCurrentPage(1); // Reset to page 1 when page size changes
	};

	const handleSearch = (searchQuery: string, selectedCategory: string) => {
		setQuery(searchQuery); // Set the query from the search bar
		setCategory(selectedCategory); // Set the category from the search bar
		setCurrentPage(1); // Reset to the first page
	};

	return (
		<div>
			<SearchBar
				onSearch={handleSearch}
				suggestions={[]} // Pass the suggestions array
				onSuggestionSelect={(suggestion) => setQuery(suggestion.label)}
				category={category}
				onCategoryChange={handleCategoryChange}
				fetchSuggestions={() => {}} // Implement fetchSuggestions if needed
			/>

			<h1 className=' m-7  flex justify-center text-2xl text-blue-500'>
				Search Results for: "{query}"
			</h1>

			<SearchResults
				items={items}
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				pageSize={pageSize}
				onPageSizeChange={handlePageSizeChange}
			/>
		</div>
	);
};

export default SearchResultsPage;
