var
  dbox            = require('dbox')
  , dropbox       = dbox.app({'app_key': process.env.DROPBOX_KEY, 'app_secret': process.env.DROPBOX_SECRET})
  , js_token      = process.env.DROPBOX_TOKEN
  , qs            = require('querystring')
  , global_request_token
  , global_access_token
  , callback_url
  , client;

// GET, /costs/new, new
exports.new = function(req, res) {
  res.render('dropbox/new');
};

// GET, /token, token
exports.request_token = function(req, res, env) {
  switch (env) {
    case 'development':
      callback_url = 'localhost:8080';
      break;
    case 'production':
      callback_url = 'dropkey.io';
      break;
  }


  dropbox.requesttoken( function(status, request_token) {
    global_request_token = request_token;
    res.render('dropbox/request_token', { 
      request_token: request_token.oauth_token,
      callback_url: callback_url
    });
  });
};



exports.access_token = function(req, res) {
  var oauth_token = req.query.oauth_token
    , oauth_secret = req.query.oauth_secret
    , token_object = { oauth_token: oauth_token, oauth_secret: oauth_secret }
    , request_token = qs.stringify(token_object)
    , file_dir;

  try {
    dropbox.accesstoken(global_request_token, function( status, access_token) {
      global_access_token = access_token;


      client = dropbox.client(access_token);
      client.account(function( status, reply) {
        client.metadata('public', function(status_meta, reply_meta) {
          console.log(reply_meta);

          res.render('dropbox/access_token', {
            name: reply.display_name,
            email: reply.email,
            file_dir: file_dir
          });

        });
      });
    });
  } catch (e) {
    console.log('Error, ', e);
  }
};

exports.tree = function(req, res) {
  client = dropbox.client(js_token);
  client.delta(function(status, reply){
    console.log(reply);
    console.log('======');
    console.log(reply.entries);
    res.render('dropbox/tree', {
      entries: reply.entries
    });
  });

};

exports.create_file = function(req, res) {
  client = dropbox.client(global_access_token);
  client.put('hello.txt', 'hi here is some text', function(status, reply) {
    console.log(reply);

    res.render('dropbox/create_file', {
      path: reply.path,
      bytes: reply.bytes
    });
  });
};


// http://localhost:5000/access_token?oauth_token=fCLitVFMtjE0ad2E&oauth_secret=AqkGbuBycy2YNUPr