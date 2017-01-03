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
    // $(div).jqconsole(welcomeString, promptLabel, continueLabel, disableAutoFocus);
		this.setup();
	}

	setup() {
	  
	  
	}

	render() {
		return (
			<div>
				<div id="console">

				</div>
			</div>
		)
	}
};

export default Console;
