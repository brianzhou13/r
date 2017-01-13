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
			currentIndex: 0,
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
		this._cycleHistory = this._cycleHistory.bind(this);
		this._updateIndex = this._updateIndex.bind(this);
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
		console.log('left: ', copyOfCurrent._left);
		console.log('center: ', copyOfCurrent._focus);
		console.log('right: ', copyOfCurrent._right);



		this.setState({
			left: copyOfCurrent._left,
			right: copyOfCurrent._right,
			focus: copyOfCurrent._focus,
		});
	}

	_determineRightLeft(leftOrRight) {
		// true is left
		let copyOfCurrent = this._makeCopy(this.state.current);
		// debugger;
		let nextId = leftOrRight ? 
			copyOfCurrent.getNode(this.state.currentKey).previous.value.id :
			copyOfCurrent.getNode(this.state.currentKey).next.value.id;

			console.log('nextId is: ', nextId);
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
			currentIndex: this.state.currentIndex + 1, // could update by _updateIndex
			left: '',
			right: '',
			focus: '',
		});
	}

	_setHistory(history) {
		this.setState({
			history: history
		});
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
					current: this.state.current,
					currentIndex: this.state.currentIndex,
					currentText: this.state.currentText,
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

	_updateIndex(newIndex) {
		this.setState({
			currentIndex: newIndex,
		});
	}

	_cycleHistory(upOrDown) {
		// the user cycles up
		let newHistoryIndex = upOrDown ? this.state.currentIndex - 1 : this.state.currentIndex + 1;

		if(!this.state.history[newHistoryIndex]) {
			// out of index
			return;
		}
		

			// if it does reset current history with history 1 index less than current
		let newHistoryCurrent = this.state.history[newHistoryIndex];
		let newHistoryCurrentKey = newHistoryCurrent.current._tail.value.id;
		// debugger;
		// let newHistoryCurrentText = newHistoryCurrent.currentText.text;
		let newHistoryCurrentText = newHistoryCurrent.currentText;
		
		this._updateState(newHistoryCurrent.current, newHistoryCurrentText, newHistoryCurrentKey);
		this._updateIndex(newHistoryIndex);

		// resets our left, right, focus
		this._setRightLeft(newHistoryCurrent.current); //XXX
		// debugger;
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
    if (e.keyCode === 38 && this.state.consoleIsActive) { // up arrow
    	this._cycleHistory(true);
    }
    if (e.keyCode === 40 && this.state.consoleIsActive) { // down arrow
    	this._cycleHistory(false);
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
		let newlyAddedNode = !copyOfCurrent._length || copyOfCurrent._tail.value.id === this.state.currentKey ?
			 copyOfCurrent.addNode(value, this._generateUniqueKey()): // add node if at end
			 copyOfCurrent.insertNode(value, this.state.currentKey, this._generateUniqueKey()); // insert node if not at end

		/*
		 returns the new total text, and it also sets the current ._left, ._right, ._focus
		 properties on our existing linkedList
		*/
		let text = copyOfCurrent.returnAllRightLeft(newlyAddedNode.value.id);

		// set state for left/ right/ center
		this._setRightLeft(copyOfCurrent);

		// update the state
		this._updateState(copyOfCurrent, this._updateCurrentText(text), newlyAddedNode.value.id);
	}

	_deleteCurrentLinkedList() {
		// this will delete the current key
		let copyOfCurrent = this._makeCopy(this.state.current);
		let newNextNode = copyOfCurrent.removeNode(this.state.currentKey);

		/*
			checks to see if we are removing the first node (._start). If we are removing the 
			first one, then the returned node from our LinkedList would point to null; therefore,
			would not actually have a .value.id property. 
		*/
		let newNextNodeId = newNextNode !== null ? newNextNode.value.id : false;

		// run the function
		// copyOfCurrent.returnAllRightLeft(newNextNode.value.id);
		let text = copyOfCurrent.returnAllRightLeft(newNextNodeId);

		// set state for left/ right/ center
		this._setRightLeft(copyOfCurrent);

		// let text = copyOfCurrent.returnAllRightLeft();
		console.log('text is: ', text);

		// this._updateState(copyOfCurrent, this._updateCurrentText(text), newNextNode.value.id);
		this._updateState(copyOfCurrent, this._updateCurrentText(text), newNextNodeId);
	}


	_getNameOnClick(e) {
		e.preventDefault();

		// set the user 
	}



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