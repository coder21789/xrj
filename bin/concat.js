'use strict';
/*基于ES6的压缩，如果静态资源不是ES6标准会报错*/
const path = require('path');
const fs = require('fs');
const debug = require('debug')('dev');
require('colors');
const concat = require('concat');
const log = console.log.bind(console, '>>> [DEV]:'.red);

let config = require('../config');
var chokidar = require('chokidar');
let host = Object.keys(config.host)[0];
const http = require('http');
let app = require('../app');
let appName = config.host[host];
let Paths = path.resolve(config.path.project + '/' + appName);
console.log(Paths);
var srcPath = Paths + '\\static\\common\\js\\';//源文件，开发目录
var appPath = Paths + '\\static\\js/';//目标文件，压缩后目录

var watcher = chokidar.watch(path.join(__dirname, appPath));//源文件中的项目根文件

watcher.on('ready', function () {
  log('Compiling...'.green);
  let server = require('http').createServer(app.callback());
  concat(getFiles.getFileList(srcPath), appPath +'main.js');

  server.listen(config.site.port);

  log('♪ App Started'.green);
})


function compileFile (srcDir, outDir, filename, cb) {
  var outFile = path.join(outDir, filename);
  var srcFile = path.join(srcDir, filename);
  console.log(outFile);
  console.log(srcFile);
  console.log(srcFile.indexOf('dist'));
};

function cacheClean () {
  Object.keys(require.cache).forEach(function (id) {
    if (/[\/\\](app)[\/\\]/.test(id)) {
      delete require.cache[id];
    }
  });
  log('♬ App Cache Cleaned...'.green);
};

function readFileList(path, filesList) {
  let files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
      var stat = fs.statSync(path + itm);
      if (stat.isDirectory()) {
      //递归读取文件
        readFileList(path + itm + "/", filesList)
      } else {
        var obj = {};//定义一个对象存放文件的路径和名字
        obj = path + itm//名字
        filesList.push(obj);
      }
  });
};
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {}
};

process.on('exit', function (e) {
  log(' ♫ App Quit'.green);
});