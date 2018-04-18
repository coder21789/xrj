'use strict';

export async function getListTmpModuleEvent(_this, option) { 
  await _this.proxy({
      event: 'wap:post:wap-news-api/event/list?code=dashijian'
  });
  let eventList = (
      typeof(_this.backData.event) == "object" && _this.backData.event.resultBody ?
          _this.backData.event.resultBody : '');
  return  eventList;
};

export async function getListTmpModuleAtlas(_this, option) { 
  await _this.proxy({
      atlas: 'wap:post:wap-news-api/atlas/list?catCode=tj&pagePerNum=10&pageStart=1'
  });
  let atlasList = (
      typeof(_this.backData.atlas) == "object" && _this.backData.atlas.resultBody ?
          _this.backData.atlas.resultBody : '');
  return  atlasList;
};

export async function getListTmpModuleTopic(_this, option) { 
  await _this.proxy({
      topic: 'wap:post:wap-news-api/topic/list?catCode=ht&pagePerNum=10&pageStart=1'
  });
  let topicList = (
      typeof(_this.backData.topic) == "object" && _this.backData.topic.resultBody ?
          _this.backData.topic.resultBody : '');
  return  topicList;
};