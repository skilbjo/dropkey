var FacebookStrategy 		= require('passport-facebook').Strategy;

module.exports = function(model, passport) {
	var User = model.user;

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(id, done) {
		User.find(id)
		.complete(function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		clientID        	: process.env.FACEBOOK_CLIENTID, 		clientSecret    	: process.env.FACEBOOK_CLIENTSECRET,
		callbackURL     	: process.env.FACEBOOK_CALLBACKURL, passReqToCallback : true
	},

	function(req, token, refreshToken, profile, done) {
		process.nextTick(function() {
			if (!req.user) {
				User.find({where: { FacebookId: profile.id } })
				.complete(function(err, user) {
					if (err) return done(err);

					if (user) {
						return done(null, user);
					} else {
						User
						.create({
							FacebookId 			: profile.id,
							FacebookToken 	: token,
							Name 						: profile.name.givenName + ' ' + profile.name.familyName,
							Email 					: profile.emails[0].value
						})
						.complete(function(err, user) {
							return done(null, user);
						});
					}
				});

			} else { 
				User
				.create({
					FacebookId 			: profile.id,
					FacebookToken 	: token,
					Name 						: profile.name.givenName + ' ' + profile.name.familyName,
					Email 					: profile.emails[0].value
				})
				.complete(function(err, user) {
					return done(null, user);
				});
			}
		});

	}));

};