var  
	DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;

module.exports = function(model, passport) {
	var User = model.user;

	passport.serializeUser(function(user, done) {
		done(null, user[0].UserId);
	});
	
	passport.deserializeUser(function(UserId, done) { 
		User.findById(UserId)
		.then(function(user) {
			return done(null, user);
		});
	});

	// Dropbox
	passport.use(new DropboxOAuth2Strategy({
		clientID				: process.env.DROPBOX_KEY,
		clientSecret		: process.env.DROPBOX_SECRET,
		callbackURL			: process.env.DROPBOX_CALLBACK
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({where: { 
			DropboxId: profile.id,
			DropboxToken 	: accessToken,
			Name 					: profile.displayName,
			Email 				: profile.emails[0].value			
		}})
		.then(function(user) {
			return done(null, user);
		})
		.catch(function(err){
			done(null, false);
		});
	}
));

};