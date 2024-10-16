// src/components/ItemDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [itemDetail, setItemDetail] = useState<any>(null); // Define your types appropriately
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchItemDetail = async () => {
			try {
				const response = await fetch(
					`https://marketplace-api.sshopencloud.eu/api/tools-services/${id}`,
				);
				const data = await response.json();
				setItemDetail(data);
			} catch (error) {
				console.error('Error fetching item detail:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchItemDetail();
	}, [id]);

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h2>{itemDetail.label}</h2>
			<p>{itemDetail.description}</p>
			{/* Add more details as required */}
		</div>
	);
};

export default ItemDetail;
