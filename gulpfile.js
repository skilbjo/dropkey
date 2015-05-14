var gulp 						= require('gulp')
	, jshint 					= require('gulp-jshint')
	, browserSync 		= require('browser-sync').create()
	, stylish 			 	= require('jshint-stylish')
	, uglify 					= require('gulp-uglify')
	, minifyCSS 			= require('gulp-minify-css')
	, concat 					= require('gulp-concat')
	, rename 					= require('gulp-rename')
	, livereload 			= require('gulp-livereload')
	, spawn    				= require('child_process').spawn
	, pub 			 			= './public/src/'
	, root	 					= './app/'
	, bower 					= 'bower_components/';

var src = {
	js: {
		all: [root + '**/*.js', root + '*.js', pub + 'js/**/*.js','server.js'],
		pub: [pub + 'js/analytics/*.js', pub + 'js/template/*.js'],
		pur: [pub + '/js/purchase/*.js', bower + 'jquery.payment/lib/jquery.payment.js']
	},
	css: {
		all: [pub + 'css/*.css']
	},
	jade: {
		all: [root + 'view/**/*.jade', root + 'view/**/elements/*.jade']
	}
};

gulp.task('default',
 ['build','server','watch']
);

gulp.task('build',
 ['lint','css','js','jade']
);

gulp.task('lint', function() {
	return gulp.src(src.js.all)
		.pipe(jshint({laxcomma:true}))
		.pipe(jshint.reporter(stylish));
});

gulp.task('js', function() {
	return gulp.src(src.js.pub)
		.pipe(uglify())
		.pipe(concat('dropkey.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('css', function() {
	gulp.src(src.css.all)
		.pipe(minifyCSS({keepBreaks:false}))
		.pipe(concat('style.css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('jade', function() {
	gulp.src(src.jade.all);
});

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 		server: { baseDir: './' }
// 	});
// });

/* 
make sure to enable LiveReload JS in the browser
<script src="http://127.0.0.1:35729/livereload.js?ext=Chrome&amp;extver=2.0.9"></script> 
*/

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(src.css.all, ['css']).on('change', livereload.changed);
	gulp.watch(src.js.all, ['js']).on('change', livereload.changed);
	gulp.watch(src.jade.all, ['jade']).on('change', livereload.changed);
	console.log('reloaded');
});

gulp.task('server', function() {
	var node;
  if (node) node.kill();
  node = spawn('nf', ['start','-p','8080','-e','lib/env/dev.env'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});