// src/services/api.ts

export interface Actor {
	id: number;
	name: string;
}

export interface Contributor {
	actor: Actor;
	role?: {
		code: string;
		label: string;
	};
}

export interface SearchResultItem {
	id: number;
	label: string;
	accessibleAt?: string[];
	contributors: Contributor[];
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
			id: item.id,
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

export const fetchDetailData = async (id: string): Promise<any> => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/item-search?id=${id}`,
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		// Check if the data contains an 'items' array and find the item by id
		if (!data.items || !Array.isArray(data.items)) {
			throw new Error('Items not found in response');
		}

		const item = data.items.find(
			(item: { id: number }) => item.id === Number(id),
		);
		if (!item) {
			throw new Error('Item not found');
		}

		return item;
	} catch (error) {
		console.error('Error fetching detail data:', error);
		throw new Error('Failed to fetch detail data');
	}
};
