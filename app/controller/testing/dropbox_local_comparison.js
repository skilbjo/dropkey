var fs = require('fs')
	,	path 	= require('path')
	, dir = require('node-dir');

var dropbox_array = [ ['/getting started.pdf'], ['/hello.txt'], ['/stuff'], ['/stuff/hi'], ['/stuff/hi/stuff.txt'] ];

var file_dir = path.resolve('/Users/skilbjo/Code/Node/dropkey/app/view/static_pages/');

var localDirectory = function() {
	dir.paths(file_dir, true, function(err, paths) {
		results = [];
		if (err) throw err;
		console.log('paths:\n',paths);

		return results;
	});
};

var compareDirectories = function(local, dropbox) {
	var result = [];

	local.map(function(i) {

	});

	dropbox.map(function(i) {

	});
};

