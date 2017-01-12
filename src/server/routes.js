var path = require('path');

module.exports = function(app, express) {

	app.route('/api/eval/:id')
		.post(function(req, res){
			var final;
			try {
				final = eval('(' + req.body.text + ')');
				res.send(200, final);
			} catch (err) {
				res.send(201, `failed request with: ${err}`);
			}

		});

	app.route('/*')
		.get(function(req, res) {
		  res.sendFile(path.join(__dirname, '../client/index.html'));
		  // res.render('index.html');
		});
};