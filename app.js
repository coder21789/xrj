'use strict';

require("babel-register");

let path = require('path');
let koa = require('koa');
let views = require('koa-views');
let convert = require('koa-convert');
let json = require('koa-json');
let Bodyparser = require('koa-bodyparser');
let koaStatic = require('koa-static-plus');
let nunjucks = require('nunjucks');
let Middles = require('./middleware/');
let config = require('./config');
const log4js = require('koa-log4');

require('./config/log')  //引入（运行）日志配置文件， 生产日志目录及相应文件
const logger = log4js.getLogger('app') //将当前文件日志命名为 app 
logger.info('--------step into xinrongnews-node-------------')

const app = new koa();
// body
const bodyparser = Bodyparser();

//middleware
app.use(convert(bodyparser))
app.use(convert(json()))
//app.use(convert(logger()))
// 获取host
let host = Object.keys(config.host)[0];
let appName = config.host[host];
let appPath = path.resolve(config.path.project + '/' + appName);
let errorPath = config.path.default_error && config.path.default_error[appName] || '/error/404';
let paths = appPath + '/static';//静态资源路径，
let view = paths +'/view'; //静态资源模板路径

//配置静态文件
app.use(convert(koaStatic(paths, {
  pathPrefix: ''
})))

//配置模板引擎
nunjucks.configure(view, {
  autoescape: true
});

//配置模板引擎
app.use(views(view, {
  map: {html: 'nunjucks'}, options: {}
}))

app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
// 如果配置了连接数据库
config.mysql.api[appName] && app.use(Middles.mysql(app, {
  root: appPath + '/model/mysql',
  connect: config.mysql.api[appName]
}))

// 配置控制器文件路由
app.use(Middles.proxy(app, config.api, {
  // proxy 配置
  hosts: config.hosts// 接口域名hosts配置，可以不配置
  //allowShowApi: config.site.env !== 'production'
}, {
  // request 配置
  timeout: config.proxy.timeout // 接口超时时间
}));

app.use(Middles.router(app, {
  root: appPath + '/controller',
  default_path: config.path.default_path[appName],
  default_jump: config.path.default_jump[appName],
  domain: host,
  errorPath: errorPath
}))

module.exports = app;