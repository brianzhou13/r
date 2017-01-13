import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import uuidV1 from 'uuid/v1';

class CurrentLine extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<span className='user-tag'>Brian: r brianzhou$</span>
				{ 
					// this is for when there are no entries
					// using a '_' for now to display the white-background
					this.props.left.length === 0 && this.props.right.length === 0 ?
						<span key={ uuidV1() }className='focused-text'>_</span>
						: <span></span>
				}
				<span className='non-focused-text'>{ this.props.left }</span>
				<span className='focused-text'>{ this.props.focus }</span>
				<span className='non-focused-text'>{ this.props.right }</span>
				<span className='focused-text'> </span>
			</div>
		)
	}
}

// propTypes

export default CurrentLine;