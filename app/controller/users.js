var fs		= require('fs');
// http://stackoverflow.com/questions/8310657/how-to-create-a-dynamic-file-link-for-download-in-javascript

exports.index = function(req, res, model) {
	model.user
	.findAll()
	.then(function(users) {
		res.json(users);
	});
};

exports.show = function(req, res, model) {
	var md5 	= require('crypto').createHash('md5');
	model.user
	.find(req.user.UserId)
	.then(function(err, user) {
		res.render('users/profile', {
			name 	: 	req.user.Name,
			email : 	req.user.Email,
			hash	: 	md5.update(req.user.Email, req.user.DropboxToke).digest('hex')
		});
	});
};


exports.logout = function (req, res) {
  req.logout();
  res.redirect('/?logout=true');
};


// Stubs
exports.edit = function(req, res, model) {
	res.send('stub');
};

exports.update = function(req, res, model) {
	res.send('stub');
};

exports.delete = function(req, res, model) {
	res.send('stub');
};

// Obsolete due to Passport.js

// get /user/new handled by passport.js /* exports.new = function(req, res) { res.render('users/new'); }; */
// post /user handled by passport.js /* exports.create = function(req, res, model) { console.log(req.body); model.user .create({ Name: 	req.body.name, Email: 	req.body.email }) .then(function(user) { if(err || !user) { res.send(err); return; } else { console.log(user); res.send('hay guy nice job'); } }); }; */
