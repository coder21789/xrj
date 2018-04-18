'use strict';

// model名称，即表名
exports.model = 'sys_user';

// 表结构
exports.schema = [{
  _id: Number,  
  name: String,
  mobile: String,
  sex: Boolean,
  age: Number,
  qq: String,
  email: String,
  headImgUrl: String,
  description: String,
  nickName: String
}];

// 静态方法:http://mongoosejs.com/docs/guide.html#statics
exports.statics = {}

// http://mongoosejs.com/docs/guide.html#methods
exports.methods = {
  list: function*() {
    return this.model('sys_user').find();
  }
}

