
"use strict";

process.env.DEBUG = process.env.DEBUG ;

module.exports = {
  host: {
    '127.0.0.1': 'xinrongnews'
  },

  // router配置
  router: {
    prefix: {
      xinrongnews: '/'
    }
  },

    // proxy配置
  proxy: {
    // 超时配置 
    timeout: 15000
  },

  // controller中请求各类数据前缀和域名的键值对
  api: {
    spider: 'http://172.16.60.160:8088',
    xinrongnews: 'http://172.16.60.160:8080',
    weixin: 'https://api.weixin.qq.com',
    qq: 'https://graph.qq.com',
    wap: 'http://172.16.60.160:3000'
  },

  // 站点相关的配置
  site: {
    env: 'production',
    port: 4000,
    hostname: 'production'
  },

  // 路径相关的配置
  path: {
    // project
    project: './app/',
    // 当直接访问域名时的默认路由
    default_path: {
      xinrongnews: '/index'
    },
    // 如果设置为false，则当直接访问域名时不重定向到default_path
    default_jump: {
     xinrongnews: true
    }
  },
  // mongo配置
  mongo: {
    options: {
      // mongoose 配置
    },
    api: {
    }
  },
  mysql: {
    api: {
      xinrongnews: {
        database: 'cjhnews2',
        username: 'xrjcs',
        password: 'xrjcs@123',
        option: {
          host: '172.16.60.161',
          dialect: 'mysql',
          protocol: 'tcp',
          port: '3306',
          //数据池
          pool: {
            max: 10,
            min: 0,
            idle: 10000
          },
          timezone: '+08:00'
        }
      }
    }
  },
  logs:{
    default_path: {
      xinrongnews: '/logs'
    }
  }
}
