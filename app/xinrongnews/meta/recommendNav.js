'use strict';

const moment = require('moment');

let year = moment().format('YYYY');
let month = moment().add('days', -1).format('MM');

export default [
    {
        "code": "",
        "name": "最新话题",
        "parentCode": "ht"
    },
    {
        "code": "",
        "name": "图说财经",
        "parentCode": "tj"
    },
    {
        "code": "cjyw",
        "name": "财经要闻",
        "parentCode": "cj"
    },
    {
        "code": "jjsj",
        "name": "经济数据",
        "parentCode": "cj"
    },
    {
        "code": "gnjj",
        "name": "国内经济",
        "parentCode": "cj"
    },
    {
        "code": "gjjj",
        "name": "国际经济",
        "parentCode": "cj"
    },
    {
        "code": "cjrl",
        "name": "财经日历",
        "parentCode": "cj"
    },
    {
        "code": "cjrw",
        "name": "财经人物",
        "parentCode": "cj"
    },
    {
        "code": "gsyw",
        "name": "股市要闻",
        "parentCode": "gp"
    },
    {
        "code": "jggd",
        "name": "机构观点",
        "parentCode": "gp"
    },
    {
        "code": "dpfx",
        "name": "大盘分析",
        "parentCode": "gp"
    },
    {
        "code": "ggfx",
        "name": "个股分析",
        "parentCode": "gp"
    },
    {
        "code": "bkrd",
        "name": "板块热点",
        "parentCode": "gp"
    },
    {
        "code": "zldt",
        "name": "主力动态",
        "parentCode": "gp"
    },
    {
        "code": "hyyj",
        "name": "行业研究",
        "parentCode": "gp"
    },
    {
        "code": "hwgs",
        "name": "海外股市",
        "parentCode": "gp"
    },
    {
        "code": "cyb",
        "name": "创业板",
        "parentCode": "gp"
    },
    {
        "code": "xsb",
        "name": "新三板",
        "parentCode": "gp"
    },
    {
        "code": "ssgs",
        "name": "上市公司",
        "parentCode": "gp"
    },
    {
        "code": "mgyw",
        "name": "美股要闻",
        "parentCode": "gp"
    },
    {
        "code": "zggng",
        "name": "中国概念股",
        "parentCode": "gp"
    },
    {
        "code": "mgxt",
        "name": "美股学堂",
        "parentCode": "gp"
    },
    {
        "code": "ggyw",
        "name": "港股要闻",
        "parentCode": "gp"
    },
    {
        "code": "gsxw",
        "name": "公司新闻",
        "parentCode": "gp"
    },
    {
        "code": "yjfx",
        "name": "研究分析",
        "parentCode": "gp"
    },
    {
        "code": "ggxt",
        "name": "港股学堂",
        "parentCode": "gp"
    },
    {
        "code": "gmxx",
        "name": "股民学校",
        "parentCode": "gp"
    },
    {
        "code": "whyw",
        "name": "外汇要闻",
        "parentCode": "wh"
    },
    {
        "code": "whyw",
        "name": "外汇动态",
        "parentCode": "wh"
    },
    {
        "code": "dhgd",
        "name": "大行观点",
        "parentCode": "wh"
    },
    {
        "code": "whhq",
        "name": "外汇行情",
        "parentCode": "wh"
    },
    {
        "code": "whjy",
        "name": "外汇交易",
        "parentCode": "wh"
    },
    {
        "code": `${year}-${month}`,
        "name": "运营月报",
        "parentCode": "yuebao"
    },
    {
        "code": "whpj",
        "name": "外汇牌价",
        "parentCode": "wh"
    },
    {
        "code": "qqrl",
        "name": "全球日历",
        "parentCode": "wh"
    },
    {
        "code": "jjgd",
        "name": "基金观点",
        "parentCode": "jj"
    }
]