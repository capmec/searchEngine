// src/services/api.ts

const API_BASE_URL = 'https://marketplace-api.sshopencloud.eu/api';

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
	accessibleAt: string[]; // Assuming this is an array of accessible URLs
	contributors: Contributor[];
}

export interface SearchResponse {
	items: SearchResultItem[];
	count: number;
}

// Fetch items based on search query
export const fetchItems = async (
	query: string,
	page: number,
	pageSize: number,
): Promise<SearchResponse> => {
	const response = await fetch(
		`${API_BASE_URL}/item-search?q=${encodeURIComponent(
			query,
		)}&page=${page}&pageSize=${pageSize}&categories=tool-or-service`,
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
				role: contributor.role, // Adjust role mapping as needed
			})),
		})),
		count: data.count,
	};
};

// Function to fetch autocomplete suggestions
export const fetchAutocomplete = async (query: string): Promise<string[]> => {
	const response = await fetch(
		`${API_BASE_URL}/item-search/autocomplete?q=${encodeURIComponent(query)}`,
	);
	if (!response.ok) {
		throw new Error('Failed to fetch autocomplete suggestions');
	}
	const data = await response.json();

	// console.log('Autocomplete Data:', data); // Log the response data to inspect its structure

	const items = data.items || [];
	return items.map((item: { label: string }) => item.label); // Adjust according to actual structure
};
