import React, { Component } from 'react';
import { render } from 'react-dom';

import History from './History';
import CurrentLine from './CurrentLine';

class Console extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='console-elem font'>
				<div id='console'>
					<History 
						history = { this.props.history }
						Name = { this.props.name }
						Username = { this.props.username }
					/>
					<CurrentLine 
						consoleIsActive = { this.props.consoleIsActive }
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
