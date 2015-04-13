exports.index = function(req, res, model) {
	model.user
	.findAll()
	.complete(function(err, users) {
		res.json(users);
	});
};

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
				res.send(err); return;
			} else {
				console.log(user);
				res.send('hay guy nice job');
			}
		});
};

exports.show = function(req, res, model) {
	model.user
	.find(req.id)
	.complete(function(err, user) {
		res.json(user);
	});
};

exports.edit = function(req, res, model) {
	res.send('stub');
};

exports.update = function(req, res, model) {
	res.send('stub');
};

exports.delete = function(req, res, model) {
	res.send('stub');
};

exports.list = function(req, res, model) {
	model.user
	.findAll()
	.complete(function(err, users) {
		console.log(users);
		if(err || !users) {
			res.send(err); return;
		} else {
			res.render('users/list', {
				users: users
			});
		}
	});
};
