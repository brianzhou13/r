import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const root = document.getElementById('app');

// setup for HMR
if(module.hot) {
	module.hot.accept();
}

ReactDOM.render(<App />, root);