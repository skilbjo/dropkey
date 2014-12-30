var
  dbox            = require('dbox')
  , dropbox       = dbox.app({'app_key': process.env.DROPBOX_KEY, 'app_secret': process.env.DROPBOX_SECRET})
  , client;

// GET, /costs/new, new
exports.new = function(req, res) {
  res.render('dropbox/new');
};

// GET, /token, token
exports.token = function(req, res) {

  dropbox.requesttoken( function(status, request_token) {
    dropbox.accesstoken(request_token, function(status, access_token){
      console.log(access_token);
      client = dropbox.client(access_token);
      client.account(function(status, reply) {
        console.log(reply);
      });
    });
  });

};

// GET, /cost/delete, delete
exports.delete = function(req, res) {

};


