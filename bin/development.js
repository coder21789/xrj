'use strict';
/*基于ES6的压缩，如果静态资源不是ES6标准会报错*/
var path = require('path');
var projectRootPath = path.resolve(__dirname, '..');

var fs = require('fs');
var debug = require('debug')('dev');
require('colors');
var log = console.log.bind(console, '>>> [DEV]:'.red);
var babelCliDir = require('babel-cli/lib/babel/dir');
var babelCliFile = require('babel-cli/lib/babel/file');
let config = require('../config');
var chokidar = require('chokidar');
let host = Object.keys(config.host)[0];
const http = require('http');
let app = require('../app');
let appName = config.host[host];
let Paths = path.resolve(config.path.project + '/' + appName);
console.log(Paths+);
var srcPath =  Paths + '/static/js/main.js';//源文件，开发目录
var appPath = Paths +'/static/js/';//目标文件，压缩后目录

var watcher = chokidar.watch(path.join(__dirname, srcPath));//源文件中的项目根文件

watcher.on('ready', function () {
  log('Compiling...'.green);
  babelCliDir({outDir: appPath, retainLines: true, sourceMaps: true }, [ srcPath ]); // 开始压缩
  let server = require('http').createServer(app.callback());

  server.listen(config.site.port);

  log('♪ App Started'.green);

  watcher
    .on('add', function (absPath) {
      compileFile(srcPath, appPath, path.relative(srcPath, absPath), cacheClean);
    })
    .on('change', function (absPath) {
      compileFile(srcPath, appPath, path.relative(srcPath, absPath), cacheClean);
    })
    .on('unlink', function (absPath) {
      var rmfileRelative = path.relative(srcPath, absPath);
      var rmfile = path.join(appPath, rmfileRelative);
      try {
        fs.unlinkSync(rmfile);
        fs.unlinkSync(rmfile + '.map');
      } catch (e) {
        debug('fail to unlink', rmfile);
        return
      }
      console.log('Deleted', rmfileRelative);
      cacheClean()
    });
});

function compileFile (srcDir, outDir, filename, cb) {
  var outFile = path.join(outDir, filename);
  var srcFile = path.join(srcDir, filename);
  console.log(outFile);
  console.log(srcFile);
  console.log(srcFile.indexOf('dist'));
  if(srcFile.indexOf('static') == -1){
     try {
      babelCliFile({
        outFile: outFile,
        retainLines: true,
        highlightCode: true,
        comments: true,
        babelrc: true,
        sourceMaps: true
      }, [ srcFile ], { highlightCode: true, comments: true, babelrc: true, ignore: [], sourceMaps: true });
    } catch (e) {
      console.error('Error while compiling file %s', filename, e);
      return
    }
    console.log(srcFile + ' -> ' + outFile);
    cb && cb()
  }
};

function cacheClean () {
  Object.keys(require.cache).forEach(function (id) {
    if (/[\/\\](app)[\/\\]/.test(id)) {
      delete require.cache[id];
    }
  });
  log('♬ App Cache Cleaned...'.green);
};

process.on('exit', function (e) {
  log(' ♫ App Quit'.green);
});