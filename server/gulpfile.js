const gulp        = require('gulp');
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');



// TASK DEFINITIONS
// ================
gulp.task('generate-app', function () {
  return browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: true})
    .transform(babelify, { stage: 0 })
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('generate-someReactView', function () {
  return browserify({entries: './src/SomeReactView.jsx', extensions: ['.jsx'], debug: true})
    .transform(babelify, { stage: 0 })
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('SomeReactView.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('generate-someViewModel', function () {
  return browserify({entries: './src/SomeViewModel.js', extensions: ['.js'], debug: true})
    .transform(babelify, { stage: 0 })
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('SomeViewModel.js'))
    .pipe(gulp.dest('public/dist'));
});


gulp.task('copy-html', function () {
   gulp.src('./src/**/*.html')
   .pipe(gulp.dest('./public'));
});



// ==== MAIN
// =============
gulp.task(
  'default', 
  ['generate-app', 'generate-someViewModel', 'copy-html', 'generate-someReactView'], 
  function () {
    gulp.watch('./src/**/*.jsx', ['generate-app', 'generate-someViewModel', 'generate-someReactView']);
    gulp.watch('./src/**/*.html', ['copy-html']);
});
