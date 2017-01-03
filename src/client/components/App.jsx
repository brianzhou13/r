import React, { Component } from 'react';
import { render } from 'react-dom';

import Console from './Console';

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	render() {
		return (
			<div>
				<div>hi</div>
				<Console />
			</div>
		)
	}
}

export default App;