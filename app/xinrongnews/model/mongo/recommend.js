'use strict';

// model名称，即表名
exports.model = 'web_recommend_news';

// 表结构
exports.schema = [{
  _id: Number,
  creationDate: String,
  rank: String,
  recommendCode : String,
  newsId : Number,
  publishTime: String,
  recommendName: String,
  categoryCode : String,
  subject: String,
  summary: {type: String, default: '' },
  url: String,
  picUrl: {type: String, default: '' },
  picDesc: {type: String, default: '' },
  newsVideo: {type: String, default: '' },
  recommendRank : String,
  state: String
}];

// 静态方法:http://mongoosejs.com/docs/guide.html#statics
exports.statics = {}

// http://mongoosejs.com/docs/guide.html#methods
exports.methods = {
  list: function*(obj) {
    return this.model('web_recommend_news').find(obj);
  }
}
