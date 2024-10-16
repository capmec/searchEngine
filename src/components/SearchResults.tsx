// src/components/SearchResults.tsx

import React from 'react';
import { SearchResultItem } from '../services/api';

interface SearchResultsProps {
	items: SearchResultItem[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
	return (
		<div className='mt-4'>
			{items.length > 0 ? (
				items.map((item) => (
					<div
						key={item.id}
						className='p-4 border-b'>
						<h2 className='font-bold text-xl'>{item.label}</h2>
						<a
							href={item.accessibleAt[0]}
							className='text-blue-600'
							target='_blank'
							rel='noopener noreferrer'>
							Access here
						</a>
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
		</div>
	);
};

export default SearchResults;
