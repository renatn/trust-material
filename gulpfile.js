var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');
var del = require('del');
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

function bundle(watch) {
    var bundler = browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: true});

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', rebundle);
    }

    bundler.transform(babelify.configure({
        sourceMapRelative: 'src/js'
    }));

    function rebundle() {
        gutil.log('Compiling JSX...');
        return bundler.bundle()
            .on('error', function (err) {
                gutil.log(err.message);
                browserSync.notify("Browserify Error!");
                this.emit("end");
            })
            .pipe(source('app.built.js'))
            .pipe(gulp.dest('./dist/js'))
            .pipe(gulpIf(watch, browserSync.stream({once: true})));
    }

    return rebundle();
}

gulp.task('build:watch', function() {    
    return bundle(true);
});

gulp.task('build:dist', function() {    
    return bundle(false);
});

gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('./src/index.html')
    .pipe(assets)
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
    var proxyOptions = url.parse('https://online.trust.ru/api/v1');
    proxyOptions.route = '/api/v1';

    browserSync({
        server: {
          baseDir: ['dist'],
          middleware: [proxy(proxyOptions)]
        },
    })
})

gulp.task('server', ['build:watch', 'browserSync'], function () {
    gulp.watch('./src/index.html', browserSync.reload);
});

gulp.task('clean', function() {
  del('dist');
})

gulp.task('dist', ['build:dist', 'useref'], function() {
    return gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('dist/images'))
});


gulp.task('default', ['dist']);