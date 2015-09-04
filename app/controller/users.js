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
	.findById(req.user.UserId)
	.then(function(user) {
		res.render('users/profile', {
			name 	: 	req.user.Name,
			email : 	req.user.Email,
			hash	: 	md5.update(req.user.Email, req.user.DropboxToke).digest('hex'),
			userId: 	req.user.UserId
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
