/**
 *
 * 话题模块
 * @controller index detail
 *
 */

'use strict';

import head from '../meta/index';
import nav from '../meta/nav';
const {resultMapTable,resultMapNormal} = require('../setDateFormat').default;
let oAuth = require('./oAuth');
let getFirstDegree = require('../model/commonSelect/getFirstDegree');

exports.index = function * () {
    const {code, pageStart, pagePerNum} = this.query;
    const news = this.mysql('news');
    const category = this.mysql('category');
    const topic = this.mysql('topic');
    let oauth = yield oAuth.state(this);

    topic.belongsTo(news, {foreignKey: 'news_id'});
    news.hasMany(topic, {foreignKey: 'news_id'});

    const recommendNavigartion = require('../meta/recommendNavSql');
    const recommendNavigartionList = yield recommendNavigartion.recommendNavigartion(this);
    let first_degree = yield getFirstDegree.getCode(this);

    const topicList = yield this.findAllMap([{
        model: news,
        arg: {
            order: 'id DESC',
            limit: ~~pagePerNum,
            offset: pagePerNum * (~~pageStart - 1),
            include: [{ model: topic, attributes: ['id']}],
            attributes: ['news_url','subject','publish_time','thumbnail_url'],
            where: {news_type: 4, status: 1}
            
        }
    }, {
        model: category,
        arg: {
            attributes: ['title','keywords','description'],
            where: {code: code}
        }
    }]);
    const topicListResult = yield resultMapTable(topicList, 'topics', true);

    const topicTotal = yield news.findAndCountAll({where: {news_type: 4, status: 1}});
    const pageInfo = {
        count: topicTotal.count,
        start: pageStart,
        page: Math.ceil(topicTotal.count / pagePerNum)
    };

    yield this.render('ht/index', {
        oauth: oauth.encrypted,
        base: head[code],
        code: code,
        first_degree: first_degree,
        topNavBar: nav['index'],
        recommended_nav: recommendNavigartionList,
        topic: topicListResult[0],
        meta: topicListResult[1][0],
        page: pageInfo,
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};

exports.detail = function * () {
    const {code, newsId} = this.query;
    const news = this.mysql('news');
    const category = this.mysql('category');
    const topic = this.mysql('topic');
    const recommend = this.mysql('recommend');
    let oauth = yield oAuth.state(this);

    topic.belongsTo(news, {foreignKey: 'rel_news_id'});
    news.hasMany(topic, {foreignKey: 'news_id'});

    const recommendNavigartion = require('../meta/recommendNavSql');
    const recommendNavigartionList = yield recommendNavigartion.recommendNavigartion(this);
    let first_degree = yield getFirstDegree.getCode(this);

    const detailList = yield this.findAllMap([{
        model: news,
        arg: {
            attributes: ['subject','video_url','summary'],
            where: {news_type: 4, status: 1, id: newsId}
        }
        }, {
            model: topic,
            arg: {
                attributes: ['news_url','news_recommend_subject','pic_url_list'],
                where: {news_id: newsId},
                include: [{ model: news,attributes: ['news_source','publish_time','summary']}]
            }
        }, {
            model: news,
            arg: {
                order: 'id DESC',
                limit: 4,
                attributes: ['news_url','subject','publish_time','thumbnail_url'],
                where: {news_type: 4, status: 1},
                include: [{ model: topic,attributes: ['id']}]
            }
        }, {
            model: recommend,
            arg: {
                limit: 10,
                order: [['recommend_code', 'DESC'], ['recommend_name']],
                attributes: ['news_url','news_recommend_subject'],
                where: {category_code: 'index', state: '1', recommend_code: {$like: 'web_sy_tjxbt_%'}}
            }
        }, {
            model: recommend,
            arg: {
                limit: 8,
                attributes: ['news_url','news_recommend_subject'],
                where: {category_code: 'cj', state: '1'}
            }
    }]);
    const detailListResult = yield resultMapTable(detailList, 'news', false);
    const detailHotResult = yield resultMapTable([detailList[2]], 'topics', true);
    const suggestForYou = yield resultMapNormal(detailList.slice(3, 4));

    yield this.render('ht/detail', {
        oauth: oauth.encrypted,
        base: head[code],
        code: code,
        recommended_nav: recommendNavigartionList,
        topNavBar: nav['index'],
        first_degree: first_degree,
        banner: detailListResult[0][0],
        list: detailListResult[1],
        hot: detailHotResult[0],
        suggestForYou: suggestForYou[0],
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};