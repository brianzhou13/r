var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('../../webpack.config');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// may need to wrap this into NODE_ENV
var compiler = webpack(webpackConfig);

module.exports = function(app, express) {

	// this check will turn off HMR
	if(process.env.NODE_ENV === 'development') {
		app.use(webpackDevMiddleware(compiler, {
			hot: true,
			publicPath: webpackConfig.output.publicPath,
			stats: { colors: true }
		}));

		app.use(webpackHotMiddleware(compiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		}));
	}

  app.use(morgan('dev'));

  //Reads information from forms ands puts it in a body object
  app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
    extended: true
  }));

	app.use(function(req, res, next) {
		console.log('[LOG @ Middleware] handling' + req.url);
		next();
	});

	app.use(express.static(__dirname + '/../client/'));
}