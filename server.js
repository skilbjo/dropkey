var 
	dbox = require('dbox')
	, dropbox = dbox.app({'app_key': process.env.DROPBOX_KEY, 'app_secret': process.env.DROPBOX_SECRET})
	, client;

dropbox.requesttoken( function(status, request_token) {
	dropbox.accesstoken(request_token, function(status, access_token){
		console.log(access_token);
		client = dropbox.client(access_token);
		client.account(function(status, reply) {
			console.log(reply);
		});
	});
});


