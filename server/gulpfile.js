var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var gutil      = require('gutil')

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('build', function () {
	return browserify({entries: './src/app.jsx', 
                     extensions: ['.jsx'], 
                     debug: true })
		  .on('error', handleError)
      .transform(babelify)
      .on('error', handleError)
      .bundle()
      .on('error', handleError)
      .pipe(source('bundle.js'))
      .on('error', handleError)
      .pipe(gulp.dest('public/dist'))
      .on('error', handleError);
});

gulp.task('html', function() {
  gulp.src('./src/**/*.html')
   .pipe(gulp.dest('./public/'));
})

gulp.task('watch', ['build', 'html'], function () {
  gulp.watch('./src/**/*.jsx', ['build']);
  gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['watch']);