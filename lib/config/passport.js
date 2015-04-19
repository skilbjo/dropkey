var FacebookStrategy 		= require('passport-facebook').Strategy
		DropboxStrategy 		= require('passport-dropbox').Strategy;

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

	// Dropbox

	passport.use(new DropboxStrategy({
		consumerKey				: process.env.DROPBOX_KEY,
		consumerSecret		: process.env.DROPBOX_SECRET,
		callbackURL				: process.env.DROPBOX_CALLBACK
	},
	function(token, tokenSecret, profile, done) {
		process.nextTick(function() {
			User.find({where: { DropboxId: profile.id } })
			.complete(function(err, user) {
				if (err) return done(err);

				if (user) {
					return done(null, user);
				} else {
					User
					.create({
						DropboxId 		: profile.id,
						Name 					: 'hi',
						Email 				: 'email@email'
					})
				}
			})
		});
	}));

	// Facebook

	passport.use(new FacebookStrategy({
		clientID        	: process.env.FACEBOOK_ID,
		clientSecret    	: process.env.FACEBOOK_SECRET,
		callbackURL     	: process.env.FACEBOOK_CALLBACK,
		passReqToCallback : true
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
				.find({where: { FacebookId: profile.id } })
				.complete(function(err, user) {
					return done(null, user);
				});
			}
		});

	}));

};