var flash           = require('connect-flash')
  , logger          = require('morgan')
  , favicon         = require('serve-favicon')
  , cookieParser    = require('cookie-parser')
  , methodOverride  = require('method-override')
  , errorHandler    = require('errorhandler')
  , bodyParser      = require('body-parser')
  , busboy          = require('connect-busboy');

module.exports = function(app, passport, express) {
	app.use(methodOverride()); 
	app.use(flash()); 
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(require('express-session')({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(errorHandler()); 
	app.use(busboy());

	app.use(favicon(__dirname + './../../public/src/assets/favicon/favicon.ico'));
	app.use('/bower',   express.static('bower_components'));
	app.use('/public',  express.static('public'));

};