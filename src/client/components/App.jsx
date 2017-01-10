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



	render() {
		return (
			<div>
				<div>hi what's up</div>
				<Console
					current = {this.state.current} // not sure about if we need this
					currentText = {this.state.currentText}
				/>
			</div>
		)
	}
}

export default App;