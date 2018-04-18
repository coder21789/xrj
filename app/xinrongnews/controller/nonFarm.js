/**
 * 非农模块
 * 新增非农数据展示
 * @date 2017.10.27
 */ 

'use strict';
import moment from 'moment';
let oAuth = require('./oAuth');

exports.index = function* () {
    const category = this.mysql('category');
    const recommend =this.mysql('recommend');
    const news =this.mysql('news');
    let {resultMapNormal} = require('../setDateFormat').default;
    let oauth = yield oAuth.state(this);

    // meta信息、获取非农常识category_id以查询三级频道非农常识新闻
    const metaList = yield this.findAllMap([
        {model: category, arg: {where: {code: 'jjfn'}}},
        {model: category, arg: {where: {code: 'fncs'}}}
    ]);
    const metaResult = yield this.resultMap(metaList);

    // 查询推荐位新闻
    const recommendList = yield this.findAllMap([
        {
            model: recommend,
            arg: {
                order: 'recommend_code ASC',
                attributes: ['news_recommend_subject', 'news_url', 'news_pic', 'recommend_code'],
                where: {
                    recommend_code: {$like: 'web_jjfn_jdfn_%'},
                    state: 1
                }
            }
        },
        {
            model: news,
            arg: {
                order: 'publish_time DESC',
                limit: 10,
                attributes: ['subject', 'news_url', 'category_id'],
                where: {
                    category_id: metaResult[1][0].id,
                    status: 1
                }
            }
        }
    ]);
    const recommendResult = yield this.resultMap(recommendList);

    // 查询非农数据
    const nonFarmList = yield this.setQueryListMap([
        {sqlQuery: `SELECT DATE_FORMAT(report_date, '%Y年%m月') AS report_time, former_value, forcast_value, real_value FROM NONE_FARM_REPORT ORDER BY report_date DESC`},
        {sqlQuery: `SELECT COUNT(*) AS count FROM NONE_FARM_REPORT`},
        {sqlQuery: `SELECT DATE_FORMAT(report_date, '%Y') AS report_time_year, DATE_FORMAT(report_date, '%m') AS report_time_month FROM NONE_FARM_REPORT ORDER BY report_date DESC`}
    ]);

    const REPORT_TIME_YEAR = Number(nonFarmList[2][0].report_time_year);
    const REPORT_TIME_MONTH = Number(nonFarmList[2][0].report_time_month);
    let reportYear = REPORT_TIME_MONTH + 1 > 12 ? REPORT_TIME_YEAR + 1 : REPORT_TIME_YEAR;
    let reportMonth = REPORT_TIME_MONTH + 1 > 12 ? 1 : REPORT_TIME_MONTH + 1;
    let reportTime = (reportMonth > 3 && reportMonth < 11) ? '21:00' : '22:00';
    const reportRange = new Date(`${reportYear}/${reportMonth}/01 12:00`);
    let reportRangeDay = reportRange.getDay();
    let reportRangeFinal;
    if (reportRangeDay < 5) {
        reportRangeFinal = moment(reportRange).add('days', 5 - reportRangeDay).format('DD');
    } else if (reportRangeDay === 5) {
        reportRangeFinal = moment(reportRange).format('DD');
    } else if (reportRangeDay === 6) {
        reportRangeFinal = moment(reportRange).add('days', 6).format('DD');
    } else if (reportRangeDay === 0) {
        reportRangeFinal = moment(reportRange).add('days', 5).format('DD');
    }
    const nextPublishTime = `${reportYear}/${reportMonth}/${reportRangeFinal} ${reportTime}`;

    yield this.render('nonFarm/index', {
        oauth: oauth.encrypted,
        base: {pageInfo: {
            level: 2.5,
            name: '聚焦非农',
            crumbs: {parent: {name: '聚焦非农', code: 'nonFarm'}}
        }},
        meta: metaResult[0][0],
        code: 'nonFarm',
        nonFarmList: nonFarmList[0],
        initNonFarmList: JSON.stringify(nonFarmList[0]),
        nonFarmListPage: Math.ceil(nonFarmList[1][0].count / 10) - 1,
        recommendJdfn: recommendResult[0],
        recommendFncs: recommendResult[1],
        nextPublishTime: nextPublishTime,
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};