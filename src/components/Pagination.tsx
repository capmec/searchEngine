import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'; // Adjust the import based on your file structure

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<Pagination className='cursor-pointer'>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious
						onClick={() => {
							if (currentPage > 1) {
								onPageChange(currentPage - 1);
							}
						}}
					/>
				</PaginationItem>

				{/* Page Numbers */}
				{Array.from({ length: totalPages }).map((_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							onClick={() => onPageChange(index + 1)}
							isActive={currentPage === index + 1} // Highlight active page
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext
						onClick={() => {
							if (currentPage < totalPages) {
								onPageChange(currentPage + 1);
							}
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default CustomPagination;
