import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemDetail from './components/ItemDetail';

import App from './App';

import './index.css';

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
					path='/tools-services/:id'
					element={<ItemDetail />}
				/>
			</Routes>
		</Router>
	</React.StrictMode>,
);
