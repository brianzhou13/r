import uuidV1 from 'uuid/v1';

class Node {
	constructor(nodeValue, testingId) {
		// testingId will only be used for testing purposes
		this.value = {
			id: testingId || uuidV1(),
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
		this._length = 0; //starts at 0
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

	addNode(value, testingId) {
		let node = new Node(value, testingId);
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
		return this;
	}

	insertNode(value) {
		// this inserts an item into a specific index

		// after insert, you'd return the List
		return this;
	}


	removeNode(id) {
		// this will remove a node from a spot
			// find the id

		let currentNode = {
			node: this._start,
			counter: 0,
		}
		while(currentNode.node.value.id !== id) {
			if(this._length < currentNode.counter) {
				return 'id was not found';
				// throw; // we can throw error as of now -- clean up for later
			}
			currentNode.node = currentNode.node.next;
		}
		if(this._start.value.id === id) {
			// removing the first Node
			this._start.next.previous = null;
			this._start = this._start.next;
		} else if (this._tail.value.id === id) {
			// removing the last value
			this._tail.previous.next = null;
			this._tail = this._tail.previous;
		} else {
			// currentNode is correct now
			currentNode.node.previous.next = currentNode.node.next;
			currentNode.node.next = currentNode.node.previous;
		}
		this.subtractLength();
		return this;
	}

	returnAll() {
		// this will recurse through and return all the values
		return this.returnAllFn(this._start);
	}

	returnAllFn(node, allNodeValues = '') {

		// copy the allValues input
		let localAllNodeValues = allNodeValues;

		// concat the current node's value with the 
		localAllNodeValues = localAllNodeValues.concat(node.value.text);

		if(node.next) {
			return this.returnAllFn(node.next, localAllNodeValues); // recurse to next property
		} else {
			// we are at the end -- so concat current node value and return
			console.log('finishing recursion: ', localAllNodeValues);
			return localAllNodeValues;
		}
	}
}

module.exports = linkedList;


