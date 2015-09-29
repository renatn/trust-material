var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var sourcemaps = require("gulp-sourcemaps");
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');
var del = require('del');
var runSequence = require('run-sequence');

function bundle(watch, debug) {
    var bundler = browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: debug});

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
            .pipe(buffer())
            .pipe(gulpIf(debug, sourcemaps.init({loadMaps: true})))
            .pipe(uglify())
            .pipe(gulpIf(debug, sourcemaps.write()))
            .pipe(gulp.dest('./dist/js'))
            .pipe(gulpIf(watch, browserSync.stream({once: true})));
    }

    return rebundle();
}

gulp.task('build:watch', function() {
    return bundle(true, true);
});

gulp.task('build:dist', function() {
    return bundle(false, false);
});

gulp.task('useref', function() {
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
    gulp.watch('./src/index.html', ['useref']);
    gulp.watch('./src/styles/style.css', ['useref']);
});

gulp.task('clean', function() {
  del('dist');
})

gulp.task('images', function() {
    return gulp.src('./src/images/**/*.*')
        .pipe(gulp.dest('dist/images'))
})

gulp.task('dist', function(cb) {
    runSequence('clean', 'build:dist', ['useref', 'images'], cb)
});

gulp.task('default', ['dist']);