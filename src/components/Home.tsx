import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import { searchItems } from '@/assets/services/api';

const Home: React.FC = () => {
	const [results, setResults] = useState<any[]>([]);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const fetchResults = async () => {
		const response = await searchItems(query, page, pageSize);
		setResults(response.data.items);
	};

	useEffect(() => {
		if (query) {
			fetchResults();
		}
	}, [query, page, pageSize]);

	return (
		<div className='container mx-auto p-4'>
			<SearchBar onSearch={setQuery} />
			<div className='mt-4'>
				<SearchResults results={results} />
			</div>
			<div className='mt-4'>
				<Pagination
					page={page}
					pageSize={pageSize}
					onPageChange={setPage}
					onPageSizeChange={setPageSize}
				/>
			</div>
		</div>
	);
};

export default Home;
