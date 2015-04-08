var fs = require('fs')
	, crypto = require('crypto')
	, password = process.argv.slice(2)[0]
	, md5 = crypto.createHash('md5').update(password).digest('hex');

console.log(md5);

fs.writeFile('dropkey.drp', md5, function(err) {
	if (err) throw err;
	console.log('Dropkey.drp file has been placed on your drive\n');
});