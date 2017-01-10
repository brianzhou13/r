import React, { Component } from 'react';
import { render } from 'react-dom';

// need to think of a way to have this 'self-contained'
// import jQuery from 'jquery';
// import * as $ from 'jquery';

class Console extends Component {
	constructor(props) {
		super(props);

		this.setup = this.setup.bind(this);
	}

	componentDidMount(){
		this.setup();
		debugger;
	}

	setup() {
	  

	}

	// Console
		// History
		// Current


	render() {
		return (
			<div id='#console'>
				<History />
				<CurrentLine />
			</div>
		)
	}
};

export default Console;
