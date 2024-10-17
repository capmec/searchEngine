// src/services/api.ts

export interface SearchResultItem {
	id: string;
	persistentId: string; // Ensure this is part of the interface
	label: string;
	accessibleAt: string[];
	contributors: {
		actor: {
			name: string;
		};
		role?: {
			label: string;
		};
	}[];
}

export interface SearchResponse {
	items: SearchResultItem[];
	count: number;
}

export const fetchItems = async (
	query: string,
	page: number,
	pageSize: number,
): Promise<SearchResponse> => {
	const response = await fetch(
		`https://marketplace-api.sshopencloud.eu/api/item-search?q=${query}&page=${page}&pageSize=${pageSize}&categories=tool-or-service`,
	);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const data = await response.json();
	return {
		items: data.items.map((item: any) => ({
			id: item.id, // Keep id if needed
			persistentId: item.persistentId, // Make sure persistentId is part of the mapped data
			label: item.label,
			accessibleAt: item.accessibleAt,
			contributors: item.contributors.map((contributor: any) => ({
				actor: {
					id: contributor.actor.id,
					name: contributor.actor.name,
				},
				role: contributor.role,
			})),
		})),
		count: data.count,
	};
};

// src/services/api.ts

export const fetchDetailData = async (persistentId: string): Promise<any> => {
	try {
		const response = await fetch(
			`https://marketplace-api.sshopencloud.eu/api/tools-services/${persistentId}`,
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		const item = await response.json(); // Parse the response as JSON

		if (!item) {
			throw new Error('Item not found');
		}

		return item; // Return the fetched item
	} catch (error) {
		console.error('Error fetching detail data:', error);
		throw new Error('Failed to fetch detail data');
	}
};
