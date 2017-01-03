var path = require('path');

module.exports = function(app, express) {

	app.route('/*')
		.get(function(req, res) {
		  res.sendFile(path.join(__dirname, '../client/index.html'));
		  // res.render('index.html');
		});
};