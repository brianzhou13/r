import uuidV1 from 'uuid/v1';

class Node {
	constructor(nodeValue, key) {
		this.value = {
			id: key,
			text: nodeValue,
		};
		this.next = null;
		this.previous = null; // doubly linked-list to help with insertion
	}
}

class linkedList {
	constructor() {
		this._start = null;
		this._tail = null;
		this._allValues = '';
		this._allValuesArray = [];
		this._length = 0; //starts at 0

		// test
		this._left = '';
		this._right = '';
		this._focus = '';
	}

	getLength() {
		return this._length;
	}

	addLength() {
		this._length++;
	}

	subtractLength() {
		this._length--;
	}

	lengthCheck() {
		this._length === this._allValues.length ? 
			console.log('length-check failed') : console.log('length-check success')
	}

	addNode(value, key) {
		let node = new Node(value, key);
		if(!this._start) {
			// set both start and tail to the new node
			this._start = node;
			this._tail = node;
		} else {
			node.previous = this._tail;
			this._tail.next = node;
			this._tail = node;
		}
		this.addLength();

		// add entered node into our _allValues property
		this._allValues = this._allValues.concat(value);

		// you get the node you've just added back
		return this._tail;
	}

	insertNode(value) {
		// this inserts an item into a specific index

		// after insert, you'd return the List
		return this;
	}

	removeNode(id) {
		let currentNode = {
			node: this._tail,
			counter: 0,
		};

		/*
			we are searching from the beginning to find which node we are to remove
		*/
		while(currentNode.node.value.id !== id) {
			if(this._length < currentNode.counter) {
				return 'id was not found';
				// throw; // we can throw error as of now -- clean up for later
			}
			currentNode.node = currentNode.node.previous;
		}

		// decrement
		this.subtractLength();

		if(this._start.value.id === id) {
			if(this._length > 1) {
				/* 	
					we are first by removing the first character when there are more than one character
				*/
				this._allValues = this._allValues.slice(1, this._length);

				// removing the first Node
				this._start.next.previous = null;
				this._start = this._start.next;

				// return the new head
				return this._start;

			} else {
				/*
					we are removing the first character, and there is ONLY one character
				*/
				this._allValues = '';

				this._start = null;

				return this._start;
				
			}

		} else if (this._tail.value.id === id) {
			// edit _allValues first by removing the last character
			this._allValues = this._allValues.slice(0, this._length - 1);

			// removing the last value
			this._tail.previous.next = null;
			this._tail = this._tail.previous;

			// return the tail
			return this._tail;
			
		} else {
			// currentNode is correct now
			currentNode.node.previous.next = currentNode.node.next;
			currentNode.node.next = currentNode.node.previous;

			// reset it by calling 'returnAll()'
			this._allValues = this.returnAllRightLeft();

			// return the next node
			return currentNode.node.next;
		}
	}

	returnAll() {
		// this will recurse through and return all the values
		return this.returnAllRightLeft(this._start);
	}

	getNode(id, node = this._start) {
		if(node.value.id === id) {
			console.log('node found: ', node);
			return node;
		}

		return this.getNode(id, node.next);
	}

	resetLeftRightFocus() {
		// reset left, right, and focus position
		this._left = '';
		this._right = '';
		this._focus = '';
	}


	returnAllRightLeft(id) {
		// reset left/rightposition
		this.resetLeftRightFocus();

		console.log('value for id: ', id);

		if(id === false) {
			// at the end
			console.log("returning null");
			return '';
		}

		// moved out the recursing into another function
		return this.returnAllFnRightLeft(this._start, id);
	}

	returnAllFnRightLeft(node, id, flag = false, allNodeValues = '') {
		// debugger;
		let localAllNodeValues = allNodeValues;

		// concat the current node's value with the 
		localAllNodeValues = localAllNodeValues.concat(node.value.text);

		// code here deals with moving R, L, C
		if(node.value.previous === null) {
			this.resetLeftRightFocus();

			// then return
			return localAllNodeValues;
		}

		if(node.value.id !== id && flag === false) {
			// to the left
			this._left = this._left.concat(node.value.text);
		} 
		if (node.value.id === id) {
			// found the node @ the id entered
			this._focus = node.value.text;
			flag = true;
		} 
		if (node.value.id !== id && flag === true) {
			// to the right
			this._right = this._right.concat(node.value.text);
		}

		if(node.next) {
			return this.returnAllFnRightLeft(node.next, id, flag, localAllNodeValues); // recurse to next property
		} else {
			// we are at the end -- so concat current node value and return
			console.log('finishing recursion: ', localAllNodeValues);
			return localAllNodeValues;
		}
	}
}

module.exports = linkedList;

