module.exports = function(app
	, model
	, controller
	) {

// Static Routes ==================
  app.route('/')
  	.get( controller.static_pages.index );

  app.route('/dropbox/new')
  	.get( controller.dropbox.new);

	 app.route('/token')
  	.get( function(req, res) { controller.dropbox.token(req, res); });

};
