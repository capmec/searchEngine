import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchResultItem } from '../services/api';
import Pagination from './Pagination';

interface SearchResultsProps {
	items: SearchResultItem[];
	currentPage: number;
	onPageChange: (page: number) => void;
	pageSize: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	items,
	currentPage,
	onPageChange,
	pageSize,
}) => {
	const [paginatedItems, setPaginatedItems] = useState<SearchResultItem[]>([]);

	useEffect(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		setPaginatedItems(items.slice(startIndex, endIndex));
	}, [currentPage, items, pageSize]);

	const totalPages = Math.ceil(items.length / pageSize);

	return (
		<div className='mt-4'>
			{paginatedItems.length > 0 ? (
				paginatedItems.map((item) => (
					<div
						key={item.persistentId || item.id}
						className='p-4 border-b'>
						<h2 className='font-bold text-xl'>
							<Link
								to={`/tools-services/${item.persistentId}`}
								className='text-blue-600'>
								{item.label}
							</Link>
						</h2>

						{/* Accessible Link */}
						{item.accessibleAt && item.accessibleAt.length > 0 ? (
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

						{/* Contributors */}
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

			{/* Pagination Component */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default SearchResults;
