var
  dbox            = require('dbox')
  , dropbox       = dbox.app({'app_key': process.env.DROPBOX_KEY, 'app_secret': process.env.DROPBOX_SECRET})
  , qs            = require('querystring')
  , global_request_token
  , client;

// GET, /costs/new, new
exports.new = function(req, res) {
  res.render('dropbox/new');
};

// GET, /token, token
exports.request_token = function(req, res) {
  dropbox.requesttoken( function(status, request_token) {
    global_request_token = request_token;
    res.render('dropbox/request_token', { 
      request_token: request_token.oauth_token
    });
  });
};

// &oauth_callback=http://www.google.com


exports.access_token = function(req, res) {
  var oauth_token = req.query.oauth_token
    , oauth_secret = req.query.oauth_secret
    , token_object = { oauth_token: oauth_token, oauth_secret: oauth_secret }
    , request_token = qs.stringify(token_object);

  try {
    dropbox.accesstoken(global_request_token, function( status, access_token) {
      client = dropbox.client(access_token);
      client.account(function( status, reply) {
        console.log( reply );
        res.render('dropbox/access_token', {
          name: reply.display_name
        });
      });
    });
  } catch (e) {
    console.log('Error, ', e);
  }
};


// http://localhost:5000/access_token?oauth_token=fCLitVFMtjE0ad2E&oauth_secret=AqkGbuBycy2YNUPr