/*获取频道页的code*/
'use strict';

export async function getNews(_this) { 
    let news = _this.mysql('news');
    let bilingual = _this.mysql('bilingual');
    bilingual.belongsTo(news, {foreignKey: 'news_id'});
    news.hasMany(bilingual, {foreignKey: 'news_id'});

    /*获取频道页的关键字，描述，标题和ID*/
    let getNews = await _this.findAllMap([{
        model: news,
        arg: {
            order: "id DESC",
            attributes: ['news_url','subject','category_id','thumbnail_url'],
            limit: 3, 
            include: { model: bilingual, attributes: ['bili_subject']},
            where: {catCode: 'mryl',status: 1}
        }
    },{
        model: news,
        arg: {
            order: "id DESC",
            attributes: ['news_url','subject','category_id','thumbnail_url','region'],
            limit: 5, 
            where: {catCode: 'yyj',status: 1}
        }
    }]);

    getNews = await _this.resultMap(getNews);

    return {
      englishCorner: getNews[1],
      dayChat: getLinkedData(getNews[0])
    } 
}

function getLinkedData(opt){
  opt.forEach(function(value, key) {
    if(Object.prototype.toString.call(value.bilinguals) === '[object Array]'){
      value.bilinguals.forEach(function(obj, key) {
        value.bili_subject = obj.dataValues.bili_subject;
      });
    }
  })

  return opt;
}