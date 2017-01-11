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
				<div id='console' /*className='gradient'*/>
					<History />
					<CurrentLine 
						// current = { this.props.current } // do we need this ?
						currentText = { this.props.currentText } 
						consoleIsActive = { this.props.consoleIsActive } // do we need this ?
						left = { this.props.left }
						right = { this.props.right }
						focus = { this.props.focus }
					/>
				</div>
			</div>
		)
	}
};

export default Console;
