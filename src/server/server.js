var express = require('express');
var app = express();

// setup middleware
require('./middleware')(app, express);

// setup routes
require('./routes')(app, express);

var port = process.env.port || 8080;

app.listen(port, function() {
	console.log('listening at port:', port);
})