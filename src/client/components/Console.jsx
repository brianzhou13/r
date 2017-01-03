import React, { Component } from 'react';
import { render } from 'react-dom';

// need to think of a way to have this 'self-contained'
// import jQuery from 'jquery';
// import * as $ from 'jquery';

import jqConsole from '../../../lib/jqconsole';

class Console extends Component {
	constructor(props) {
		super(props);

		this.setup = this.setup.bind(this);
	}

	componentDidMount(){
    // $(div).jqconsole(welcomeString, promptLabel, continueLabel, disableAutoFocus);
		this.setup();
	}

	setup() {
	  // debugger;
		$(function () {
		  var jqconsole = $('#console').jqconsole('Hi\n', '>>>');
		  var startPrompt = function () {
		    // Start the prompt with history enabled.
		    jqconsole.Prompt(true, function (input) {
	      // Output input with the class jqconsole-output.
	      jqconsole.Write(input + '\n', 'jqconsole-output');
	      // Restart the prompt.
	      // startPrompt();
		    });
		  };
		  startPrompt();
		});
	}

	render() {
		return (
			<div>
				<div id="console">

				</div>
			</div>
		)
	}
};

export default Console;
