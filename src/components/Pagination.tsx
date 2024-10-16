import React from 'react';
import { Button } from './ui/button';

interface PaginationProps {
	page: number;
	pageSize: number;
	onPageChange: (newPage: number) => void;
	onPageSizeChange: (newPageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	page,
	pageSize,
	onPageChange,
	onPageSizeChange,
}) => {
	return (
		<div className='flex items-center space-x-4'>
			<Button
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
				className='bg-blue-500 text-white'>
				Previous
			</Button>
			<span>
				Page {page} of {pageSize}
			</span>
			<Button
				onClick={() => onPageChange(page + 1)}
				disabled={page === pageSize}
				className='bg-blue-500 text-white'>
				Next
			</Button>

			<select
				value={pageSize}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
				className='border border-gray-300 rounded-md'>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
			</select>
		</div>
	);
};

export default Pagination;
