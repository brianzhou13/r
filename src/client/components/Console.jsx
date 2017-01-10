import React, { Component } from 'react';
import { render } from 'react-dom';

// need to think of a way to have this 'self-contained'
// import jQuery from 'jquery';
// import * as $ from 'jquery';

import History from './History';
import CurrentLine from './CurrentLine';

class Console extends Component {
	constructor(props) {
		super(props);

	}

	// Console
		// History
		// Current


	render() {
		return (
			<div className='console-elem'>
				<div id='console'>
					<History />
					<CurrentLine />
				</div>
			</div>
		)
	}
};

export default Console;
