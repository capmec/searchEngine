import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailView from './components/DetailView';

import App from './App';

import './index.css';

import SearchResultsPage from './components/SearchResultsPage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route
					path='/'
					element={<App />}
				/>
				<Route
					path='/search'
					element={<SearchResultsPage />}
				/>
				<Route
					path='/tools-services/:persistentId'
					element={<DetailView />}
				/>
			</Routes>
		</Router>
	</React.StrictMode>,
);
