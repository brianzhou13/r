require('babel-register'); 

import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import sinon from 'sinon';

import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Console from '../../src/client/components/Console';
import History from '../../src/client/components/History';
import CurrentLine from '../../src/client/components/CurrentLine';

describe('Unit React Tests for <Console/>', function() {
	// it should have... XXXX

	// mount is 'real' rendering. use if state
	// shallow is non-state
	describe('it should have sub-components being rendered onto the page', function() {
		it('should have a History component', function() {
			const wrapper = shallow(<Console/>);
			expect(wrapper.find(History)).to.have.length(1);
		});

		it('should have a CurrentLine component', function() {
			const wrapper = shallow(<Console/>);
			expect(wrapper.find(CurrentLine)).to.have.length(1);
		});
	});

	describe('it should have props being passed into the component', function() {
		it('should have a currentText props', function() {
			const wrapper = shallow(<Console/>);
			expect(wrapper.props().currentText).to.be.defined;
		})

		it('should have a consoleIsActive props', function() {
			const wrapper = shallow(<Console/>);
			expect(wrapper.props().consoleIsActive).to.be.defined;
		});
	});
});