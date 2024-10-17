import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetailData } from '../services/api';

const DetailView: React.FC = () => {
	const { persistentId } = useParams<{ persistentId: string }>();
	const [item, setItem] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItemDetails = async () => {
			if (persistentId) {
				try {
					const fetchedItem = await fetchDetailData(persistentId);
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

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!item) return <div>No item found</div>;

	return (
		<div className='mt-4 p-4 border-b'>
			<h1 className='font-bold text-xl'>{item.label}</h1>
			<div>Category: {item.category || 'N/A'}</div>
			<div>
				Last Info Update:{' '}
				{item.lastInfoUpdate
					? new Date(item.lastInfoUpdate).toLocaleDateString()
					: 'N/A'}
			</div>
			<div>Description: {item.description || 'No description available.'}</div>
			<h3 className='font-semibold mt-2'>Contributors:</h3>
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
		</div>
	);
};

export default DetailView;
