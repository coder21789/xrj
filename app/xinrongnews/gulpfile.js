//定义依赖和插件
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    minify = require('gulp-clean-css'),
    pngcrush = require('imagemin-pngcrush'),
    //base64 = require('gulp-base64'),
    imagemin = require('gulp-imagemin'),
    //sourcemaps = require('gulp-sourcemaps'),
    rev = require('gulp-rev'),
    ngAnnotate = require('gulp-ng-annotate'),
    runSequence = require('run-sequence'),
    revCollector = require('gulp-rev-collector'),
    cssimport = require("gulp-import-css"),
    del = require('del');

let path = require('path');
let source = 'static';
let dist = 'dist';
let distSourceJs = dist + '/source/js';
let distSourceCss = dist + '/source/css';

//定义名为js的任务 用于压缩JS
gulp.task('js', function () {
    return gulp.src(source + '/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle: false,//类型：Boolean 默认：true 是否修改变量名
            compress: true//类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(rev()) 
        .pipe(rev.manifest())
        .pipe(gulp.dest(distSourceJs))
        .pipe(connect.reload());
});

// 压缩图片
gulp.task('img', function() {
  return gulp.src([source +'/imgs/*.{png,jpg,gif,ico}', source +'/imgs/**/*.{png,jpg,gif,ico}'])
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest(dist+'/imgs'))
});

//定义名为公共js的任务 用于合并压缩JS
gulp.task('commonjs', function () {
    return gulp.src(source + '/common/js/*.js')
        .pipe(ngAnnotate())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(distSourceJs))
        .pipe(connect.reload());
});


//定义名为公共adjs的任务 用于广告页面合并压缩JS

// Clean 任务执行前，先清除之前生成的文件
gulp.task('clean', function(cb) {
    return del(['dist/js','dist/css'], cb)
});

gulp.task('css', function () {
    return gulp.src(source + '/css/*.css')
        .pipe(cssimport())
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest(distSourceCss))
        .pipe(rev())
        .pipe(gulp.dest(dist + '/css'));
});

//定义名为revJs的任务 
gulp.task('revJs', function(){
    return gulp.src(distSourceJs + '/*.js')
        .pipe(rev())
        .pipe(gulp.dest(dist + '/js'))
        
});

//定义名为revJs的任务 用于生成json
gulp.task('rev', function(){
    return gulp.src([distSourceJs + '/*.js', distSourceCss + '/*.css'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest(dist + '/rev/js'));
});

// Clean 任务执行前，先清除之前生成的文件
gulp.task('cleanSource', function(cb) {
    return del(['dist/source'], cb)
});

gulp.task('temp', function () {
    return gulp.src( source + '/common/html/*.html')
        .pipe(gulp.dest(dist + '/common'));
});

//定义名为revHtml的任务 用于替换MD5文件
gulp.task('revHtml', function () {
    return gulp.src([ dist + '/rev/**/*.json', source + '/view/*.html',source + '/view/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(dist + '/view'));
});

gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['js'],
        ['img'],
        ['commonjs'],
        ['clean'],
        ['css'],
        ['revJs'],
        ['rev'],
        ['cleanSource'],
        ['temp'],
        ['revHtml'],
        done);
});

//定义看守任务
gulp.task('default', ['dev']);

var browserSync = require('browser-sync').create();

//浏览器重载
gulp.task('browser-sync', function () {
   browserSync.init({
       proxy: '127.0.0.1:4000'
   });
    gulp.watch('static/**', ['dev']);
    setTimeout(function () {
        gulp.watch('static/**').on('change', browserSync.reload);
    }, 6000);
});