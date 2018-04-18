/**
 *
 * 大事件模块
 * @controller list detail
 */

'use strict';

import nav from '../meta/nav';
let {resultMapCollection} = require('../setDateFormat').default;
let oAuth = require('./oAuth');

exports.list = function* () {
    const {code, pageStart, pagePerNum} = this.query;
    const category  = this.mysql('category');
    const news = this.mysql('news');
    const event = this.mysql('event');
    const user = this.mysql('user');
    let oauth = yield oAuth.state(this);

    // 外键设置
    event.belongsTo(news, {foreignKey: 'rel_news_id'});
    news.hasMany(event, {foreignKey: 'rel_news_id'});
    news.belongsTo(user, {foreignKey: 'publish_author_id'});

    // 推荐导航区信息
    const recommendNavigartion = require('../meta/recommendNavSql');
    const recommendNavigartionList = yield recommendNavigartion.recommendNavigartion(this);

    // meta信息
    let getCode = yield this.findAllMap([{
        model: category,
        arg: {attributes: ['title', 'keywords', 'description', 'id', 'parent_id', 'name'], where: {code: code}}}
    ]);
    getCode = yield this.resultMap(getCode);
    getCode = getCode[0][0];

    // 面包屑及导航条信息
    let getMenu = yield this.findAllMap([{
        model: category,
        arg: {attributes: ['name', 'code', 'id'], where: {parent_id: getCode.parent_id}}
    },{
        model: category,
        arg: {attributes: ['name', 'code', 'id'], where: {id: getCode.parent_id}}
    }]);
    getMenu = yield this.resultMap(getMenu);
    const channelCode = getMenu[1][0];
    const menuList = getMenu[0];

    // 大事件SQL
    let newsMap = yield this.setQueryListMap([{
        sqlQuery: `SELECT count(*) AS count
        FROM NEWS as news
        WHERE news.news_type = 5
        AND news.status = 1`
    }]);

    // 分页信息
    const page = yield {
        count: newsMap[0][0].count,
        start: pageStart,
        all: Math.ceil(newsMap[0][0].count/pagePerNum)
    };

    // 大事件新闻列表
    const newsCollectionList = yield this.findAllMap([{
        model: news,
        arg: {
            order: 'publish_time DESC',
            limit: ~~pagePerNum,
            offset: pagePerNum*(~~pageStart-1),
            include: [{model: event, attributes: ['rel_news_id', 'news_recommend_subject', 'news_event_tag', 'news_url', 'publish_time', 'location_code', 'id'], where: {location_code: {$like: 'web_cjdsj_template_%_lb'}, state: 1}, order: 'id ASC'},
            {model: user, attributes: ['name']}],
            attributes: ['news_url', 'subject', 'publish_time', 'thumbnail_url', 'publish_author_id', 'region', 'id'],
            where: {news_type: 5, status: 1}
    }}]);
    const newsCollection = yield resultMapCollection(newsCollectionList, 'user', 'events');

    const getNavFun = require('../model/commonSelect/getNav');
    let {getCjCode, getCjRecommend} = yield getNavFun.getCjNav(code,this);

    yield this.render('event/list', {
        oauth: oauth.encrypted,
        base: {
            pageInfo: {
                level: 3,
                name: channelCode.name,
                crumbs: {parent: {name: channelCode.name, code: channelCode.code}, child: {name: getCode.name, code: code}}
        }},
        code: channelCode.code,
        thisCode: code,
        last_degree: menuList,
        meta: getCode,
        topNavBar: nav['index'],
        page: page,
        recommended_nav: recommendNavigartionList,
        news: newsCollection[0],
        getCjCode: getCjCode,
        getCjRecommend: getCjRecommend,
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};

exports.detail = function* () {
    const {code, id} = this.query;
    const news = this.mysql('news');
    const category  = this.mysql('category');
    const event = this.mysql('event');
    const user = this.mysql('user');
    const topic = this.mysql('topic');
    const newsApp = this.mysql('newsApp');
    const reviewViewpoint = this.mysql('reviewViewpoint');
    let oauth = yield oAuth.state(this);

    // 外键设置
    news.belongsTo(user, {foreignKey: 'publish_author_id'});
    topic.belongsTo(news, {foreignKey: 'rel_news_id'});
    news.hasMany(topic, {foreignKey: 'news_id'});

    // 大事件模板id判断
    const newsDetailList = yield this.findAllMap([{
        model: news,
        arg: {
            attributes: ['content_template_id', 'subject', 'news_keywords', 'summary', 'news_url'],
            where: {id: id}
    }}, {
        model: category,
        arg: {
            attributes: ['name', 'parent_id'],
            where: {code: code}
    }}, {
        model: newsApp,
        arg: {
            attributes: ['review_type'],
            where: {newsId: id}
    }}]);
    const newsDetail = yield this.resultMap(newsDetailList);
    const templateId = newsDetail[0][0].content_template_id;
    const parentId = newsDetail[1][0].parent_id;
    const reviewType = newsDetail[2][0] ? newsDetail[2][0].review_type : null;

    // 正反方数据
    if (reviewType === 2) {
       const reviewTypeList = yield this.findAllMap([{
            model: reviewViewpoint,
            arg: {
                attributes: ['id', 'type', 'content', 'show_num', 'real_num'],
                where: {news_id: id},
                order: 'type ASC'
        }}]);
        const reviewTypeListResult = yield this.resultMap(reviewTypeList);

        const squarePoint = reviewTypeListResult[0][0];
        const oppositionPoint = reviewTypeListResult[0][1];

        var viewpoint = {};
        viewpoint.squarePointNum = Number(squarePoint.show_num) + Number(squarePoint.real_num);
        viewpoint.oppositionPointNum = Number(oppositionPoint.show_num) + Number(oppositionPoint.real_num);
        viewpoint.total = viewpoint.squarePointNum + viewpoint.oppositionPointNum;
        viewpoint.squareRange = Math.round((viewpoint.squarePointNum / viewpoint.total) * 100);
        viewpoint.oppositionRange = Math.round((viewpoint.oppositionPointNum / viewpoint.total) * 100);
        viewpoint.squarePointContent = squarePoint.content;
        viewpoint.oppositionPointContent = oppositionPoint.content;
        viewpoint.squarePointId = squarePoint.id;
        viewpoint.oppositionPointId = oppositionPoint.id;
        viewpoint = JSON.stringify(viewpoint);
    }

    // 模板12 SQL
    if (templateId < 3) {
        const tmp1Or2List = yield this.findAllMap([{
            model: event,
            arg: {
                attributes: ['news_recommend_summary'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_summary'}, state: 1}
        }}, {
            model: event,
            arg: {
                attributes: [['pic_url', 'top_pic_url']],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_topImg'}, state: 1}
        }}, {
            model: event,
            arg: {
                attributes: ['video_url'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_topVideo'}, state: 1}
        }}, {
            model: event,
            arg: {
                order: 'event_time ASC',
                attributes: ['news_recommend_subject', 'news_recommend_summary', 'news_url', 'pic_url', 'event_time'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_sjz'}, state: 1}
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_url', 'pic_url'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_xgbd'}, state: 1}
        }}, {
            model: news,
            arg: {
                attributes: ['subject', 'publish_time', 'thumbnail_url', 'publish_author_id', 'region', 'id'],
                include: [{model: user, attributes: ['name']}],
                where: {id: id, news_type: 5, status: 1}
        }}]);
        var tmp1Or2 = yield resultMapCollection(tmp1Or2List, 'user');
        var tmpHeadCommon = {...tmp1Or2[0][0], ...tmp1Or2[1][0], ...tmp1Or2[2][0], ...tmp1Or2[5][0]} || 0,
            relatedNews = tmp1Or2[4],
            tmpSelfModel = tmp1Or2[3];
    }

    // 模板3 SQL
    if (templateId === 3) {
        const tmp3List = yield this.findAllMap([{
            model: event,
            arg: {
                attributes: [['pic_url', 'top_pic_url']],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_3_topImg', state: 1}
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_recommend_summary', 'pic_url', 'news_url'],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_3_dsjtt', state: 1}
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_url', 'pic_url'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_xgjd_%'}, state: 1},
                order: 'location_code ASC'
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_recommend_summary', 'pic_url', 'news_url'],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_3_zjxw', state: 1}
        }}, {
            model: news,
            arg: {
                attributes: ['subject', 'publish_time', 'thumbnail_url', 'publish_author_id', 'region', 'id'],
                include: [{model: user, attributes: ['name']}],
                where: {id: id, news_type: 5, status: 1}
        }}]);
        var tmp3 = yield resultMapCollection(tmp3List, 'user');
        var tmpHeadCommon = {...tmp3[0][0], ...tmp3[1][0], ...tmp3[4][0]} || 0,
            relatedNews = tmp3[2],
            tmpSelfModel = tmp3[3][0];
    }

    // 模板4 SQL
    if (templateId === 4) {
        const tmp4List = yield this.findAllMap([{
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_recommend_summary'],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_4_dsjbt', state: 1}
        }}, {
            model: event,
            arg: {
                attributes: [['news_recommend_subject', 'dsjtt_news_recommend_subject'], ['news_recommend_summary', 'dsjtt_news_recommend_summary'], 'news_url', 'pic_url'],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_4_dsjtt', state: 1}
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_subject', 'news_recommend_summary', 'news_url', 'pic_url'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_xgjd_%'}, state: 1},
                order: 'location_code ASC'
        }}, {
            model: event,
            arg: {
                attributes: ['news_recommend_summary'],
                where: {rel_news_id: id, location_code: 'web_cjdsj_template_4_zjxw', state: 1}
        }}, {
            model: news,
            arg: {
                order: 'id DESC',
                limit: 4,
                attributes: ['news_url','subject','publish_time','thumbnail_url'],
                where: {news_type: 4, status: 1},
                include: [{ model: topic,attributes: ['id']}]
        }}, {
            model: news,
            arg: {
                attributes: ['publish_time', 'publish_author_id', 'region', 'id'],
                include: [{model: user, attributes: ['name']}],
                where: {id: id, news_type: 5, status: 1}
        }}]);
        var tmp4 = yield resultMapCollection(tmp4List, 'user');
        var tmpHeadCommon = {...tmp4[0][0], ...tmp4[1][0], ...tmp4[5][0]} || 0,
            relatedNews = tmp4[2],
            tmpSelfModel = tmp4[3][0],
            hotMap = tmp4[4];
    }

    // 面包屑导航条数据
    const parentChannelList = yield this.findAllMap([{
        model: category,
        arg: {
            attributes: ['code', 'name'],
            where: {id: parentId}
    }}]);
    const parentChannel = yield this.resultMap(parentChannelList);

    yield this.render(`event/tmp${templateId}`, {
        oauth: oauth.encrypted,
        topNavBar: nav['index'],
        thisCode: code,
        base: {
            pageInfo: {
                level: 4,
                name: parentChannel[0][0].name,
                crumbs: {parent: {name: parentChannel[0][0].name, code: parentChannel[0][0].code}, child: {name: newsDetail[1][0].name, code: code}}
        }},
        news: newsDetail[0][0],
        templateId: templateId,
        timeLineSlider: tmp1Or2 ? tmp1Or2[3].length : 0,
        tmpHeadCommon: tmpHeadCommon,
        relatedNews: relatedNews,
        tmpSelfModel: tmpSelfModel,
        hotMap: tmp4 ? hotMap : 0,
        code: code,
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`,
        viewpoint: viewpoint
    });
};