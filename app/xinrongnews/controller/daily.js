/**
 *
 * 每日模块
 * @controller news search
 *
 */

'use strict';
let oAuth = require('./oAuth');

exports.news = function* () {
    const news = this.mysql('news');
    const category = this.mysql('category');
    let {resultMapNormal} = require('../setDateFormat').default;
    let oauth = yield oAuth.state(this);

    const channelCode = [
        {code: 'cj', name: '财经', enName: 'Financial news'},
        {code: 'gp', name: '股票', enName: 'Stock news'},
        {code: 'qq', name: '全球', enName: 'Global News'},
        {code: 'jj', name: '基金', enName: 'Fund News'},
        {code: 'yy', name: '原油', enName: 'Crude news'},
        {code: 'wh', name: '外汇', enName: 'Forex news'},
        {code: 'lc', name: '理财', enName: 'Financial news'},
        {code: 'qh', name: '期货', enName: 'Futures news'},
        {code: 'bx', name: '保险', enName: 'Insurance News'},
        {code: 'zc', name: '众筹', enName: 'Crowdfunding Journalism'},
        {code: 'hj', name: '黄金', enName: 'Gold News'},
        {code: 'zj', name: '专家', enName: 'Expert opinion'}
    ];

    const channelList = yield this.findAllMap([
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[0].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[1].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[2].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[3].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[4].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[5].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[6].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[7].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[8].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[9].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[10].code, status: 1}}},
        {model: news, arg: {order: 'publish_time DESC', limit: 20, where: {p_catCode: channelCode[11].code, status: 1}}},
        {model: category, arg: {where: {code: 'meirixinwen'}}}
    ]);

    const channelResult = yield resultMapNormal(channelList);

    yield this.render('daily/news', {
        oauth: oauth.encrypted,
        base: {pageInfo: {
            level: 2.5,
            name: '每日新闻',
            crumbs: {parent: {name: '每日新闻', code: 'meirixinwen'}}
        }},
        channelCode: channelCode,
        channelResult: channelResult.slice(0,12),
        meta: channelResult[12][0],
        code: 'dailyNews',
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};

exports.search = function* () {
    const category = this.mysql('category');
    const vocabulary = this.mysql('word');
    let oauth = yield oAuth.state(this);

    const searchList = yield this.findAllMap([
        {model: category, arg: {where: {code: 'word'}}}
    ]);
    const searchResult = yield this.resultMap(searchList);

    const searchTotal = yield vocabulary.count({where: {word_type: 1, deleted: 0}});
    const {pageStart, pagePerNum} = this.query;
    let pageCount = Math.ceil(searchTotal / pagePerNum);
    const page = {
        total: searchTotal,
        start: pageStart,
        count: pageCount > 50 ? 50 : pageCount
    };
    // console.log(page);
    const wordList = yield this.findAllMap([{
        model: vocabulary,
        arg: {
            order: 'creation_time DESC',
            limit: ~~pagePerNum,
            offset: ~~pagePerNum*(~~pageStart-1),
            attributes: ['id', 'name'],
            where: {word_type: 1, deleted: 0}
    }}]);
    const wordListResult = yield this.resultMap(wordList);
    // console.log(wordListResult);
    yield this.render('daily/search', {
        oauth: oauth.encrypted,
        base: {pageInfo: {
            level: 2.5,
            name: '每日热搜',
            crumbs: {parent: {name: '每日热搜', code: 'word'}}
        }},
        page: page,
        meta: searchResult[0][0],
        word: wordListResult[0],
        code: 'dailySearch',
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};

exports.original = function* () {
    const category = this.mysql('category');
    const news = this.mysql('news');
    let {resultMapNormal} = require('../setDateFormat').default;
    let oauth = yield oAuth.state(this);

    const metaList = yield this.findAllMap([
        {model: category, arg: {where: {code: 'yuanchuang'}}}
    ]);
    const metaResult = yield this.resultMap(metaList);

    const originalTotal = yield news.count({where: {news_type: 1, status: 1}});
    const {pageStart, pagePerNum} = this.query;
    let pageCount = Math.ceil(originalTotal / pagePerNum);
    const page = {
        total: originalTotal,
        start: pageStart,
        count: pageCount > 50 ? 50 : pageCount
    };
    // console.log(pagePerNum, page);
    const channelList = yield this.findAllMap([{
        model: news,
        arg: {
            order: 'publish_time DESC',
            limit: ~~pagePerNum,
            offset: ~~pagePerNum*(~~pageStart-1),
            attributes: ['id', 'news_url', 'subject', 'publish_time'],
            where: {news_type: 1, status: 1}
    }}]);
    const channelResult = yield resultMapNormal(channelList);
    // console.log(channelResult[0]);
    yield this.render('daily/original', {
        oauth: oauth.encrypted,
        base: {pageInfo: {
            level: 2.5,
            name: '原创综合',
            crumbs: {parent: {name: '原创综合', code: 'original'}}
        }},
        meta: metaResult[0][0],
        page: page,
        channelResult: channelResult[0],
        pageHalf: Math.ceil(pagePerNum / 2),
        code: 'dailyOriginal',
        x_real_requesturi: `${this.host}${this.header['x-real-requesturi']}`
    });
};
