1. **Order of import DOES matter**, code may be depended on code which was created before that:

Meaning:
in this "script":
```
@import 'variables';
@import 'base';
```

`base` is able to import and use things from `variables`, but you can use things for `base` inside variables.

----

2. updated the `gulpfile` to make it watch all of the files in all of the subfolders also.
```
const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    /* Takes the sass, the compiles it into CSS */
    return src('rabbit/**/*.scss')
        .pipe(sass())
        .pipe(dest('css'))
}

function watchTask() {
    /* Watches for changes */
    watch(['rabbit/**/*.scss'], buildStyles)
}

/* This will run on save of index.sass */
exports.default = series(buildStyles, watchTask) 

```
----

3. Here is an example of a practice different font sizes:
```
// font size
$base-font-size: 1rem;
$font-size-sm: $base-font-size * 0.75;
$font-size-lg: $base-font-size * 1.5;
$font-size-xl: $base-font-size * 2;
$font-size-xxl: $base-font-size * 3;
```

----

4. You can import different packages for example normally sass does not have division, so u can import math.

for examplke we will use division now in `_card`

```
@use 'sass:math';

.card{
    ...
    border-radius: math.div($base-border-radius,4);
```

----
5. **Maps in sass.**

maps look like this:

```
// color palette 
$colors: (
    'primary': $primary,
    'secondary': $secondary,
    'error': $error,
    'info': $info,
    'blue': #1919e6,
    'red': #e61919,
    'yellow': #e6e619,
    'green': #19e635,
    'orange': #ffa600,
    'purple': #9900ff,
    'gray': #808080,
    'black': black,
    'white': white
);
```

----
6. **Debug:**

to debug something (Print it in terminal, you can use @debug), for example lets get a color from the map.

Ofcourse that the functions in the debug are also available as normal functions.

```
// color palette 
$colors: (
    'primary': $primary,
    'secondary': $secondary,
    'error': $error,
    'info': $info,
    'blue': #1919e6,
    'red': #e61919,
    'yellow': #e6e619,
    'green': #19e635,
    'orange': #ffa600,
    'purple': #9900ff,
    'gray': #808080,
    'black': black,
    'white': white
);

@debug map-get($colors, "purple");
@debug map-has-key($colors, "secondary");
@debug map-has-key($colors, "fake");
@debug map-remove($colors,'primary');
@debug map-merge($colors,("pink":#ffc0cb));
```

---- 
7. **Loops**

Loops look like this (we created `_colors.scss`, and imported it in `index.scss`):

**simple loop with debug for each iteration.**

```
@each $key, $val in $colors {
    @debug $key $val
}
```
----
8. **Loops to create classes:**

Here we created TONS of variations of colors with dark / light mods, for each color in the color map:
```
@each $key, $val in $colors {
    .text-is-#{$key}{
        color:$val;
    }

    .bg-is-#{$key}{
        background-color:$val;
    }

    // Light variations
    @for $light_level from 1 through 9{
        .text-is-#{$key}-light-#{$light_level}{
            color: mix(white,$val,$light_level * 10);
        }
    }

    @for $light_level from 1 through 9{
        .bg-is-#{$key}-light-#{$light_level}{
            background: mix(white,$val,$light_level * 10);
        }
    }

    // Dark variations
    @for $dark_level from 1 through 9{
        .text-is-#{$key}-dark-#{$dark_level}{
            color: mix(black,$val,$dark_level * 10);
        }
    }

    @for $dark_level from 1 through 9{
        .bg-is-#{$key}-dark-#{$dark_level}{
            background: mix(black,$val,$dark_level * 10);
        }
    }
}
```

----
9. if statments - the problem with the previous script, is that we also generate light / dark pallets for white and black, and we dont need that, so we remove it with an if condition, that will check if `$val` is white or black.

```
@each $key, $val in $colors {
    .text-is-#{$key}{
        color:$val;
    }

    .bg-is-#{$key}{
        background-color:$val;
    }
    @if ($val != black and $val != white){
        // Light variations
        ....

        // Dark variations
        ....
        }
    }
}
```

----
10. **Parent selectors** - you can use things like &:hover to save code and make it readable and make more classes which are "effects".  
Ofcourse you can use multiple of them.
```
@each $key, $val in $colors {
    ...
    .text-hover-#{$key}{
        &:hover{
            color:$val
        }
    }
    ...
    @if ($val != black and $val != white){
        // Light variations
        @for $level from 1 through 9{
            ...
            .text-hover-#{$key}-light-#{$level}{
                &:hover{
                    color:mix(white,$val,$level *10)
                }
            }
        }
```
11. **Mixins**
Let's say we want to create 2 buttons variations, normally you would like to make it like so:
```
@each $key, $val in $colors {
    .btn-#{$key}{
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        padding: $base-padding $base-padding *2;
        border-radius: $base-border-radius;
        background-color: $val;
    }
    .btn-outline-#{$key}{
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        padding: $base-padding $base-padding *2;
        border-radius: $base-border-radius;
        background-color: $val;
        border: $base-border-thickness solid $val;
    }
}
```

The problem is the boilerplate code, so for that we can use `@mixin`, which is something like a base guidline class..? [More](https://www.educative.io/courses/sass-for-css/qA9k1grx603?utm_source=google&utm_medium=paid&utm_campaign=dsa_java_targets&utm_term=&utm_campaign=DSA+I+Java+I+Target+Geos&utm_source=adwords&utm_medium=ppc&hsa_acc=5451446008&hsa_cam=16058966280&hsa_grp=132258797505&hsa_ad=579205836940&hsa_src=g&hsa_tgt=dsa-369096314141&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAiA6Y2QBhAtEiwAGHybPW_i4rSbPiCG2fVilQlHvPDmVIKGlGzinIQ8S2ZXgKpA9zfpOgKJFRoCZpwQAvD_BwE)

**mixin example and usage: we include the baseline in each button type**

```
@mixin btn(){
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    padding: $base-padding $base-padding *2;
    border-radius: $base-border-radius;
}

@each $key, $val in $colors {
    .btn-#{$key}{
        @include btn();
        background-color: $val;
    }
    .btn-outline-#{$key}{
        @include btn();
        background-color: #fff;
        border: $base-border-thickness solid $val;
    }
}
```
and to make it even more clear, you can pass parameters into the Mixin...

```
@mixin btn($bg-color){
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    padding: $base-padding $base-padding *2;
    border-radius: $base-border-radius;
    background-color: $bg-color
}

@each $key, $val in $colors {
    .btn-#{$key}{
        @include btn($val);
    }
    .btn-outline-#{$key}{
        @include btn(#fff);
        border: $base-border-thickness solid $val;
    }
}
```

You can also set default value:
```
@mixin btn($bg-color: #e2e2e2){
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    padding: $base-padding $base-padding *2;
    border-radius: $base-border-radius;
    background-color: $bg-color
}

.btn {
    @include btn;
}
```
----

12. lighten (build in function, we will use it on hover of the buttons)
```
@mixin btn($bg-color: #e2e2e2){
    text-decoration: none;
    cursor: pointer;
    display: inline-block;
    padding: $base-padding $base-padding *2;
    border-radius: $base-border-radius;
    background-color: $bg-color
}

.btn {
    @include btn;
}

@each $key, $val in $colors {
    .btn-#{$key}{
        @include btn($val);
        &:hover{
            background-color: lighten($color: $val, $amount: 5)
        }
    }
    .btn-outline-#{$key}{
        @include btn(#fff);
        border: $base-border-thickness solid $val;
        &:hover{
            background-color: $val;
        }
    }
}
```
----
13. **Functions**

functions work just like normal functions.
- create `functions` folder, inside create `_functions.scss` and inside create a function & import it to `index.scss`:
```
@function light-comp($color){
    $complement: complement($color);
    $ligth-complement: lighten($complement, 30%);

    @return $ligth-complement;
}
```

- Using the function, let's create complementary buttons:
```
.btn-complement-#{$key}{
    @include btn($val);
    color:light-comp($val);
    &:hover {
        color:$val;
        background-color: light-comp($val);
    }
}
```
----
14. Making utility classes:
- create `_utilities.scss` & import it to `index.scss`:

first we create a map which will be used to generate classes.
```
@use 'sass:math';

$utilities: (
    'padding': (
        'prefix': 'p',
        'values': (
            '0': 0,
            '1': $base-padding,
            '2': $base-padding * 2,
            '3': $base-padding * 4,
            '4': $base-padding * 6,
            '5': $base-padding * 8,

        )
    ),
    'padding-left': (
        'prefix': 'pl',
        'values': (
            '0': 0,
            '1': $base-padding,
            '2': $base-padding * 2,
            '3': $base-padding * 4,
            '4': $base-padding * 6,
            '5': $base-padding * 8,

        )
    ),
);
```
then we make a generator of classes for the map (utilities map):
```
// generate utility classes from the map
@each $property, $map in $utilities{
    $prefix: map-get($map,'prefix'); // get all prefix
    $values: map-get($map,'values'); // get all values

    //@debug $prefix;
    //@debug $values;

    @each $key, $value in $values{ // iterate of keys,values
        @if($key != 'default') {
            .#{$prefix}-#{$key}{
                #{$property}: $value
            }
        }@else{ 
            .#{$prefix} {
                #{$property}: $value
            }
        }
    }
}
```
this will generate us classes for each item in the map

---
15. **Responsive example:**

This will some responsive text, meaning - if you add `<div class="responsive-text">Changing colors!!!</div>` to the html, you will get color changing text, which depends on the screen width size, the code is self explenetory.
```
$breakpoints: (
    'xs':0,
    'sm':480px,
    'md':720px,
    'lg':960px,
    'xl':1200px,
);

@mixin xs{
    @media (min-width: map-get($breakpoints,'xs')){
        @content;
    }
}

@mixin sm{
    @media (min-width: map-get($breakpoints,'sm')){
        @content;
    }
}

@mixin md{
    @media (min-width: map-get($breakpoints,'md')){
        @content;
    }
}

@mixin lg{
    @media (min-width: map-get($breakpoints,'lg')){
        @content;
    }
}

@mixin xl{
    @media (min-width: map-get($breakpoints,'xl')){
        @content;
    }
}

@mixin breakpoint($bp:0){
    @media (min-width: $bp){
        @content;
    }
}

.responsive-text {
    @include xs {
        color:red;
    }
    @include sm {
        color:blue;
    }
    @include md {
        color:green;
    }
    @include lg {
        color:purple;
    }
    @include xl {
        color:yellow;
    }
    @include breakpoint(1400px){
        color:pink;
    }
}
```
---
## 16. **Making a Grid System** - Fun parts begin.
Essentialy, creating a Grid System will make the website responsive.
You will generate a bunch of grid columns, which will take the sizes by screen size, meaning that if the screen is small, it will use a different class, unlike as if the Screen is wide, for example :  
The syntax is :  
column,columns size, screen size.
in out example below:  
1. column will take 12 out of 12 width, if screen is XS (extra small)
2. ** 5 out of 12 ** is SM (small)
3. ** 3 out of 12 ** is XL (extra large)

```
<div class="col-12-xs col-5-sm col-3-xl">
    <div class="card">
        <h3 class="card-title">Hello</h3>
        <p class="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ea perspiciatis
            fugiat iusto totam voluptas.</p>
    </div>
</div>
```

- We can generate a bunch of classes like this in this way:
```
@use 'sass:math';

$grid-columns : 12;

// base layout classes

.container {
    width:100%;
    max-width: 1200px;
    margin: 0 auto; // 0 (top / bottom) ||| auto -> will margin directly in center from left / right.
    padding: 0 20;
    box-sizing: border-box; // Will make border & padding incorporate into the overall width. 
}

.row {
    display: flex;
    flex-flow: row wrap;
}

// col classes
@include xs {
    @for $index from 1 through $grid-columns{ // iterate 12 times
        .col-#{$index}-xs { // Create for extra small
            box-sizing:border-box;
            flex-grow: 0;
            width: math.div($index * 100%, $grid-columns);
        }
    }
}
@include sm {
    @for $index from 1 through $grid-columns{ // iterate 12 times
        .col-#{$index}-sm { // Create for small
            box-sizing:border-box;
            flex-grow: 0;
            width: math.div($index * 100%, $grid-columns);
        }
    }
}
@include md {
    @for $index from 1 through $grid-columns{ // iterate 12 times
        .col-#{$index}-md {// Create for medium
            box-sizing:border-box;
            flex-grow: 0;
            width: math.div($index * 100%, $grid-columns);
        }
    }
}
@include lg {
    @for $index from 1 through $grid-columns{ // iterate 12 times
        .col-#{$index}-lg { // Create for large
            box-sizing:border-box;
            flex-grow: 0;
            width: math.div($index * 100%, $grid-columns);
        }
    }
}
@include xl {
    @for $index from 1 through $grid-columns{ // iterate 12 times
        .col-#{$index}-xl { // Create for extra large
            box-sizing:border-box;
            flex-grow: 0;
            width: math.div($index * 100%, $grid-columns);
        }
    }
}
```

## 17. **Fixing the grid a bit**

- **Creating some gaps classes**:  
the syntax `.gap-#{$key} > *{}` means for example that if you apply it on a row, each element inside the row, will get the style.  
So this way we will create some padding classes, and they will be generated for each gap size.  
in the end, we will put some negative margins in the sides, to clear the padding effect on first & last items.  
```
$grid-gaps: (
    '0':0,
    '1':10px,
    '2':20px,
    '3':30px
);

// grid gaps
@each $key, $value in $grid-gaps{
    .gap-#{$key} > *{ // Create padding for each by for each item inside the object the class is appended to.
        padding: $value;
    }
    .gap-#{$key}{
        // Will clean the padding from the sides on first & last item.
        margin-left: -$value;
        margin-right: -$value;
    }
}
```
- **Justify content**:  
```
$layout-values: flex-start, flex-end,center,space-between,space-around;

// Justify content classes
@each $value in $layout-values{
    .justify-#{$value}{
        justify-content:$value;
    }
}
```
----
## 18. `@extend` & navbar:

You are able to extend styles this way:
```
.flex-layout{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.navbar{
    @extend .flex-layout;
    padding: $base-padding $base-padding *2;
    box-shadow: $base-box-shadow;

    .site-title{
        font-size: $font-size-lg;
    }

    .container{
        @extend .flex-layout;
    }
}
```
The problem with this, is that it will also create a .flex-layout class, which we don't need, we only want to extend it, so we use:
```
%flex-layout{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.navbar{
    @extend %flex-layout;
    padding: $base-padding $base-padding *2;
    box-shadow: $base-box-shadow;

    .site-title{
        font-size: $font-size-lg;
    }

    .container{
        @extend %flex-layout;
    }
}
```

- Let's now make some variants of the navbar:
```
// Making varients of navbar
@each $key, $val in $colors {
    .navbar-#{$key}{
        @extend .navbar;
        background-color: $val;
    }
}
```