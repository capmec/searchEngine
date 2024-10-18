

## **Social Sciences & Humanities Open Marketplace Search App**

This project is a web-based search interface for exploring resources from the **Social Sciences & Humanities Open Marketplace**, built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It allows users to search for items using the `/item-search` endpoint of the SSH Open Marketplace API, filter results by category, view detailed information about items, and paginate through search results.



## **Features**

- **Search Functionality**: Users can search for items using keywords, which are sent to the `/item-search` API.
- **Category Filtering**: Users can filter the search results by categories, such as Tools & Services, Publications, Datasets, etc.
- **Autocomplete**: As users type in the search input, suggestions are fetched from the API and shown in a dropdown for quick selection.
- **Pagination**: Search results are paginated, and users can select the number of items displayed per page.
- **Detail View**: Clicking on any item from the search results displays detailed information about the item fetched from the `/tools-services/:persistentId` API.
- **Faceted Filtering**: Additional faceted filtering is implemented using the facets returned by the API to refine the search results.
- **Dynamic URL Updates**: Search terms, filters, and pagination are reflected in the URL, allowing users to bookmark or share specific searches.
- **Clear Search**: A clear button is available next to the search input to quickly reset the search.



## **Technologies Used**

- **React** (with TypeScript)
- **Vite** (for fast builds and development)
- **Tailwind CSS** (for styling)
- **React Router DOM** (for routing and navigation)
- **marketplace-api.sshopencloud.eu / Swagger ** (data source)

## **API Endpoints Used**

1. **`/item-search`**:
   - Used to fetch search results based on keywords and filters.
   - Supports parameters like `q` for the search term, `categories` for filtering, and pagination parameters `page` and `pageSize`.

2. **`/item-search/autocomplete`**:
   - Used to provide autocomplete suggestions as users type.

3. **`/tools-services/:persistentId`**:
   - Used to fetch detailed information about a specific tool or service based on its `persistentId`.

## **Installation**

### **Prerequisites**

- **Node.js** (version 14 or above)
- **npm** or **yarn**

### **Steps to Run Locally**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ssh-marketplace-search-app.git
   cd ssh-marketplace-search-app
