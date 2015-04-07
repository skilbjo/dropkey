var arr = [ 
	[ '/getting started.pdf', { path: '/Getting Started.pdf', is_dir: false} ],
  [ '/hello.txt',           { path: '/hello.txt',           is_dir: false } ],
  [ '/stuff',               { path: '/stuff',               is_dir: true } ],
  [ '/stuff/hi',            { path: '/stuff/hi',            is_dir: true } ],
  [ '/stuff/hi/stuff.txt',  { path: '/stuff/hi/stuff.txt',  is_dir: false } ] ]
	;

// Seperate each /
var parsePath = function(str) {
	var result = [];
	result = str.split('/');
	result.shift();
	return result;
};

// Count how many /
var countLevels = function(arr) {
	return arr.length;
};

// Store the result in an array
var levels = arr.map(function(i) {
	var parsedPath = parsePath(i[1].path);
	return countLevels(parsedPath);
});

// Generates files at the root level
var generateRoot = function(arr, levels) {
	var output = {};
	arr.map(function(item, index) {
		if (levels[index] === 1 && arr[index][1].is_dir === false) {
			output[index] = arr[index][0];
		}
	});
	output = { files: output };
	return output;
};	

// Generates the nested folders
var generateFolders = function(arr, levels, desired_level) {
	var output = {};
	arr.map(function(item, index) {
		if (levels[index] === desired_level && arr[index][1].is_dir === true) {
			output[index] = arr[index][0];
			delete arr[index];
		}
	});
	output = { folders: output };
	generateFolders(arr, levels, desired_level + 1);
	return output;
};	

// console.log(generateFolders(arr, levels));

var generateTree = function(arr, levels, desired_level) {
	var output = {};
	var largest = Math.max.apply(Math, levels);
	arr.map(function(item, index) {
		if (levels[index] === desired_level) {
			output[index+1] = arr[index][0];
			delete arr[index];
		}
	});

	// while (desired_level <= largest) {
	// 	generateTree(arr, levels, desired_level + 1);		
	// }

	return output;
};

console.log(generateTree(arr, levels, 1));


var arr = [ 
	[ '/getting started.pdf', { path: '/Getting Started.pdf', is_dir: false} ],
  [ '/hello.txt',           { path: '/hello.txt',           is_dir: false } ],
  [ '/stuff',               { path: '/stuff',               is_dir: true } ],
  [ '/stuff/hi',            { path: '/stuff/hi',            is_dir: true } ],
  [ '/stuff/hi/stuff.txt',  { path: '/stuff/hi/stuff.txt',  is_dir: false } ] ]
	;

// Desired Object -- would this work? Maybe I'm thinking too much
var file_tree_result = { 
	root: { 
		files: { 	
			1: 'Getting Started.pdf',
			2:'hello.txt',
		},
		'hi': {
			'stuff': {
				files: { 1: 'stuff.txt' }
			}
		}
	}
};

// Desired Object 2 -- this is even worse
var file_tree_result2 = {
	files: {
		1: 'Getting Started.pdf',
		2: 'hello.txt'
	}, 
	folders: {
		'hi': {
			'stuff': {
				files: { 1: 'stuff.txt' }
			}
		}
	}
};





