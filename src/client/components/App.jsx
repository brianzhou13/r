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
			currentText: '', // this is the text displayed on the current line
			consoleIsActive: false, // this checks to see if the console is active
		};

		// set bindings for in-function calls
		this._updateLinkedListText = this._updateLinkedListText.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this._setConsoleIsActive = this._setConsoleIsActive.bind(this);
	}

	componentWillMount() {
		document.addEventListener("keypress", this._handleKeyPress, false);
		// link: http://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
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

	// this will set the console to be active or not
	_setConsoleIsActive(e) {
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

	_updateLinkedListText(value) {
		console.log('value is: ', value);
		let updatedLinkedList = this.state.current.addNode(value); // not insert

		console.log('updating text to be: ', updatedLinkedList.returnAll());

		let updatedCurrentText = {
			id: uuidV1(),
			text: updatedLinkedList.returnAll(),
		};

		this.setState({
			current: updatedLinkedList,
			currentText: updatedCurrentText
		});
	}

	_handleKeyPress(e) {
		console.log('entered');
		this._updateLinkedListText(e.key);
	}




	render() {
		return (
			<div 
				className='background' 
				onClick = { this._setConsoleIsActive }>
				<Console
					// current = { this.state.current } // not sure about if we need this
					currentText = { this.state.currentText }
					consoleIsActive = { this.state.consoleIsActive }
				/>
			</div>
		)
	}
}

export default App;