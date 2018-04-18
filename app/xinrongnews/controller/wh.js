'use strict';
let moment = require('moment');
let oAuth = require('./oAuth');
moment.updateLocale('zh-cn', {
    weekdays: [
        "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
    ],
    weekdaysShort: [
        "周日", "周一", "周二", "周三", "周四", "周五", "周六"
    ]
});
import head from '../meta/index';
import nav from '../meta/nav';
let {getRecommend,setNewsFormat} = require('../setDateFormat').default;

exports.index = function* () {
  let code = "wh"; //页面的code;
  let news = this.mysql('news');
  let recommend = this.mysql('recommend');
  let category  = this.mysql('category');
  const recommendNavigartion = require('../meta/recommendNavSql');
  const recommendNavigartionList = yield recommendNavigartion.recommendNavigartion(this);
  const getCodeFun = require('../model/commonSelect/getChannel');
  let {getCode ,getMenu ,friendLinks} = yield getCodeFun.getCode(code,this);

  const getNavFun = require('../model/commonSelect/getNav');
  let {getWhCode} = yield getNavFun.getWhNav(code,this);
  let oauth = yield oAuth.state(this);

  let getOtherCode = yield this.findAllMap([
    {
      model: category,
      arg: {
          attributes:['code','id'],
          where: {
              '$or': [
                  {'name': ['外汇动态','外汇交易','大行观点','国际经济']}
              ],
              deleted: 0
          }
      }
    },
      {
          model: recommend,
          arg: {
              order: 'recommend_code ASC',
              attributes:['news_url','news_pic','news_recommend_subject'],
              where: {
                  recommend_code: {$like: 'web_wh_banner_%'},
                  state: 1
              }
          }
      }
  ]);
  getOtherCode = yield this.resultMap(getOtherCode);
  const whRecommendBanner = getOtherCode[1];
  getOtherCode = getOtherCode[0];

  let getNewsArr = [
    {
      model: recommend,
      arg: { 
          attributes: ['news_url','news_pic','news_recommend_subject','news_recommend_summary','recommend_code'],
          where: {
              category_code: code, state: '1'
          }
      }  
    },
    {
      model: recommend,
      arg: {
        attributes: ['news_url','news_pic','news_recommend_subject','news_recommend_summary','recommend_code'],
        where: {
          category_code: 'index',
          recommend_code: {'$in': ['web_sy_whdt','web_sy_whjy','web_sy_dxgd','web_sy_gjjj']},
          state: '1'
        }
      }
    }
  ]

  for(let i= 0 ; i< getOtherCode.length; i++){
    getNewsArr.push({
        model: news,
        arg: {
            order: "id DESC",
            attributes: ['news_url','subject','category_id'],
            limit: 8, 
            where: {category_id: getOtherCode[i].id,status: 1}
        }
    });
  }
  let getNews = yield this.findAllMap(getNewsArr);
  getNews = yield this.resultMap(getNews);

  yield this.proxy({
    spider: 'spider:post:finance-spider/exchange/fx-calendar'
  })
  let financialArr = (
    typeof(this.backData.spider) == "object" && this.backData.spider.data && this.backData.spider.data.financialArr ?
   this.backData.spider.data.financialArr : []);
// console.log(setNewsFormat(getNews.slice(2),getOtherCode));

  yield this.render('wh',{
    oauth: oauth.encrypted,
    today: moment().format('YYYY年MM月DD日 dddd'),
    friendlyLinks: friendLinks ,
    recommend: getRecommend(getNews[0]),
    indexRecommendNews: getRecommend(getNews[1]),
    newsList: setNewsFormat(getNews.slice(2),getOtherCode),
    meta: getCode,
    base: head[code],
    financeData: financialArr,
    code: code,
    last_degree: getMenu,
    topNavBar: nav['index'],
    recommended_nav: recommendNavigartionList,
    whRecommendBanner: whRecommendBanner,
    getWhCode: getWhCode,
    x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
  })
}

exports.qqrl = function* () {
  let code = "qqrl"; 
  const recommendNavigartion = require('../meta/recommendNavSql');
  const recommendNavigartionList = yield recommendNavigartion.recommendNavigartion(this);
  const getCodeFun = require('../model/commonSelect/getChildChannel');
  let {getCode ,getMenu} = yield getCodeFun.getCode(code,this);

  const getNavFun = require('../model/commonSelect/getNav');
  let {getWhCode} = yield getNavFun.getWhNav(code,this);
  let oauth = yield oAuth.state(this);

  let date = this.query.date || moment().format('YYYYMMDD');
  yield this.proxy({
    spider: 'spider:post:finance-spider/exchange/fx-calendar?date='+date
  })
  let financeData = (
    typeof(this.backData.spider) == "object" ?
    this.backData.spider : []);

  let dayNum = moment(date).format("d")>0 ? moment(date).format("d") : 7;
  let startTime = moment(date).subtract(dayNum-1, "days").format("YYYYMMDD");
  let time = {
    nextWeek: moment(startTime).add(7, "days").format("YYYYMMDD"),
    prevWeek: moment(startTime).subtract(7, "days").format("YYYYMMDD"),
    day: []
  }

  for(let i =0 ; i <7; i++){
    let now = moment(startTime).add(i, "days").format("YYYYMMDD");
    time.day.push({
      fulltime: now,
      date: moment(now).format("MM/DD"),
      day: moment(now).format("ddd")
    });
  }

  yield this.render('whrl',{
    oauth: oauth.encrypted,
    base: {
        pageInfo: {
            level: 3,
            name: "外汇",
            crumbs: {
              parent: {
                name: "外汇",
                code: "wh"
              },
              child: {
                name: "全球日历",
                code: "qqrl"
              }
            }
        }            
    },
    meta: getCode,
    time: time,
    checkday: date,
    financeData: financeData,
    selectedDate: moment(date).format('YYYY-MM-DD dddd'),
    code: "wh",
    thisCode: 'qqrl',
    last_degree: getMenu,
    topNavBar: nav['index'],
    recommended_nav: recommendNavigartionList,
    getWhCode: getWhCode,
    x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
  })
}