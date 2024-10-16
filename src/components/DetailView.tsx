// src/components/DetailView.tsx

import React, { useEffect, useState } from 'react';
import { fetchDetailData } from '../services/api';

interface DetailViewProps {
	id: string | undefined; // ID should be passed from route params
}

const DetailView: React.FC<DetailViewProps> = ({ id }) => {
	const [item, setItem] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError('Invalid ID provided.');
			setLoading(false);
			return;
		}

		const fetchItemDetails = async () => {
			try {
				const result = await fetchDetailData(id);
				setItem(result);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unknown error occurred',
				);
			} finally {
				setLoading(false);
			}
		};

		fetchItemDetails();
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1 className='text-2xl font-bold'>{item.label}</h1>
			<p>{item.description}</p>
			<h3 className='font-semibold mt-2'>Contributors:</h3>
			{item.contributors.length > 0 ? (
				<ul>
					{item.contributors.map((contributor: any, idx: number) => (
						<li key={idx}>
							{contributor.actor.name}{' '}
							{contributor.role?.label && `- ${contributor.role.label}`}
						</li>
					))}
				</ul>
			) : (
				<p>No contributors available.</p>
			)}
			<h3 className='font-semibold mt-2'>Accessible At:</h3>
			{item.accessibleAt.length > 0 ? (
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
		</div>
	);
};

export default DetailView;
