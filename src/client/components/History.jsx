import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';


class History extends Component {
	constructor(props) {
		super(props);
		
		// not sure if we need this....

	}

	render() {
		// hard-coding the user for now, in the future, would pass through EnterCredentials
		return(
			<div>
				{
					this.props.history.map((entry) => {
						return (
							<div key={ 'div ' + entry.id } className='history'>
								<span key={ 'input ' + entry.id } className='history-font'>{ entry.currentText.text }</span>
								<br/>
								<span key={ 'result' + entry.id } className='history-font'>{ entry.response }</span>
							</div>
						)
					})
				}
			</div>
		);
	}
}

// propTypes

export default History;