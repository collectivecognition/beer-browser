var autoPrefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var config = require('./config');
var del = require('del');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var mainBowerFiles = require('gulp-bower-files');
var merge = require('gulp-merge');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var ngConstant = require('gulp-ng-constant');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');

var paths = {
  js: ['app/**/*.js'],
  styles: ['styles/**/*.styl'],
  templates: ['app/**/*.html'],
  static: ['static/*', 'static/**/*']
};

gulp.task('start', ['build', 'watch', 'start']);

gulp.task('build', ['static', 'js', 'styles']);

gulp.task('deploy', ['build'], function() {
  return gulp.src(['build/*', 'build/**/*'])
    .pipe(ghPages());
});

var watching = false;
gulp.task('watch', ['js', 'styles', 'static'], function() {
  watching = true;
  gulp.watch(paths.js.concat(paths.templates), ['js']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.static, ['static']);
});

gulp.task('start', function() {
  nodemon({
    script: './server',
    watch: [],
    ext: 'js'
  });
});

gulp.task('ghPages', function() {
  return gulp.src(['build/**/*', 'build/*'])
    .pipe(ghPages());
});

gulp.task('js', ['clean'], function() {
  return merge(
    mainBowerFiles(),

    gulp.src(paths.js),

    gulp.src(paths.templates)
      .pipe(flatten())
      .pipe(templateCache({module: 'app', base: ''}))
      .pipe(gutil.noop()),

    gulp.src('')
      .pipe(ngConstant({
        name: 'config',
        constants: {config: config}
      }))
  )
  .pipe(ngAnnotate())
  .pipe(concat('app.js'))
  .pipe(gulpIf(config.minify, uglify()))
  .pipe(gulp.dest('build'));
});

gulp.task('styles', ['clean'], function() {
  gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 9', 'ie_mob', 'bb', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('static', ['clean'], function() {
  gulp.src(paths.static)
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(cb) {
  if(watching){
    return cb();
  }
  
  return del('build/*', cb);
});