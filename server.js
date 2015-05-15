var 
  path            = require('path')
  , express       = require('express')
  , app           = express()
  , marked        = require('marked').setOptions({ breaks: true })
  , db            = require('./app/model/index.js')
  , passport      = require('passport')
  , env           = process.env.NODE_ENV;

// configuration ==============
// middleware
require('./lib/config/middleware.js')(app, passport, express);
app.set('port', process.env.PORT || 8000);

// ssl ================
// if (env === 'development') {
 var https        = require('https')
  , fs            = require('fs')
  , options       = {
    key:                  fs.readFileSync('./lib/ssl/server.key')
    , cert:               fs.readFileSync('./lib/ssl/server.crt')
    , requestCert:        false
    , rejectUnauthorized: false
  };


var forceSSL = function(req, res, next) {
  console.log(req.secure);
  if (!req.secure) {
    console.log(req.secure, ' : ', req.protocol);
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// if (true) { 
  app.use(forceSSL); 
// }

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
    https.createServer(options, app).listen(app.get('port'), function(){ 
      console.log('The magic happens on port ' + app.get('port'));
    });
  }
});

