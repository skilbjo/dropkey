var FacebookStrategy 		= require('passport-facebook').Strategy;

module.exports = function(model, passport) {
	var User = model.user;

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.find(id)
		.complete(function(err, user) {
			done(err, user);
		});
	});


	// FACEBOOK =============
	passport.use(new FacebookStrategy({
			clientID        : process.env.FACEBOOK_CLIENTID,
			clientSecret    : process.env.FACEBOOK_CLIENTSECRET,
			callbackURL     : process.env.CALLBACKURL,
			passReqToCallback : true
	},

	function(req, token, refreshToken, profile, done) {
		process.nextTick(function() {
			if (!req.user) {
				User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
					if (err) return done(err);

					if (user) {
						if (!user.facebook.token) {
							user.facebookToken 	= token;
							user.name  					= profile.name.givenName + ' ' + profile.name.familyName;
							user.email 					= profile.emails[0].value;

							user.save(function(err) {
								if (err) throw err;
								return done(null, user);
							});
						}
							return done(null, user);
						} else {
							var newUser   				= new User();
							newUser.facebookId    = profile.id; // set the users facebook id                   
							newUser.facebookToken = token; // we will save the token that facebook provides to the user                    
							newUser.name  				= profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
							newUser.email 				= profile.emails[0].value; // facebook can return multiple emails so we'll take the first

							newUser.save(function(err) {
								if (err) throw err;
								return done(null, newUser);
							});
						}

				});

			} else { 
				var user            = req.user;

				user.facebook.id    = profile.id;
				user.facebook.token = token;
				user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
				user.facebook.email = profile.emails[0].value;

				user.save(function(err) {
					if (err) throw err;
					return done(null, user);
				});
			}
		});

	}));

};