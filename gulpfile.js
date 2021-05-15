const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');

sass.compiler = require('node-sass');

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function () {
    return gulp.src('src/css/**.css')
        .pipe(cleancss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-scripts', function () {
    return gulp.src('src/js/**')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', gulp.series('copy-scripts'));
gulp.task('styles', gulp.series('minify-css'));


gulp.task('default', gulp.parallel('html', 'styles', 'scripts'));

gulp.task('watch', function () {
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./src/css/*.css', gulp.series('styles'));
});