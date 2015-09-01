var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var browserify  = require('browserify');
var watchify    = require('watchify');
var babel       = require('babelify');

function compile(watch) {
  var main          = watchify(browserify('./src/app.jsx').transform(babel, { stage: 0 }));
  var notification  = watchify(browserify('./src/notification.jsx').transform(babel, { stage: 0 }));
  var someViewModel = watchify(browserify('./src/someViewModel.jsx').transform(babel, { stage: 0 }));
  var someReactView = watchify(browserify('./src/someReactView.jsx').transform(babel, { stage: 0 }));

  function rebundle_main() {
    main.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'));
  }
  function rebundle_notification() {
    notification.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('notification.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'));
  }
  function rebundle_someViewModel() {
    someViewModel.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('SomeViewModel.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'));
  }
  function rebundle_someReactView() {
    someReactView.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('SomeReactView.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/dist'));
  }


  if (watch) {
    main.on('update', function() {
      console.log('-> bundling main ...');
      rebundle_main();
    });

    notification.on('update', function() {
      console.log('-> bundling notification ...');
      rebundle_notification();
    });

    someViewModel.on('update', function() {
      console.log('-> bundling SomeViewModel ...');
      rebundle_someViewModel();
    });

    someReactView.on('update', function() {
      console.log('-> bundling SomeReactView ...');
      rebundle_someReactView();
    });
  }

  rebundle_main();
  rebundle_notification();
  rebundle_someViewModel();
  rebundle_someReactView();
}

function watch() {
  return compile(true);
};


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
