/*获取列表页模块获取*/
'use strict';

exports.methods = {
    //证券公司
    getSecurity: async function(_this) {
        await _this.proxy({
            company: 'xinrongnews:post:news-api/m/orgEntryService?method=findOrgEntryListByWeb&pageNo=1&pageSize=4'},
            {
              headers: {
                'api-version':'1.7.0'
              }
            })
        let security = (
            typeof(_this.backData.company) == "object" && _this.backData.company.resultBody && _this.backData.company.resultBody.orgList ?
            _this.backData.company.resultBody.orgList : '');
        return  security;
    },
    //获取条专家
    getExpert: async function (_this){
        let getExpert = require('./getExpert');
        getExpert = await getExpert.news(_this,3);
        return  getExpert;
    },
    //专家问答
    getExpertAnswerList: async function (_this){
        const getExpertList = require('./getExpertList');
        let expertAnswerList = await getExpertList.getExpertList(_this);
       // console.log(expertAnswerList);
       var opt = {
            expertAnswerList : expertAnswerList.result,
            expertListStr: JSON.stringify(expertAnswerList.result)
        };
        return  opt;
    },
    //今天要闻，为您推荐
    getRecommendNews: async function (_this){
        let getRecommend = require('./getRecommend');
        let {getRecommendNews} = await getRecommend.news(_this);
        return {
            todayNews: getRecommendNews[0],
            suggestForYou: getRecommendNews[1]
        }
    },
    //精彩回答
    getAnswerList: async function (_this){
        const getAnswerList = require('./getAnswerList');
        let answerList = await getAnswerList.getAnswerList(_this,{status: 2,pageSize: 2});
        return  answerList.result;
    },
    //股市要闻 股民学校
    getGpNews: async function (_this){
        let category  = _this.mysql('category');
            //获取股民学校的ID
        let getMenu = await _this.findAllMap([
            {
                model: category,
                //文章详情信息
                arg: {where: {name: '股民学校'}}
            }
        ]);

        getMenu = await _this.resultMap(getMenu);

        //股市要闻
        let getNew = require('./getNews');
        let {getNews,links,getNewsArr} = await getNew.news(_this,getMenu[0][0].id);

        //股民学校
        let getPeopleSchool = await _this.findAllMap([getNewsArr[0]]);
            getPeopleSchool = await _this.resultMap(getPeopleSchool);
            getPeopleSchool = getPeopleSchool[0];

        return{
            gsywList: getNews,
            links: links,
            gmxx: Object.prototype.toString.call(getPeopleSchool)=='[object Array]'? getPeopleSchool.slice(0,10): getPeopleSchool
        }
    }
}