import axios from 'axios';

const API_BASE_URL = 'https://marketplace-api.sshopencloud.eu/api';

// Function to search items based on the query and other parameters
export const searchItems = (query: string, page: number, pageSize: number) => {
	return axios.get(`${API_BASE_URL}/item-search`, {
		params: {
			q: query, // Search query
			categories: 'tool-or-service', // Filtering by category to return only tools/services
			page: page, // Current page for pagination
			pageSize: pageSize, // Number of results per page
		},
	});
};

// Function to get detailed information about a specific item based on its ID
export const getItemDetails = (id: string) => {
	return axios.get(`${API_BASE_URL}/tools-services/${id}`);
};

// Function to get autocomplete suggestions for the search input
export const getAutoCompleteSuggestions = (query: string) => {
	return axios.get(`${API_BASE_URL}/item-search/autocomplete`, {
		params: { q: query }, // Search query for autocomplete suggestions
	});
};
