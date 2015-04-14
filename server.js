var 
  http            = require('http')
  , path          = require('path')
  , express       = require('express')
  , app           = express()
  , marked        = require('marked').setOptions({ breaks: true })
  , db            = require('./app/model/index.js')
  , passport      = require('passport')
  , env           = (process.env.NODE_ENV || 'development');

// configuration ==============
// middleware
require('./lib/config/middleware.js')(app, passport, express);
app.set('port', process.env.PORT || 8080);

// MVC Definitions =============
// models =============
app.set('models', require('./app/model'));
var model = { 
  user          : app.get('models').User
};

// controllers ========
var controller = {
  static_pages  : require('./app/controller/static_pages.js'),
  dropbox       : require('./app/controller/dropbox.js'),
  users         : require('./app/controller/users.js')
};

// views ==============
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/app/view') );

// routes =============
require('./app/routes.js')(app, passport, model, controller, env);
require('./lib/config/passport')(model, passport);

// launch ===================
db.sequelize.sync({ force: true }).complete(function(err) {
  if (err) { throw err[0] ; } else { 
    http.createServer(app).listen(app.get('port'), function(){ 
      console.log('The magic happens on port ' + app.get('port'));
    });
  }
});

