module.exports = function(app
	, model
	, controller
  , env
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );

  app.route('/dropbox/new')
  	.get( controller.dropbox.new);

	 app.route('/request_token')
  	.get( function(req, res) { controller.dropbox.request_token(req, res, env); });

	 app.route('/access_token')
  	.get( function(req, res) { controller.dropbox.access_token(req, res); });

};
