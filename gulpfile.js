const gulp = require('gulp');
const { series, parallel } = require('gulp');
const fs = require('fs');
const yaml = require('js-yaml');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify-es').default;
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

function build_ejs(cb) {
  const data = yaml.load(fs.readFileSync('./config.yaml', 'utf8'));
  gulp
    .src(['./src/**/*.ejs', '!' + './src/**/_*.ejs'])
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(ejs(data))
    .pipe(
      rename({
        extname: '.html',
      })
    )
    .pipe(gulp.dest('./dist/'));
  cb();
}
exports.build_ejs = build_ejs;

function build_sass(cb) {
  gulp
    .src(['./src/**/*.sass', './src/**/*.scss'])
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./dist/'));
  cb();
}
exports.build_sass = build_sass;

function build_js(cb) {
  gulp
    .src(['./src/**/*.js'])
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
  cb();
}
exports.build_js = build_js;

function build_img(cb) {
  gulp
    .src(['./src/img/**/*'], { encoding: false })
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(gulp.dest('./dist/img/'));
  cb();
}
exports.build_img = build_img;

function browser_sync(cb) {
  browserSync({
    server: {
      baseDir: './dist/',
    },
  });
  cb();
}
exports.browser_sync = browser_sync;

function bs_reload(cb) {
  browserSync.reload();
  cb();
}
exports.bs_reload = bs_reload;

function clean(cb) {
  fs.promises.rm('./dist/', {
    recursive: true,
    force: true,
  });
  cb();
}
exports.clean = clean;

function watch(cb) {
  gulp.watch(['./config.yaml', './src/**/*.ejs'], build_ejs);
  gulp.watch(['./src/**/*.sass', './src/**/*.scss'], build_sass);
  gulp.watch(['./src/**/*.js'], build_js);
  gulp.watch(['./src/img/**/*'], build_img);
  gulp.watch(['./dist/**/*'], bs_reload);
  cb();
}
exports.watch = watch;

exports.build = parallel(build_ejs, build_sass, build_js, build_img);

exports.default = series(parallel(build_ejs, build_sass, build_js, build_img), browser_sync, watch);
