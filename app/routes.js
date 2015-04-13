module.exports = function(app,
  passport,
	model,
	controller,
  env, flash
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );

// Users ==========================
  app.route('/users')
    .get( controller.users.index );

  app.route('/users/new')
    .get(function(req, res) { controller.users.new(req, res, model); } );
  
  app.route('/users')  
    .post(function(req, res) { controller.users.create(req, res, model); } );

  app.route('/users/:id([0-9]+)')
    .get(isLoggedIn, function(req, res) { controller.users.show(req, res, model); });

  app.route('/users/:id/edit')
    .get( controller.users.edit );

  app.route('/users/:id([0-9]+)')
    .post( function(req, res) { controller.users.edit(req, res, model); } );

// Passport =======================
  app.route('/connect/facebook')
    .get(passport.authenticate('facebook'));
  app.route('/connect/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: '/success',
      failureRedirect: '/fail'
      /*function(req, res) { res.redirect('/users/' + req.user._id);  } */
    }));

// Dropbox ========================
  app.route('/dropbox/new')
    .get( controller.dropbox.new);

   app.route('/request_token')
    .get( function(req, res) { controller.dropbox.request_token(req, res, env); });

  app.route('/access_token')
    .get( function(req, res) { controller.dropbox.access_token(req, res); });

  app.route('/tree')
    .get( function(req, res) { controller.dropbox.tree(req, res); } );

  app.route('/create_file')
    .get( function(req, res) { controller.dropbox.create_file(req, res); } );

};


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

