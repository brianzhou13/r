import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class History extends Component {
	constructor(props) {
		super(props);
		
		// not sure if we need this....

	}

	componentWillReceiveProps() {
		// debugger;
		console.log(this.props.history);
	}


	render() {
		return(
			<div>
				Inside History
				{
					this.props.history.map((entry) => {

						return (
							<p key={entry.id} className='history-font'>{entry.response}</p>
						)
					})
				}
			</div>
		);
	}
}

// propTypes

export default History;