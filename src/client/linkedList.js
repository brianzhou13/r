class Node {
	constructor(nodeValue) {
		this.value = nodeValue;
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

	// empty linkedList, and we are adding our first element
	addNode(value) {
		let node = new Node(value);
		if(!this._start) {
			
			// set both start and tail to the new node
			this._start = node;
			this._tail = node;

		} else {
			// set the new node's previous property to the old node
			node.previous = this._tail;

			// set the last node's next property to the new node
			this._tail.next = node;

			// move the end to the new node
			this._tail = node;
		}

		// increase length
		this.addLength();
		return;
	}

	insertNode() {
		// this inserts an item into a specific index

	}


	removeNode() {
		// this will remove a node from a spot
	
	}

	returnAll() {
		// this will recurse through and return all the values
		return this.returnAllFn(this._start);

	}

	returnAllFn(node, allNodeValues = '') {

		// copy the allValues input
		let localAllNodeValues = allNodeValues;

		// concat the current node's value with the 
		localAllNodeValues = localAllNodeValues.concat(node.value);

		if(node.next) {
			return this.returnAllFn(node.next, localAllNodeValues); // recurse to next property
		} else {
			// we are at the end -- so concat current node value and return
			console.log('finishing recursion: ', localAllNodeValues);
			return localAllNodeValues;
		}

	}

}

module.exports = new linkedList();

let test_link = new linkedList();
test_link.addNode('a');
test_link.addNode('b');
test_link.addNode('c');
let all = test_link.returnAll();
console.log(all);

