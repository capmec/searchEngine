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
	persistentId: string;
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
	facets: Record<string, string[]>;
}

// Fetch items based on the search query, page, pageSize, and filters
export const fetchItems = async (
	query: string,
	page: number,
	pageSize: number,
	filters: Record<string, string>,
): Promise<SearchResponse> => {
	// Only use valid category values
	const validCategories = [
		'tool-or-service',
		'training-material',
		'publication',
		'dataset',
		'workflow',
	];
	const categoryValue =
		filters.categories && validCategories.includes(filters.categories)
			? filters.categories
			: 'tool-or-service';

	const response = await fetch(
		`https://marketplace-api.sshopencloud.eu/api/item-search?q=${encodeURIComponent(
			query,
		)}&page=${page}&pageSize=${pageSize}&categories=${categoryValue}`,
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
		facets: data.facets, // Ensure to include facets if you are using them
	};
};

// Fetch detail data for a specific item by persistentId
export const fetchDetailData = async (persistentId: string): Promise<any> => {
	try {
		const response = await fetch(
			`https://marketplace-api.sshopencloud.eu/api/tools-services/${persistentId}`,
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`);
		}
		const item = await response.json();
		console.log('Fetched Item:', item); // Log the API response
		return item;
	} catch (error) {
		console.error('Error fetching detail data:', error);
		throw new Error('Failed to fetch detail data');
	}
};
