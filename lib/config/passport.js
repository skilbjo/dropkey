var 
	// FacebookStrategy 	= require('passport-facebook').Strategy,
	DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;

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
	passport.use(new DropboxOAuth2Strategy({
		clientID				: process.env.DROPBOX_KEY,
		clientSecret		: process.env.DROPBOX_SECRET,
		callbackURL			: process.env.DROPBOX_CALLBACK
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({where: { DropboxId: profile.id }, defaults: {
			DropboxToken 	: accessToken,
			Name 					: profile.displayName,
			Email 				: profile.emails[0].value			
		}})
		.complete(function(err, user) {
			if (err) return done(err);
			if (user) {
				return done(null, user);
			} 
		});
	}
));


	// Facebook
	// passport.use(new FacebookStrategy({
	// 	clientID        	: process.env.FACEBOOK_ID,
	// 	clientSecret    	: process.env.FACEBOOK_SECRET,
	// 	callbackURL     	: process.env.FACEBOOK_CALLBACK,
	// 	passReqToCallback : true
	// },

	// function(req, token, refreshToken, profile, done) {
	// 	process.nextTick(function() {
	// 		if (!req.user) {
	// 			User.find({where: { FacebookId: profile.id } })
	// 			.complete(function(err, user) {
	// 				if (err) return done(err);

	// 				if (user) {
	// 					return done(null, user);
	// 				} else {
	// 					User
	// 					.create({
	// 						FacebookId 			: profile.id,
	// 						FacebookToken 	: token,
	// 						Name 						: profile.name.givenName + ' ' + profile.name.familyName,
	// 						Email 					: profile.emails[0].value
	// 					})
	// 					.complete(function(err, user) {
	// 						return done(null, user);
	// 					});
	// 				}
	// 			});

	// 		} else { 
	// 			User
	// 			.find({where: { FacebookId: profile.id } })
	// 			.complete(function(err, user) {
	// 				return done(null, user);
	// 			});
	// 		}
	// 	});

	// }));

	// function(token, tokenSecret, profile, done) {
	// 	console.log(profile, '\n hi hi hi');
	// 	process.nextTick(function() {
	// 		User.findOrCreate({where: { DropboxId: profile.id }, defaults: { 
	// 			DropboxToken 	: token,
	// 			Name 					: profile.displayName,
	// 			Email 				: 'hi@hi'//profile.emails[0].value
	// 		}})
	// 		.complete(function(err, user) {
	// 			if (err) return done(err);

	// 			if (user) {
	// 				return done(null, user);
	// 			} else {
	// 				User
	// 				.create({
	// 					DropboxId 		: profile.id,
	// 					Name 					: 'hi',
	// 					Email 				: 'email@email'
	// 				});
	// 			}
	// 		});
	// 	});
	// }));

};