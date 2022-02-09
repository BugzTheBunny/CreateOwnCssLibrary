## Creating a webpage using the library

- All of the content from chapter-2 is here, meaning we are using the library to create some webpage.
- We created a demo page in `index.html`


## Purging CSS
We want to make it so, that the CSS file which is created, wont containt EVERYTHING that can be generated, due the fact that it will just be a huge file, with all of the available classes created, we want to make so, that only the things that are used in `index.html` will be generated.

1. install purge css => `npm install gulp-purgecss --save-dev`
2. update `gulpfile.js`
```
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss') // import gulp-purgecss.

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('rabbit/**/*.scss')
        .pipe(sass())
        .pipe(purgecss({ content: ['*.html'] })) // Will check all files for used styles.
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['rabbit/**/*.scss','*.html'], buildStyles) // now this will also watch html files for changes.
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 

```
3. now, after we rerun `gulp` we will notice that the CSS file is MUCH smaller, and only the classes that we use are generated.


---
### Customize Library.

Let's say we want to take the library as it is, and change the primary color.  
One way is to rewrite the library, but in that way, you may break something.  

So the alternative is to create a new file `sass/index.scss`:
to which we will need to import the library
```
@import 'rabbit';
```
also we need to fix the `gulpfile`:
```
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('sass/**/*.scss') <---- changed path
        .pipe(sass())
        .pipe(purgecss({ content: ['*.html'] }))
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['sass/**/*.scss', '*.html'], buildStyles)  <---- changed path
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 

```
Now let's customize:
```
$primary: indigo;
@import 'rabbit';
```

If you will refresh, you will see that it did not work.. that's because we didn't give the option for it to work.  
We will need to tell sass, that the style is replaceable, but it also has a default color (`!default`):
`_variables.scss`
```
// Theme Colors
$primary: #326dee !default;
$secondary: #1ac888 !default;
$error: #d32752 !default;
$info: #f6c31c !default;
```

if you will update it now, the `$primary` will be overwritten.

let's also add `!default` to all of the variables, cause they are pretty much global.
