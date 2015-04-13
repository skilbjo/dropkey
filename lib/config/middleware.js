var flash           = require('connect-flash')
  , morgan          = require('morgan')
  , favicon         = require('serve-favicon')
  , cookieParser    = require('cookie-parser')
  , methodOverride  = require('method-override')
  , errorHandler    = require('errorhandler')
  , bodyParser      = require('body-parser')
  , busboy          = require('connect-busboy');

module.exports = function(app, passport) {

app.use(cookieParser()); 
app.use(methodOverride()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(flash()); 
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler()); 
app.use(morgan('dev'));  
app.use(busboy());

app.use(favicon(__dirname + './../../public/src/assets/favicon/favicon.ico'));

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('template/error', {
		message: err.message,
		error: {}
	});
});

if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('template/error', {
			message: err.message,
			error: err
		});
	});
}




};