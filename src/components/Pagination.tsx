// src/components/Pagination.tsx

import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<div className='flex justify-center mt-4'>
			{Array.from({ length: totalPages }).map((_, index) => (
				<button
					key={index}
					onClick={() => onPageChange(index + 1)}
					className={`px-3 py-1 border ${
						currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-black'
					}`}>
					{index + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;
