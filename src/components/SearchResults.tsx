import React from 'react';

interface SearchResultsProps {
	items: any[]; // Adjust type based on API response
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
	return (
		<div>
			{/* Display search results */}
			{items.length > 0 ? (
				items.map((item) => (
					<div
						key={item.id}
						className='border-b p-4'>
						<h2 className='font-bold text-xl'>{item.label}</h2>
						<p>{item.description}</p>
						{/* Add more details as needed */}
					</div>
				))
			) : (
				<p>No results found.</p>
			)}

			{/* Pagination */}
			<div className='flex justify-center space-x-2 mt-4'>
				{/* Previous Page */}
				{currentPage > 1 && (
					<button
						onClick={() => onPageChange(currentPage - 1)}
						className='p-2 bg-gray-300'>
						Previous
					</button>
				)}

				{/* Next Page */}
				{items.length === pageSize && (
					<button
						onClick={() => onPageChange(currentPage + 1)}
						className='p-2 bg-gray-300'>
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchResults;
