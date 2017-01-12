import axios from 'axios';
import _ from 'lodash';
import uuidV1 from 'uuid/v1';
import React, { Component } from 'react';
import { render } from 'react-dom';

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
			left: '',
			right: '',
			focus: '',
			history: [],
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
		this._setRightLeft = this._setRightLeft.bind(this);
		this._processCode = this._processCode.bind(this);
		this._clearConsole = this._clearConsole.bind(this);
		this._setHistory = this._setHistory.bind(this);
	}


	_makeCopy(item) {
		let protoCopy = Object.create(item.__proto__);
		let propertyCopy = Object.assign(protoCopy, item);
		return propertyCopy;
	}

	_generateUniqueKey() {
		return uuidV1();
	}

	_handleKeyPress(e) {
		e.key.length === 1 && this.state.consoleIsActive && this._updateLinkedListText(e.key);
	}

	_setRightLeft(copyOfCurrent) {
		this.setState({
			left: copyOfCurrent._left,
			right: copyOfCurrent._right,
			focus: copyOfCurrent._focus,
		});
	}

	_determineRightLeft(leftOrRight) {
		// true is left
		let copyOfCurrent = this._makeCopy(this.state.current);
		let nextId = leftOrRight ? 
			copyOfCurrent.getNode(this.state.currentKey).previous.value.id :
			copyOfCurrent.getNode(this.state.currentKey).next.value.id;

		copyOfCurrent.returnAllRightLeft(nextId);

		// updates the left / right / focus
		this._setRightLeft(copyOfCurrent);

		this.setState({
			currentKey: nextId
		});
	}

	_clearConsole() {
		this.setState({
			current: new linkedList(),
			currentText: '',
			currentKey: '', // the KEY per each letter
			left: '',
			right: '',
			focus: '',
		})
	}

	_setHistory(history) {
		this.setState({
			history: history
		})
	}

	_processCode() {
		axios.post(`/api/eval/${this.state.currentText.id}`, {
			text: this.state.currentText.text
		})
		.then(function(resp){
			let test = this.state.history.slice();
			test.push({
					id: this.state.currentText.id,
					response: resp.data,
				});

			// updates the history state
			this._setHistory(test);
			
			// clears the console
			this._clearConsole();

		}.bind(this))
		.catch((err) => {
			console.log(`error within the _processCode function: ${err}`);
		});
	}

	_handleKeyDown(e) {
		if (e.keyCode === 8 && this.state.consoleIsActive) {
    	this._deleteCurrentLinkedList();
    }
    if (e.keyCode === 37 && this.state.consoleIsActive) { // left
    	this._determineRightLeft(true);
    }
    if (e.keyCode === 39 && this.state.consoleIsActive) {
    	this._determineRightLeft(false);
    }
    if (e.keyCode === 13 && this.state.consoleIsActive) {
    	this._processCode();
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

		// run the function
		copyOfCurrent.returnAllRightLeft(newlyAddedNode.value.id);

		// set state for left/ right/ center
		this._setRightLeft(copyOfCurrent);

		// get all the text back to add to state
		let text = copyOfCurrent.returnAll(); 

		// update the state
		this._updateState(copyOfCurrent, this._updateCurrentText(text), newlyAddedNode.value.id);
	}

	_deleteCurrentLinkedList() {
		// this will delete the current key
		let copyOfCurrent = this._makeCopy(this.state.current);
		let newNextNode = copyOfCurrent.removeNode(this.state.currentKey);

		// run the function
		copyOfCurrent.returnAllRightLeft(newNextNode.value.id);

		// set state for left/ right/ center
		this._setRightLeft(copyOfCurrent);
		let text = copyOfCurrent.returnAll();

		this._updateState(copyOfCurrent, this._updateCurrentText(text), newNextNode.value.id);
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
					left = { this.state.left }
					right = { this.state.right }
					focus = { this.state.focus }
					history = { this.state.history }
				/>
			</div>
		)
	}
}

export default App;