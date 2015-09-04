module.exports = function(app,
  passport,
	model,
	controller
  
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );


// Users ==========================
  app.route('/users')
    .get(isLoggedIn, function(req, res) { controller.users.index(req, res, model); } );

  app.route('/users/:id([0-9]+)')
    .get(isLoggedIn, isSameUser, function(req, res) { 
      controller.users.show(req, res, model); 
    });

  app.route('/users/:id/edit')
    .get(isLoggedIn, controller.users.edit );

  app.route('/users/:id([0-9]+)')
    .post(isLoggedIn, isSameUser, function(req, res) { controller.users.edit(req, res, model); } );

  app.route('/logout')
    .get(isLoggedIn, controller.users.logout );

  app.route('/profile')
    .get(isLoggedIn, function(req, res) { res.redirect('/users/' + req.user.UserId ); } );

// Passport =======================
// Dropbox
  app.route('/auth/dropbox')
    .get( passport.authenticate('dropbox-oauth2') );
  app.route('/auth/dropbox/callback')
  .get(function(req, res) { passport.authenticate('dropbox-oauth2')(req, res, function() {
      res.redirect('/users/' + req.user[0].UserId);
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

// Dropbox ========================
  app.route('/dropbox/new')
    .get( controller.dropbox.new);

  app.route('/tree')
    .get( function(req, res) { controller.dropbox.tree(req, res); } );

  app.route('/create_file')
    .get( function(req, res) { controller.dropbox.create_file(req, res); } );

};


function isSameUser(req, res, next) {
  if (parseInt(req.params.id) === req.user.UserId) {
    next();
  } else {
    res.redirect('/users/' + req.user.UserId);
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

