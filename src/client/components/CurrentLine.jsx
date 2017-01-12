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

	componentWillReceiveProps() {
		console.log('deletion?');
		// debugger;

	}

	// <span id='current-text'>{this.props.currentText.text}</span>
	
	render() {
		return (
			<div>
				<span className='user-tag'>Brian:r brianzhou$</span>
				<span className='red'>{this.props.left}</span>
				<span className='blue'>{this.props.focus}</span>
				<span className='red'>{this.props.right}</span>
				<span className='blinker'>_</span>
			</div>
		)
	}
}

// propTypes

export default CurrentLine;