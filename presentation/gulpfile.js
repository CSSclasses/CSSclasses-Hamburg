var gulp = require("gulp");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var notify = require("gulp-notify");

/*
 * Opens a webserver (usually localhost:3000) and runs the site.
 */

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('copy', function() {
    return gulp.src([
            './*.html',
            './js/reveal.js',
            './assets/**'
        ])
        .pipe(gulp.dest('dist/'))
});

// Compiles your selected scss file, autoprefixes and minifies it and saves it to dist folder.

gulp.task("scss", function () {
    gulp.src(["./scss/*.scss"])
        .pipe(sass({
            onError: function (err) {
                return notify().write(err);
            }
        }))
        .pipe(autoprefixer("last 2 version", "ie 9"))
        .pipe(gulp.dest("./dist/"))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['build'], function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch(['./**/*.html', './scss/**/*.scss'], ['scss', 'copy']);
});

gulp.task('build', ['copy', 'scss']);
gulp.task('default', ['build']);