var gulp = require ('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    spritesmith = require('gulp.spritesmith'),
    replace = require('gulp-replace');

gulp.task('default',['concat','sass','fileinclude','connect','watch']);

gulp.task('make-sprite',['sprite','replace']);

gulp.task('replace', function(){
  gulp.src(['dev/scss/temp/sprite.scss'])
    .pipe(replace('url(#{$sprite-image})', 'url(../img/#{$sprite-image})'))
    .pipe(gulp.dest('dev/scss'));
});

gulp.task('sass', function () {
  gulp.src('./dev/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('connect',function(){
  connect.server({
    port: 1337,
    livereload: true
  });
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    algorithm: 'binary-tree',
  }));
  spriteData.img.pipe(gulp.dest('img/'));
  spriteData.css.pipe(gulp.dest('dev/scss/temp/'));
});

gulp.task('fileinclude', function() {
  gulp.src(['./dev/templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('html', function () {
    gulp.src('*.html')
    .pipe(connect.reload());
});
gulp.task('css', function () {
    gulp.src('css/*.css')
    .pipe(connect.reload());
});

gulp.task('concat', function() {
  return gulp.src(['./dev/js/jquery-1.11.1.min.js','./dev/js/lib/*.js'])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch',function(){
  gulp.watch('dev/scss/*.scss',['sass']);
  gulp.watch('dev/scss/*.sass',['sass']);
  gulp.watch('dev/chunks/*.html',['fileinclude']);
  gulp.watch('dev/templates/*.html',['fileinclude']);
  gulp.watch(['*.html'], ['html']);
  gulp.watch(['css/*.css'], ['css']);

});
