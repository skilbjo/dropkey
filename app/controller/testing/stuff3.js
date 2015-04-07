var fs = require('fs')
	,	path 	= require('path')
	, dir = require('node-dir');

var file_dir = path.resolve('/Users/skilbjo/Code/Node/dropkey/app/view/static_pages/');

dir.paths(file_dir, true, function(err, paths) {
    if (err) throw err;
    console.log('paths:\n',paths);
});

var tree = function(dir, done) {
	var results = [];

	fs.readdir(dir, function(err, list) {
		if (err) { return done(err); }


		var i = 0;

		(function next() {
			var file = list[i++];

			if(!file) return done(null, results);

			file = path.resolve(dir, file);

			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory() ) {
					tree(file, function(err, res) {
						results = results.concat(res);
						next();
					});
				} else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

var dropbox_array = [ 
	[ '/getting started.pdf' 	],
  [ '/hello.txt' 						],
  [ '/stuff' 								],
  [ '/stuff/hi' 						],
  [ '/stuff/hi/stuff.txt'		] ]
	;

tree(file_dir, function(err, results){
	if (err) throw err;
	console.log(results);
});




