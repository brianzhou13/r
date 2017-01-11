require('babel-register')();
// this supposedly allows for on-the-fly babel compiles

var jsdom = require('jsdom').jsdom;
// the above is used for loading async scripts

var exposedProperties = ['window', 'navigator', 'document'];
// not sure about this...

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
	if(typeof global[property] === 'undefined') {
		exposedProperties.push(property); // not sure (?)
		global[property] = document.defaultView[property];
	}
});

global.navigator = {
	userAgent : 'node.js'
}

documentRef = document;