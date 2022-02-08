const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('*.scss')
        .pipe(sass())
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['*.scss'], buildStyles)
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 
