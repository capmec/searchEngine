// src/services/api.ts

export interface Contributor {
	actor: {
		id: string;
		name: string;
	};
	role?: {
		label: string;
	};
}

export interface SearchResultItem {
	id: string;
	persistentId: string; // Ensure this is part of the interface
	label: string;
	accessibleAt: string[];
	contributors: Contributor[];
}

export interface SearchResponse {
	items: SearchResultItem[];
	count: number;
	facets: Record<string, string[]>;
}

// Fetch items based on the search query, page, pageSize, and filters
export const fetchItems = async (
	query: string,
	page: number,
	pageSize: number,
	filters: Record<string, string>,
): Promise<SearchResponse> => {
	// Construct filter query string
	const filterQuery = Object.entries(filters)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	// Make the API request with query parameters
	const response = await fetch(
		`https://marketplace-api.sshopencloud.eu/api/item-search?q=${query}&page=${page}&pageSize=${pageSize}&${filterQuery}`,
	);

	// Check if the response is OK
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const data = await response.json(); // Parse the response as JSON
	return {
		items: data.items.map((item: any) => ({
			id: item.id,
			persistentId: item.persistentId,
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
		facets: data.facets, // Ensure facets are included
	};
};

// Fetch detail data for a specific item by persistentId
export const fetchDetailData = async (
	persistentId: string,
): Promise<SearchResultItem> => {
	try {
		const response = await fetch(
			`https://marketplace-api.sshopencloud.eu/api/tools-services/${persistentId}`,
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}

		const item = await response.json(); // Parse the response as JSON

		// Ensure the item data is returned correctly
		return {
			id: item.id,
			persistentId: item.persistentId,
			label: item.label,
			accessibleAt: item.accessibleAt,
			contributors: item.contributors.map((contributor: any) => ({
				actor: {
					id: contributor.actor.id,
					name: contributor.actor.name,
				},
				role: contributor.role,
			})),
		};
	} catch (error) {
		console.error('Error fetching detail data:', error);
		throw new Error('Failed to fetch detail data');
	}
};
