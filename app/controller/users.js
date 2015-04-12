exports.new = function(req, res) {
	res.render('users/new');
};

exports.create = function(req, res, model) {
	console.log(req.body);
	model.user
		.create({
			Name: 	req.body.name,
			Email: 	req.body.email
		})
		.complete(function(err, user) {
			if(err || !user) {
				res.json(err); return;
			} else {
				console.log(user);
				res.send('hay guy nice job');
			}
		});
};

exports.list = function(req, res, model) {
	model.user
	.findAll()
	.complete(function(err, users) {
		console.log(users);
		if(err || !users) {
			res.json(err); return;
		} else {
			res.render('users/list', {
				users: users
			});
		}
	});
};
