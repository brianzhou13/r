import React, { Component } from 'react';
import { render } from 'react-dom';

import Console from './Console';
import linkedList from '../linkedList'; // imports a new linkedList data structure

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			current: linkedList, // should create a new linkedList every new line
			currentText: '', // this is the text displayed on the current line
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
				currentText: firstSpace,
			});
		}
	}

	render() {
		return (
			<div>
				<div>hi what's up</div>
				<Console />
			</div>
		)
	}
}

export default App;