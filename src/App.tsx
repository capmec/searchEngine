// src/App.tsx

import React, { useEffect, useState } from 'react';
import { fetchItems, SearchResponse } from './services/api';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Pagination from './components/Pagination';

const App: React.FC = () => {
	const [items, setItems] = useState<SearchResponse['items']>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [query, setQuery] = useState('');
	const pageSize = 10; // Set your desired page size

	const handleSearch = async (searchQuery: string) => {
		setQuery(searchQuery);
		setCurrentPage(1); // Reset to first page on new search
	};

	const fetchData = async () => {
		if (!query) return; // Don't fetch if there's no query
		try {
			const response = await fetchItems(query, currentPage, pageSize);
			setItems(response.items);
			setTotalPages(Math.ceil(response.count / pageSize)); // Calculate total pages
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [query, currentPage]);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold'>Search Marketplace</h1>
			<SearchBar onSearch={handleSearch} />
			<SearchResults items={items} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};

export default App;
