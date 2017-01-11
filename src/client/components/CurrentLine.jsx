import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class CurrentLine extends Component {
	constructor(props) {
		super(props);
		
		// not sure if we need this....

	}

	componentWillMount() {
		// console.log('currentText is: ', this.props.currentText);
	}

	
	render() {
		return (
			<div>
				<span id='current-text'>{this.props.currentText.text}</span>
			</div>
		)
	}
}

// propTypes

export default CurrentLine;