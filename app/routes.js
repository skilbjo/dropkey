module.exports = function(app,
  passport,
	model,
	controller,
  env
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );


// Users ==========================
  app.route('/users')
    .get(isLoggedIn, function(req, res) { controller.users.index(req, res, model); } );

  app.route('/users/:id([0-9]+)')
    .get(isLoggedIn, function(req, res) { controller.users.show(req, res, model); });

  app.route('/users/:id/edit')
    .get(isLoggedIn, controller.users.edit );

  app.route('/users/:id([0-9]+)')
    .post(isLoggedIn, function(req, res) { controller.users.edit(req, res, model); } );

  app.route('/logout')
    .get(isLoggedIn, controller.users.logout );

  app.route('/profile')
    .get(isLoggedIn, function(req, res) { res.redirect('/users/' + req.user.UserId ); } );

// Passport =======================
// Dropbox
  app.route('/auth/dropbox')
    .get( passport.authenticate('dropbox') );
  app.route('/auth/dropbox/callback')
    .get(function(req, res) { passport.authenticate('dropbox')(req, res, function() {
        res.redirect('/users/' + req.user.UserId);
      });
    });

// Facebook
  app.route('/auth/facebook')
    .get( passport.authenticate('facebook', { scope: "email"} ));
  app.route('/auth/facebook/callback')
    .get(function(req, res) { passport.authenticate('facebook')(req, res, function() {
        res.redirect('/users/' + req.user.UserId);
      });
    });



  // get  /user/new Create new user handled by Passport.js  /* app.route('/users/new').get(function(req, res) { controller.users.new(req, res, model); } ); */
  // post /user     Create new user handled by Passport.js  /* app.route('/users').post(function(req, res) { controller.users.create(req, res, model); } ); */


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

