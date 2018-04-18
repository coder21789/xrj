/**
 *
 * 数据格式化
 *
 */

'use strict';

const moment = require('moment');

export default {
  getRecommend: function(opt, timeFormat){
      let time = timeFormat || 'YYYY-MM-DD HH:mm';
      let option = {};
      opt.forEach(function(value, key) {
          if(value.recommend_code){
              if (option[value.recommend_code] === undefined) option[value.recommend_code] = [];
              if (value.publish_time) value.time = moment(value.publish_time).format(time);
              option[value.recommend_code].push(value);
          }
      });
      return option;
  },
  getRecommendIndexNav:function(obj){
      let option = [];
      let opt;
      for(opt  in  obj) {
          option.push(obj[opt]);
      }
      return option;
  },
  setNewsFormat: function(opt, getCode){
      let code = getCode;
      let newsList = {};
      opt.forEach(function(value, key) {
          if (value.publish_time) value.time = moment(value.publish_time).format(time);
          if(Object.prototype.toString.call(value) === '[object Array]' && value[0].category_id) {
              for(let i= 0; i < code.length; i++){
                  if(code[i].id == value[0].category_id){
                      newsList[code[i].code] =  value;
                      break;
                  }
              }   
          }
      });
      return newsList;
  },

 /**
  * resultMapNormal 返回结果，数组格式
  * @param {Array} list mysql请求列表
  *        {Object}    list[].model 模型
  *        {Array}     list[].arg 参数
  */

  resultMapNormal: function (list) {
      return Promise.all(list.map(getMap));
      function getMap(opt) {
        var arr = [];
        var option = {};
        var map;
        var time = 'YYYY-MM-DD HH:mm';
        opt.forEach(function(value, key) {
          let data = value.dataValues;
          data.time = moment(data.publish_time).format(time);
          arr.push(data);
        });
        map = arr;
        return map;
      };
  },

  /**
   * mysqlMapTable  联表数据查询结果格式化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */

  resultMapTable: function(list, foreignKey, transform) {
      return Promise.all(list.map(getMap));
      function getMap(opt) {
        var arr = [],
            option = {},
            map,
            format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'],
            day = new Date(),
            today = moment(day).format(format[1]);
        opt.forEach(function(value, key) {
          let data = value.dataValues;
          let time = data.publish_time;
          if (data[foreignKey]) {
            if (transform) {
              data.time = today === moment(time).format(format[1]) ?
                  moment(time).format(format[3]) : moment(time).format(format[2]);
            } else {
              data.news_time = moment(data[foreignKey].dataValues.publish_time).format(format[0]);
            }
          } else {
            data.time = moment(time).format(format[0]);
          }
          arr.push(data);
        });
        map = arr;
        return map;
      };
  },

  /**
   * resultMapCollection 大列表套小列表集合嵌套数据扁平化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
  
  resultMapCollection: async function (list, foreignKey, array) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
        var arr = [],
            map,
            format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
        opt.forEach(function (value) {
            let data = value.dataValues;
            if (data[foreignKey]) {
                data.name = data[foreignKey].dataValues.name;
            }
            if(data.publish_time) {
                data.timePoint = moment(data.publish_time).format(format[1]);
            }
            if (data.event_time) {
                data.eventPoint = moment(data.event_time).format(format[1]);
            }
            if (data[array]) {
                var list = [];
                data[array].forEach(function (value) {
                    var item = value.dataValues;
                    item.time = moment(value.dataValues.publish_time).format(format[1]);
                    list.push(item);
                });
                data.list = list;
            }
            arr.push(data);
        });
        map = arr;
        return map;
    };
  }
};