import React, { Component } from 'react';
import { render } from 'react-dom';
import uuidV1 from 'uuid/v1';

import Console from './Console';
import linkedList from '../linkedList'; // imports a new linkedList data structure

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			// current: linkedList, // should create a new linkedList every new line
			current: this._workWithLinkedList(),
			currentText: '', // this is the text displayed on the current line
			consoleIsActive: false, // this checks to see if the console is active
			currentKey: '',
		};

		// set bindings for in-function calls
		this._updateLinkedListText = this._updateLinkedListText.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this._setConsoleIsActive = this._setConsoleIsActive.bind(this);
		this._deleteCurrentLinkedList = this._deleteCurrentLinkedList.bind(this);
		this._generateUniqueKey = this._generateUniqueKey.bind(this);

		this._workWithLinkedList = this._workWithLinkedList.bind(this);
	}

	componentWillMount() {
		// document.addEventListener("keypress", this._handleKeyPress, false);
		// document.addEventListener("keydown", this._handleKeyPress, false);

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
					// id: uuidV1(), // don't need this here
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

	_generateUniqueKey() {
		return uuidV1();
	}

	_workWithLinkedList() {
		const firstSpace = ' ';
		let newLinkedList = new linkedList();
		newLinkedList.addNode(firstSpace);

		return function() {
			return newLinkedList;
		};
	}

	_updateLinkedListText(value) {
			console.log('value: ', value);
			let generatedKey = this._generateUniqueKey();
			let linkedList = this._workWithLinkedList();
			// debugger;
			let updatedLinkedListAdd = linkedList().addNode(value, generatedKey); // not insert
			let updatedCurrentText = {
				id: uuidV1(),
				text: updatedLinkedListAdd.returnAll(),
			};

			this.setState({
				current: updatedLinkedListAdd,
				currentText: updatedCurrentText,
				currentKey: generatedKey,
			});
		}


	// _updateLinkedListText(value) {
	// 	console.log('value: ', value);
	// 	let generatedKey = this._generateUniqueKey();
	// 	let updatedLinkedListAdd = this.state.current.addNode(value, generatedKey); // not insert
	// 	let updatedCurrentText = {
	// 		id: uuidV1(),
	// 		text: updatedLinkedListAdd.returnAll(),
	// 	};

	// 	this.setState({
	// 		current: updatedLinkedListAdd,
	// 		currentText: updatedCurrentText,
	// 		currentKey: generatedKey,
	// 	});
	// }

	_handleKeyPress(e) {
		console.log('entered');
		this._updateLinkedListText(e.key);
	}

	_handleKeyDown(e) {
		if (e.keyCode === 8) {
    	this._deleteCurrentLinkedList();
    }
	}

	_deleteCurrentLinkedList() {
		// this will delete the current key
		let removedNodeKey = this.state.current.removeNode(this.state.currentKey);
		let newList = updatedLinkedListDeletion.returnAll();

		this.setState({
			current: updatedLinkedListDeletion,
			currentText: updatedLinkedListDeletion.returnAll(),
			currentKey: removedNodeKey,// should be the one immediately afterwards...
		});
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
				/>
			</div>
		)
	}
}

export default App;