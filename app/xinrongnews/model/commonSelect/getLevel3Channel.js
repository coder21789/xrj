/*获取子类页的code*/
'use strict';
let moment = require('moment');
export async function getLevel3(id,_this) { 
    let news = _this.mysql('news');
    let category  = _this.mysql('category');
    let getChannel = await _this.findAllMap([
      {
        model: category,
        arg: {
            //order: "id DESC",
            attributes: ['name','code','id'],
            where: {
                parent_id: id,
                deleted: 0
            }
        }
      }
    ]);
    getChannel = await _this.resultMap(getChannel);
    getChannel = getChannel[0];

    let getNews = [];

    for(let i=0 ; i < getChannel.length; i++){
      getNews.push({
          model: news,
          arg: {
            order: "id DESC",
            attributes: ['news_url','subject','publish_time','id','category_id'], 
            where: {
              category_id: getChannel[i].id,
              status: 1
            },
            limit: getChannel.length == 10 ? 15 : getChannel.length - 10 + 15
          }
      });
    }

  getNews = await _this.findAllMap(getNews);
  getNews = await _this.resultMap(getNews);
  console.log(getChannel);

  return {
      nav: getChannel,
      news: getArr(getNews,getChannel)
  }
}

function getArr(obj,getChannel){
  let newsList = [];
  obj.forEach(function(opt) {
    if(Object.prototype.toString.call(opt) === '[object Array]' && opt[0].category_id) {
        let map = []; 
        opt.forEach(function(value,key) {
          if (value.publish_time) value.time = moment(value.publish_time).format('YYYY-MM-DD HH:mm');
          map.push(value);
        });
        opt = map;  
        for(let i= 0; i < getChannel.length; i++){
            if(getChannel[i].id == opt[0].category_id){
                newsList.push(opt);
                break;
            }
        } 
      }
  });
  
  return newsList;//.sort(compare('category_id'));
};
