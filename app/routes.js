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
    .get(isLoggedIn, function(req, res) { 
      console.log('get profile', req.user.dataValues.UserId);
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
      // controller.users.show(req, res, model);
    });
  });


  // app.get('/auth/dropbox/callback', function(req, res, next) {
  //   console.log('up here');
  //   passport.authenticate('dropbox-oauth2', function(err, user, info) {
  //     console.log('trying to auth');
  //     if (err) return next(err);
  //     if (!user) return res.redirect('/');
  //     req.logIn(user, function(err) {
  //       if (err) return next(err);
  //       return res.redirect('/users/' + user.UserId);
  //     });
  //   });
  // });


  // // Dropbox
  // app.route('/auth/dropbox')
  //   .get( passport.authenticate('dropbox-oauth2') );
  // app.route('/auth/dropbox/callback')
  // .get(function(req, res) { passport.authenticate('dropbox-oauth2')(req, res, function() {
  //     console.log(req.user);
  //     req.session.save(function() {
  //       res.send(req.user);
  //       // res.redirect('/users/' + req.user[0].dataValues.UserId);
  //     });
  //   });
  // });

// Facebook
  app.route('/auth/facebook')
    .get( passport.authenticate('facebook', { scope: "email"} ));
  app.route('/auth/facebook/callback')
    .get(function(req, res) { passport.authenticate('facebook')(req, res, function() {
        // console.log(req.user);
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


function isSameUser(req, res, next) {
  next();
  /*
  if (parseInt(req.params.id) === req.user.UserId) {
    return next();
  } else {
  res.redirect('/users/' + req.user.UserId);
  }
  */

}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

