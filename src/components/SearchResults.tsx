// src/components/SearchResults.tsx

import React, { useState, useEffect } from 'react';
import { SearchResultItem } from '../services/api';
import Pagination from './Pagination';

interface SearchResultsProps {
	items: SearchResultItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
	const [paginatedItems, setPaginatedItems] = useState<SearchResultItem[]>([]);

	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		setPaginatedItems(items.slice(startIndex, endIndex));
	}, [currentPage, items, itemsPerPage]);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1); // Reset to first page when changing items per page
	};

	return (
		<div className='mt-4'>
			{paginatedItems.length > 0 ? (
				paginatedItems.map((item) => (
					<div
						key={item.id}
						className='p-4 border-b'>
						<h2 className='font-bold text-xl'>{item.label}</h2>
						{/* Check if accessibleAt is defined and has at least one item */}
						{item.accessibleAt &&
						Array.isArray(item.accessibleAt) &&
						item.accessibleAt.length > 0 ? (
							<a
								href={item.accessibleAt[0]}
								className='text-blue-600'
								target='_blank'
								rel='noopener noreferrer'>
								Access here
							</a>
						) : (
							<p>No accessible link available.</p>
						)}
						<div>
							<h3 className='font-semibold mt-2'>Contributors:</h3>
							{item.contributors.length > 0 ? (
								<ul>
									{item.contributors.map((contributor, idx) => (
										<li key={idx}>
											{contributor.actor.name}{' '}
											{contributor.role?.label && `- ${contributor.role.label}`}
										</li>
									))}
								</ul>
							) : (
								<p>No contributors available.</p>
							)}
						</div>
					</div>
				))
			) : (
				<p>No results found.</p>
			)}

			{/* Items per page selector */}
			<div className='flex items-center justify-between mt-4'>
				<div>
					<label
						htmlFor='items-per-page'
						className='mr-2'>
						Items per page:
					</label>
					<select
						id='items-per-page'
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className='border p-1'>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
					</select>
				</div>
			</div>

			{/* Pagination Component */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default SearchResults;
