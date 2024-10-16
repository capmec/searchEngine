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
	accessibleAt: string[];
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
