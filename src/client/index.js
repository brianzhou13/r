import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import configureStore from './store.js';

const root = document.getElementById('app');
const store = configureStore;

// setup for HMR
if(module.hot) {
	module.hot.accept();
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
, root);