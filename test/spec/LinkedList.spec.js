import { expect } from 'chai';

// create a new linkedList
const createNewLinkedList = () => {
	let newLinkedList = require('../../src/client/LinkedList');
	// console.log('linked list: ', newLinkedList);
	return new newLinkedList();
};

describe('Tests regarding our linkedList datastructure', function() {
	describe('able to appropriately add a value', function() {
		it('should be able to receive the LinkedList after add in new nodes through the addNode', function(done) {
			// addNode returns 'this';
			let testedNode = createNewLinkedList();

			expect(testedNode.addNode('a')).to.not.be.empty;
			expect(testedNode.addNode('b')).to.not.be.empty;
			expect(testedNode.addNode('c')).to.not.be.empty;

			testedNode = null;
			done();
		});

		it('should be able to increase in length after new nodes are added through addNode', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('d');
			testedNode.addNode('e');
			testedNode.addNode('f');


			expect(testedNode._length).to.equal(3);

			testedNode = null;
			done();
		});

		it('should have a final value that is equal to the most recently added value through addNode', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('g');
			testedNode.addNode('h');
			testedNode.addNode('i');

			let allNodeValues = testedNode.returnAll();

			expect(allNodeValues).to.be.a('string');
			expect(allNodeValues[allNodeValues.length - 1]).to.equal('i');

			testedNode = null;
			done();
		});

		it('should have values that are entered in proper order through addNode', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('j');
			testedNode.addNode('k');
			testedNode.addNode('l');

			let allNodeValues = testedNode.returnAll();

			expect(allNodeValues).to.be.a('string');
			expect(allNodeValues[0]).to.equal('j');
			expect(allNodeValues[1]).to.equal('k');
			expect(allNodeValues[2]).to.equal('l');

			testedNode = null;
			done();
		});
	});

	describe('able to appropriately remove a value', function() {
		it('should be able to have a length property that decreases by 1 when a value is removed', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('a', 1);
			testedNode.addNode('b', 2);
			testedNode.addNode('c', 3);
			testedNode.removeNode(1);

			let allNodeValues = testedNode.returnAll();

			expect(allNodeValues.length).to.equal(2);

			testedNode = null;
			done();
		});

		it('should have a last value that matches the next added value', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('d', 1);
			testedNode.addNode('e', 2);
			testedNode.addNode('f', 3);
			testedNode.removeNode(2);

			let allNodeValues = testedNode.returnAll();

			expect(allNodeValues[0]).to.equal('d');
			expect(allNodeValues[1]).to.equal('f');
			expect(allNodeValues[2]).to.not.be.ok;

			testedNode = null;
			done();
		});

		it('should be able to set its previous value correct when removing ._tail value', function(done) {
			let testedNode = createNewLinkedList();

			// remove the last value
			testedNode.addNode('d', 1);
			testedNode.addNode('e', 2);
			testedNode.addNode('f', 3);
			testedNode.removeNode(3);

			// test current
			expect(testedNode._tail.value.id).to.equal(2);

			// test previous
			expect(testedNode._tail.previous.value.id).to.equal(1);
			// test next
			expect(testedNode._tail.next).to.equal(null);


			testedNode = null;
			done();
		});

		it('should return a newLinkedList after removal', function(done) {
			let testedNode = createNewLinkedList();

			testedNode.addNode('g', 1);
			testedNode.addNode('h', 2);
			testedNode.addNode('i', 3);
			expect(testedNode.removeNode(2)).to.not.be.empty;

			testedNode = null;
			done();
		});
	});
});