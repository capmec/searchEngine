import React from 'react';

interface FacetedFilterProps {
	facets: Record<string, string[]>; // Ensure facets is a record of string arrays
	onFilterChange: (
		query: string,
		category: string,
		filters: Record<string, string>,
	) => void;
	query: string;
	category: string;
}

const FacetedFilter: React.FC<FacetedFilterProps> = ({
	facets,
	onFilterChange,
	query,
	category,
}) => {
	// Handle filter change
	const handleFilterChange = (facetKey: string, value: string) => {
		const filters = { [facetKey]: value }; // Create filter object
		onFilterChange(query, category, filters); // Call the search function with filters
	};

	return (
		<div className='my-4'>
			{Object.entries(facets).map(([facetKey, values]) => (
				<div
					key={facetKey}
					className='mb-4'>
					<h3 className='font-bold'>{facetKey}</h3>
					{/* Check if values is an array before mapping */}
					{Array.isArray(values) ? (
						values.map((value) => (
							<label
								key={value}
								className='block'>
								<input
									type='checkbox'
									onChange={() => handleFilterChange(facetKey, value)}
								/>
								{value}
							</label>
						))
					) : (
						<p>No available options</p>
					)}
				</div>
			))}
		</div>
	);
};

export default FacetedFilter;
