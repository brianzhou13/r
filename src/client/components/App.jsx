import React, { Component } from 'react';
import { render } from 'react-dom';
import uuidV1 from 'uuid/v1';

import Console from './Console';
import linkedList from '../linkedList'; // imports a new linkedList data structure

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			current: linkedList, // should create a new linkedList every new line
			currentText: null, // this is the text displayed on the current line
			consoleIsActive: false, // this checks to see if the console is active
		};
	}

	// used for initial setup
	componentDidMount() {
		document.addEventListener("keypress", this._handleKeyPress, false);


		if(!this.state.current.getLength) {
			const firstSpace = ' ';
			// states that it's true
			let textLinkedList = new linkedList();
			textLinkedList.addNode(firstSpace); // add a space character for now

			// current is set to new linkedList
			this.setState({
				current: textLinkedList,
				currentText: {
					id: uuidV1(),
					text: firstSpace,
				}
			});
		}
	}

	// this will set the console to be active or not
	setConsoleIsActive(e) {
		if(e._targetInst._currentElement.props.id === 'console') {
			console.log('entered');
			this.setState({
				consoleIsActive: true
			});
		} else {
			this.setState({
				consoleIsActive: false
			});
		}
	}

	_handleKeyPress(e) {
		console.log('entered');

	}



	render() {
		return (
			<div 
				className='background' 
				onClick = { this.setConsoleIsActive.bind(this) }>
				<Console
					current = { this.state.current } // not sure about if we need this
					currentText = { this.state.currentText }
					consoleIsActive = { this.state.consoleIsActive }
				/>
			</div>
		)
	}
}

export default App;