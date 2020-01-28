const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const px2rem = require('gulp-smile-px2rem');
const autoprefixer = require('gulp-autoprefixer');
const reload = browserSync.reload;


task ('clean', () => {
  return src("dist/*", { read: false })
    .pipe(rm())
});

task ("pug", () => {
  return src("src/*.pug")
  .pipe(concat('index.html'))
  .pipe(pug({pretty: '\t'}))
  .pipe(dest('./dist'))
  .pipe(reload({ stream: true }));
});

const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/styles/main.scss',
 ];

task("styles", () => {
  return src(styles)
  .pipe(concat('main.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  .pipe(px2rem({
    dpr: 1,
    rem: 16,
    one: false 
  }))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(dest('./dist'))
  .pipe(reload({ stream: true }));
});


const scripts = [
  'node_modules/jquery/dist/jquery.min.js',
  'src/scripts/*.js'
];

task('scripts', () => {
  return src(scripts)
  .pipe(concat('main.js'))
  .pipe(dest('./dist'))
  .pipe(reload({ stream: true }));
})
task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: false
  });
 });

task('icons', () => {
  return src('src/images/icons/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke|style|width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images/icons'));
});

watch('./src/styles/**/*.scss', series('styles'));
watch('./src/**/*.pug', series('pug'));
watch('./src/scripts/*.js', series('scripts'));

 
task('default', series('clean', parallel('pug', 'styles', 'scripts'), 'server'));