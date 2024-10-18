import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchResultItem } from '../services/api';
import Pagination from './Pagination';

interface SearchResultsProps {
	items: SearchResultItem[];
	currentPage: number;
	onPageChange: (page: number) => void;
	pageSize: number;
	onPageSizeChange: (size: number) => void; // For handling page size changes
}

const SearchResults: React.FC<SearchResultsProps> = ({
	items,
	currentPage,
	onPageChange,
	pageSize,
	onPageSizeChange,
}) => {
	const [paginatedItems, setPaginatedItems] = useState<SearchResultItem[]>([]);

	useEffect(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		setPaginatedItems(items.slice(startIndex, endIndex));
	}, [currentPage, items, pageSize]);

	const totalPages = Math.ceil(items.length / pageSize);

	return (
		<>
			{/* Items per page selector */}
			<div className='flex  justify-end mt-4 mr-14'>
				<div>
					<label
						htmlFor='items-per-page'
						className='mr-2'>
						Items per page:
					</label>
					<select
						id='items-per-page'
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						className='border p-1'>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
					</select>
				</div>
			</div>

			<div className='mt-2 bg-gray-50'>
				{paginatedItems.length > 0 ? (
					paginatedItems.map((item) => (
						<div
							key={item.persistentId || item.id}
							className='p-4 border-b-4 border-[#ffffff]'>
							<h2 className='font-bold text-xl'>
								<Link
									to={`/tools-services/${item.persistentId}`}
									className='text-[#045890] hover:text-blue-950'>
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

							<div>
								<h3 className='font-semibold mt-2'>Contributors:</h3>
								{item.contributors.length > 0 ? (
									<ul>
										{item.contributors.map((contributor, idx) => (
											<li key={idx}>
												{contributor.actor.name}{' '}
												{contributor.role?.label &&
													`- ${contributor.role.label}`}
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
			</div>

			{/* Pagination Component */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</>
	);
};

export default SearchResults;
