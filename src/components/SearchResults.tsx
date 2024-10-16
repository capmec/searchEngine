import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
	results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
			{results.map((result) => (
				<Card
					key={result.id}
					className='bg-gray-100'>
					<CardHeader>
						<h3 className='text-lg font-semibold'>{result.label}</h3>
					</CardHeader>
					<CardContent>
						<p className='text-sm'>Accessible at: {result.accessibleAt}</p>
						<p className='text-sm'>
							Contributors: {result.contributors.join(', ')}
						</p>
						<Link
							to={`/detail/${result.id}`}
							className='text-blue-500 underline'>
							View Details
						</Link>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default SearchResults;
