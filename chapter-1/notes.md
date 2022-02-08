1. The extention is .scss, but there is also another one, which is .sass, which has a different syntax.

2. Starter (empty - resting template):
```
// import google font
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* Reset styles */
*{
    color: inherit;
    margin: 0;
}

body {
    font-family: Poppins;
}

ul {
    padding: 0;
    list-style-type: none;
}

a {
    text-decoration: none;
}

hr {
   border: 0;
   border-top: 1px dotted #efefef;
}

img {
    max-width: 100%;
}
```
3. in project `npm init` to create initialization, this will create `project.json` which keeps track of the project and installations.
4. `npm install gulp gulp-sass sass --save-dev`

5. `Watcher:`
In order to create a "watcher" and a hot-reload compiler - 
create:
`gulpfile.js`
```
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('index.scss')
        .pipe(sass())
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['index.scss'], buildStyles)
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 
```
run it with `gulp` command, it will stach the file and recompile on save.

---- 

6. variables are set with `$` for example here is a simple theme example:

```
// Theme Colors::after
$primary: #326dee;
$secondary: #1ac888;
$error: #d32752;
$info: #f6c31c;
```

And then you can use it anywhere, for example:
```
h1{
    color: $primary;
}

a{
    color: $secondary;
}

button {
    color: white;
    border: 0;
    background: $primary;
}

.error {
    color: $error;
    border-color: $error;
    border-style: solid;
}

.notification {
    color: $secondary;
    border-color: $secondary;
    border-style: solid;
}
```
---
7. You can split the sass into multiple files:  
`variables.scss` (We moved the variables there.)
```
// Theme Colors
$primary: #326dee;
$secondary: #1ac888;
$error: #d32752;
$info: #f6c31c;

// spacing
$base-padding:0.75rem;
$base-margin:0.75rem;

// borders
$base-border-thickness: 1px;
$base-border-radius: 20px;
```
then just import the file inside `index.scss` (You don't need to add .scss)
```
// import variables
@import 'variables';
```

The problem with this, is that you will need to compile all of the files, so to fix that we fix the `gulpfile.js` file then restart gulp:

```
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
```