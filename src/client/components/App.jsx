import React, { Component } from 'react';
import { render } from 'react-dom';
import uuidV1 from 'uuid/v1';

import Console from './Console';
import linkedList from '../linkedList'; // imports a new linkedList data structure

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			current: new linkedList(),
			currentText: '', // this is the text displayed on the current line
			consoleIsActive: false, // this checks to see if the console is active
			currentKey: '', // the KEY per each letter
		};

		// set bindings for in-function calls
		this._updateLinkedListText = this._updateLinkedListText.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this._setConsoleIsActive = this._setConsoleIsActive.bind(this);
		this._deleteCurrentLinkedList = this._deleteCurrentLinkedList.bind(this);
		this._generateUniqueKey = this._generateUniqueKey.bind(this);
		this._makeCopy = this._makeCopy.bind(this);
		this._updateState = this._updateState.bind(this);
		this._updateCurrentText = this._updateCurrentText.bind(this);

	}

	componentWillMount() {
		// document.addEventListener("keypress", this._handleKeyPress, false);
		// document.addEventListener("keydown", this._handleKeyPress, false);

		// link: http://stackoverflow.com/questions/29069639/listen-to-keypress-for-document-in-reactjs
	}

	// first create a new copy of linkedList with its prototypes
	// then copy over all enumerable properties with assign
		// if we simply only used .assign, we wouldn't be able to get the prototypes
		// if we simply only used .create, we wouldn't be able to get the individual property values
	
	_makeCopy(item) {
		// return Object.assign(Object.create(linkedList.__proto__), item);
		let protoCopy = Object.create(item.__proto__);
		let propertyCopy = Object.assign(protoCopy, item);
		return propertyCopy;
	}

	_generateUniqueKey() {
		return uuidV1();
	}

	_handleKeyPress(e) {
		console.log('entered');
		this._updateLinkedListText(e.key);
	}

	_handleKeyDown(e) {
		if (e.keyCode === 8) {
    	this._deleteCurrentLinkedList();
    }
	}

	_updateCurrentText(text) {
		return {
			id: 'line-' + this._generateUniqueKey(),
			text: text,
		};
	}

	_updateState(current, currentText, currentKey) {
		this.setState({
			current: current,
			currentText: currentText,
			currentKey: currentKey,
		});
	}


	// used for initial setup
	componentDidMount() {
		if(!this.state.current.getLength()) {
			const firstSpace = ' ';
			let copyOfCurrent = this._makeCopy(this.state.current);
			let newlyAddedNode = copyOfCurrent.addNode(firstSpace, this._generateUniqueKey()); // add a space character for now

			debugger;
			this._updateState(copyOfCurrent, this._updateCurrentText(firstSpace), newlyAddedNode.value.id);
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
		console.log('value: ', value);

		// not sure. simply treating classes as objects, and duplicating an instance through .assign
		let copyOfCurrent = this._makeCopy(this.state.current);

		// add key pressed into end of our linkedList
		let newlyAddedNode = copyOfCurrent.addNode(value, this._generateUniqueKey());

		// get all the text back to add to state
		let text = copyOfCurrent.returnAll();

		// update the state
		this._updateState(copyOfCurrent, this._updateCurrentText(text), newlyAddedNode.value.id);

	}

	_deleteCurrentLinkedList() {
		// this will delete the current key
		let copyOfCurrent = this._makeCopy(this.state.current);
		// debugger;
		let newNextNode = copyOfCurrent.removeNode(this.state.currentKey);

		let text = copyOfCurrent.returnAll();

		this._updateState(copyOfCurrent, this._updateCurrentText(text), newNextNode.value.id);


		// debugger;

		// this.setState({
		// 	current: data,
		// 	currentText: updatedCurrentText,
		// 	currentKey: generatedKey,// should be the one immediately afterwards...
		// });
	}

	// can't delete twice...




	render() {
		return (
			<div 
				className='background' 
				tabIndex="0"
				onClick = { this._setConsoleIsActive }
				onKeyPress = { this._handleKeyPress }
				onKeyDown = { this._handleKeyDown }>
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