const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(purgecss({ content: ['*.html'] }))
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['sass/**/*.scss', '*.html'], buildStyles)
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 
