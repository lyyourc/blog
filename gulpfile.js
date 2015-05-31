var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;


gulp.task('views', function() {
  gulp.src('app/views/index.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))

    .pipe(gulp.dest('.tmp'));
});

gulp.task('styles', function() {
  gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      // precision: 10
      // onError: console.error.bind(console, 'Sass error: ')
    // })).on('error', function(err) {
    //   console.log('Error', err.message);
    //   this.emit('end');
    // })
  })).on('error', $.sass.logError)

    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', ['views', 'styles'], function() {
  var assets = $.useref.assets();

  gulp.src(['.tmp/*.html'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});


gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  gulp.src('app/views/index.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/){1}/
    }))
    .pipe(gulp.dest('app/views/'));
});


gulp.task('extras', function() {
  gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/views/**/*.jade'
  ], {
    dot: true
  })
  .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', function(cb) {
  var called = false;

  $.nodemon({
    script: 'server.js',
    ext: 'js',
    tasks: ['hint']
  })
    .on('start', function() {
      if (!called) {
        cb();
        called = true;
      }
    });
    // .on('restart', function() {
    //   // console.log('restarted');
    // });
});

gulp.task('hint', function() {
  gulp.src(['app/js/**/*.js', '*.js'])
    .pipe($.jshint());
});

gulp.task('clean', require('del').bind(null,['.tmp', 'dist']));


gulp.task('serve', ['views', 'styles', 'nodemon'], function() {
  browserSync.init({
    proxy: 'localhost:9000',
    port: 4000
  });

  gulp.watch([
    'app/*.html',
    '.tmp/*.html',
    'app/scripts/**/*.js',
  ]).on('change', reload);

  gulp.watch('app/jade/**/*.jade', ['views']);
  gulp.watch('bower.json', ['wiredep']);

});

gulp.task('build', ['wiredep', 'html', 'extras'], function() {
  gulp.src('dist/**/*')
    .pipe($.size({
      title: 'build',
      gzip: true
    })  
  );
});

gulp.task('deploy', ['build'], function () {
    return gulp.src('dist')
    .pipe($.subtree())
    .pipe($.clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
