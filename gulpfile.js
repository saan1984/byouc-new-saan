var gulp = require('gulp'),
    sass = require('gulp-sass'),
    os = require('os'),
    open = require('gulp-open'),
    connect = require('gulp-connect');
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    zip = require('gulp-zip');

gulp.task('connect', function() {
    connect.server({
        root:  [__dirname],
        port: 4000,
        livereload: true
    });
});

gulp.task('sass', function() {
    gulp.src('public/sass/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('public/css'))
        .pipe(sourcemaps.write())
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/sass/*.scss', ['sass']);
});


gulp.task('open', function(){
    return gulp.src('index.html')
        .pipe(open({uri:'http://localhost:4000'}));
});

gulp.task('clean', del.bind(
    null, ['.tmp', 'dist/'], {dot: true}
));

gulp.task('dist', ['clean', 'sass'], function () {
    return gulp.src([
            'Dockerfile', 'package.json',
            'index.html', 'app.js', 'bin/**/*',
            'routes/**/*', 'views/**/*', 'rough/**/*',
            'app/**/*', 'public/**/*'], { base: '.' })
        .pipe(zip('automatique.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['sass','connect', 'watch', 'open']);