import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchDetailData } from '../services/api';

const DetailView: React.FC = () => {
	const { persistentId } = useParams<{ persistentId: string }>();
	const [item, setItem] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate(); // Initialize navigate

	useEffect(() => {
		const fetchItemDetails = async () => {
			if (persistentId) {
				try {
					const fetchedItem = await fetchDetailData(persistentId);
					console.log('DetailView Fetched Item:', fetchedItem);
					setItem(fetchedItem);
					setLoading(false);
				} catch (err) {
					setError('Failed to fetch item details');
					setLoading(false);
				}
			} else {
				setError('No item persistentId found');
				setLoading(false);
			}
		};

		fetchItemDetails();
	}, [persistentId]);

	// Function to handle going back to the search results
	const handleBackToSearch = () => {
		navigate(-1); // Navigate to the previous page
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!item) return <div>No item found</div>;

	return (
		<div className='mt-4 p-4 border-b'>
			<h1 className='font-bold text-xl mb-7'>{item.label}</h1>

			<div className='flex space-x-3 mb-7 '>
				<p className='bg-gray-200 p-2  '>
					{item.description || 'No description available.'}
				</p>
			</div>
			<div className='flex space-x-3'>
				<h3 className='font-semibold'>Last Info Update: </h3>
				<p>
					{item.lastInfoUpdate
						? new Date(item.lastInfoUpdate).toLocaleDateString()
						: 'N/A'}
				</p>
			</div>

			<h3 className='font-semibold mt-2'>Contributors:</h3>
			<p>
				{item.contributors && item.contributors.length > 0 ? (
					<ul>
						{item.contributors.map((contributor: any, idx: number) => (
							<li key={idx}>
								{contributor.actor?.name || 'Unknown contributor'}{' '}
								{contributor.role?.label && `- ${contributor.role.label}`}
							</li>
						))}
					</ul>
				) : (
					<p>No contributors available.</p>
				)}
			</p>

			{/* Back to search button */}
			<div className='flex justify-end'>
				<button
					onClick={handleBackToSearch}
					className='mt-4 border border-black text-black px-3 py-1 rounded hover:bg-gray-200 transition duration-200 text-sm'>
					Back to Search Results
				</button>
			</div>
		</div>
	);
};

export default DetailView;
