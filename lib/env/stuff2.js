var arr = [ 
	[ '/getting started.pdf', { path: '/Getting Started.pdf', is_dir: false} ],
  [ '/hello.txt',           { path: '/hello.txt',           is_dir: false } ],
  [ '/stuff',               { path: '/stuff',               is_dir: true } ],
  [ '/stuff/hi',            { path: '/stuff/hi',            is_dir: true } ],
  [ '/stuff/hi/stuff.txt',  { path: '/stuff/hi/stuff.txt',  is_dir: false } ] ]
	;

var parsePath = function(str) {
	var result = [];
	result = str.split('/');
	result.shift();
	return result;
};

var countLevels = function(arr) {
	return arr.length;
};

var levels = arr.map(function(i) {
	var parsedPath = parsePath(i[1].path);
	return countLevels(parsedPath);
});

// console.log(levels);

// console.log(arr.map(function(i){
// 	return parsePath(i[1].path);
// }));

var makeLevelOne = function(arr, arr_index) {
	if (arr_index[i] === 1 && arr[1][i].is_dir === false) {
		output.file = output.arr[0];
	}
};	

var file_tree = function(arr, arr_index) {
	var output = {};
	arr.map(function(i, j) {
		console.log(arr[j][0], arr_index[j]);
		if (arr_index[j] === 1) {
			if (arr[j][1].is_dir === false) {
				output.file = arr[j][0];
				// return output;
			}
		}
	});
	return output;
};

console.log(file_tree(arr, levels));


var file_tree_result = { 
	root: { 
		files: { 	1: 'Getting Started.pdf',
			2:'hello.txt',
		},
		'hi': {
			'stuff': {
				files: { 1: 'stuff.txt' }
			}
		}
	}
};


