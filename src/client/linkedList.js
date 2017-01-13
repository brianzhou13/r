// linkedList data structure for fast insertion/deletion

/*
 * @name: Node
 * @input: the value and unique key of the to-be-created node
 * @output: n/a
 * @purpose: create a node to be added/inserted into our doubly-linkedlist
 */
class Node {
	constructor(nodeValue, key) {
		this.value = {
			id: key,
			text: nodeValue,
		};
		this.next = null;
		this.previous = null;
	}
}


/*
 * @name: linkedList
 * @input: n/a
 * @output: n/a
 * @purpose: creates a doubly-linkedList
 */
class linkedList {
	
	constructor() {
	 /*
	  * @name: properties on the linkedList class
	  * @purpose:
	  *   `._start`: the first node
	  *   `._tail`: the last node
	  *   `._allValues`: a string containing the values of all nodes
	  *   `._length`: the number of nodes
	  *   `._focus`: string of the character at a specific id
	  *   `._left`: string of all the values to the left of the `._focus` node
	  *   `._right`: string of all the values to the right of the `._focus` node
	  */

		this._start = null;
		this._tail = null;
		this._allValues = '';
		this._length = 0; 
		this._focus = '';
		this._left = '';
		this._right = '';
	}

	/*
	 * @name: getLength
	 * @input: n/a
	 * @output: int
	 * @purpose: returns the length
	 */
	getLength() {
		return this._length;
	}

	/*
	 * @name: addLength
	 * @input: n/a
	 * @output: n/a
	 * @purpose: increments the `._length` property
	 */
	addLength() {
		this._length++;
	}

	/*
	 * @name: subtractLength
	 * @input: n/a
	 * @output: n/a
	 * @purpose: decrements the `._length` property
	 */
	subtractLength() {
		this._length--;
	}

	/*
	 * @name: lengthCheck
	 * @input: n/a
	 * @output: boolean
	 * @purpose: checks that number of characters isn't more than the number of nodes
	 */
	lengthCheck() {
		return this._length === this._allValues.length ? 
			console.log('length-check failed') : console.log('length-check success')
	}

	/*
	 * @name: addnode
	 * @input: character, and a unique key
	 * @output: the node that's just been added
	 * @purpose: adds a node to either the END or the very beginning of the linkedList
	 */
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

	/*
	 * @name: insertNode
	 * @input: character, the key where the new node should be inserted, and a unique key
	 * @output: the node we just inserted
	 * @purpose: inserts a new node at a specific position
	 */
	insertNode(value, currentKey, generatedKey) {
		// this inserts an item into a specific index
		let node = new Node(value, generatedKey);
		let counter = 0;
		let currentNode = this._start;

		// if then send to addNode
		if(currentNode.value.id === null) {
			this.addnode(value, generatedKey);
		}

		while(currentNode.value.id !== currentKey) {
			if(this._length < counter) {
				return 'entry point could not be found';
			}
			currentNode = currentNode.next;
		}

		// once we've found our node -- exited the while-loop

		// increment the size of our LinkedList
		this.addLength();

		if(this._start.value.id === currentKey) {
			// inserting at head

			// set new node to point to current start
			node.next = this._start;
			this._start.previous = node.next;
			this._start = node;
		} else {
			currentNode.next.previous = node;
			node.next = currentNode.next;
			node.previous = currentNode;
			currentNode.next = node;
		}

		return currentNode;
	}

	/*
	 * @name: removeNode
	 * @input: id of the node we want to remove
	 * @output: the next node
	 * @purpose: removes the node at the passed in id
	 */
	removeNode(id) {
		let currentNode = {
			node: this._tail,
			counter: 0,
		};

		// we are searching from the beginning to find which node we are to remove
		while(currentNode.node.value.id !== id) {
			if(this._length < currentNode.counter) {
				return 'id was not found';
			}
			currentNode.node = currentNode.node.previous;
		}

		// decrement
		this.subtractLength();

		if(this._start.value.id === id) {
			if(this._length > 1) {
				// we are first by removing the first character when there are more than one character
				this._allValues = this._allValues.slice(1, this._length);

				// removing the first Node
				this._start.next.previous = null;
				this._start = this._start.next;

				// return the new head
				return this._start;

			} else {
				// we are removing the first character, and there is ONLY one character
				this._allValues = '';

				this._start = null;

				return this._start;
				
			}

		} else if (this._tail.value.id === id) {
			// we are removing the last node -- or the ._tail
			this._allValues = this._allValues.slice(0, this._length - 1);

			// removing the last value
			this._tail.previous.next = null;
			this._tail = this._tail.previous;

			// return the tail
			return this._tail;
			
		} else {
			// we are removing the node at the passed in `id`
			currentNode.node.previous.next = currentNode.node.next;
			currentNode.node.next = currentNode.node.previous;

			// reset it by calling 'returnAll()'
			this._allValues = this.returnAllRightLeft();

			// return the next node
			return currentNode.node.next;
		}
	}

	/*
	 * @name: getNode
	 * @input: id of the node we want to get, the current node we are checking
	 * @output: node at the id passed in
	 * @purpose: locate and return the node at the passed in id
	 */
	getNode(id, node = this._start) {
		if(node.value.id === id) {
			return node;
		}
		return this.getNode(id, node.next);
	}

	/*
	 * @name: resetLeftRightFocus
	 * @input: n/a
	 * @output: n/a
	 * @purpose: resets the instance's `._left`, `._right`, and `._focus` properties
	 */
	resetLeftRightFocus() {
		this._left = '';
		this._right = '';
		this._focus = '';
	}

	/*
	 * @name: returnAllRightLeft
	 * @input: the current id 
	 * @output: all the `.values` for all the nodes
	 * @purpose: to call the `returnAllFnRightLeft` while also calling the
	 *   `.resetLeftRightFocus` to reset the focus.
	 */
	returnAllRightLeft(id) {
		// reset left/rightposition
		this.resetLeftRightFocus();

		if(id === false) {
			// at the end
			console.log("returning null");
			return '';
		}

		// moved out the recursing into another function
		return this.returnAllFnRightLeft(this._start, id);
	}

	/*
	 * @name: returnAllFnRightLeft
	 * @input: current node, id of node we are looking for, flag to check if 
	 *   we have passed the node that contains the id, accumulator string to hold
	 *   all characters encountered while recursing
	 * @output: a string of all the values in the linkedList (i.e. `hello world`)
	 * @purpose: Used to update the `._left`, `._right`, `._focus` property of the
	 *   instance. It does this by:
	 *     1. Check if the node is at the `._start` position with `=== null`, and
	 *        if so, then return that first character
	 *     2. Check if the node value has passed the id yet. If not, then it'll 
	 *        concat the current node's value to the `._left` property
	 *     3. Check if the node value is at the id yet. If so, turn the flag value
	 *        to true and set the `._focus` property
	 *     4. Check if the flag is `true`. If so, then the node at `id` has been
	 *        found, and all remaining nodes will belong to the `._right` property
	 */
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
			return localAllNodeValues;
		}
	}
}

module.exports = linkedList;

