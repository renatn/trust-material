var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');

var bundler = watchify(browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: true}));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src/js'
}));

// On updates recompile
bundler.on('update', build);

function build() {
    gutil.log('Compiling JSX...');
    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source('app.built.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(browserSync.stream({once: true}));
}

gulp.task('build', function() {
    return build();
});

gulp.task('browserSync', function() {
    var proxyOptions = url.parse('https://online.trust.ru/api/v1');
    proxyOptions.route = '/api/v1';

    browserSync({
        server: {
          baseDir: ['src', 'node_modules'],
          middleware: [proxy(proxyOptions)]
        },
    })
})

gulp.task('watch', ['build', 'browserSync'], function () {
    gulp.watch('./src/index.html', browserSync.reload);
});



gulp.task('default', ['watch']);