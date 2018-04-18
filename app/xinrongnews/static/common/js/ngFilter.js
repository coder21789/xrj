/**
 * Filter 公共依赖过滤器注入
 *
 * @file ngFilter.js
 * @Date 2016.8.22
 */

angular.module('cjhFilter', [], function($filterProvider, $provide) {
        $filterProvider.register('toFixed2', function() { //股票排行小数2位
            return function(val) {

                    return val.substring(0, val.length-1);
            };
        });

        $filterProvider.register('decimals', function() { //小数2位
            return function(val) {
                if(/\d{1,}\.\d{2}$/g.test(val)){
                    return val;
                }else{
                    return val+'0';
                }
            };
        });

        $filterProvider.register('decimals2', function() { //小数2位
            return function(val) {
                var v = val.substring(0, val.length-1),
                ids = v.indexOf('.');
                return v.substring(0, ids+3)+'%';
            };
        });

       $filterProvider.register('decimals3', function() { //小数2位
            return function(v) {
                var ids = v.indexOf('.');
                return v.substring(0, ids+3);
            };
        });

        $filterProvider.register('filterLift', function() { //金融数据升降序过滤
            return function(val) {
                if(/-/g.test(val)){
                    return 'down';
                }else{
                    return 'up';
                }
            };
        });

        $filterProvider.register('filterLift', function() { //金融数据升降序过滤
            return function(val) {
                if(/-/g.test(val)){
                    return 'down';
                }else{
                    return 'up';
                }
            };
        });

        $filterProvider.register('filterOdd', function() { //数据报表单双行
            return function(val) {
                if(val){
                    return 'odd';
                }else{
                    return '';
                }
            };
        });

        $filterProvider.register('filterUp', function() { //金融数据升降序过滤指标
            return function(val) {
                if(/-/g.test(val)){
                    return 'iconfont icon-xiangxia';
                }else{
                    return 'iconfont icon-xiangshang';
                }
            };
        });

        $filterProvider.register('filterRank', function() { //排行频道标签过滤
            return function(val) {
                if(val>2){
                    return 'rank_default';
                }else{
                    return '';
                }
            };
        });

        $filterProvider.register('filterRankTag', function() { //排行频道内容过滤
            return function(val) {
                if(val>8){
                    return 'rank_tag';
                }else{
                    return '';
                }
            };
        });

        $filterProvider.register('filterFormatDate', function() { //Echart日期格式过滤避免bug
            return function(ARRAY, name) {
                var _arr = [];
                angular.forEach(ARRAY, function(item, index){
                    if (name == 'date') {
                        var _item = item[name].replace(/-/g, '.');
                        _arr.push(_item);
                    } else {
                        _arr.push(item[name]);
                    }
                });
                return _arr;
            };
        });

        $filterProvider.register('filterDate', function() { //直播日期过滤
            return function(val) {
                if(val){
                    return 'pick';
                }else{
                    return '';
                }
            };
        });

        $filterProvider.register('filterAutofresh', function() { //直播自动刷新过滤
            return function(val) {
                if(val){
                    return 'auto';
                }else{
                    return '';
                }
            };
        });

        $filterProvider.register('timeFormat',function(){
            return value.creationDate.substring(0, 11);
        });

        $filterProvider.register('arrow2',function(){
            return function(value){
                if(/-/g.test(value)){
                    return "iconfont icon-xiasanjiaoxing-copy-copy-copy";
                }else{
                    return "iconfont icon-xiasanjiaoxing-copy-copy";
                }
            }
        });

        $filterProvider.register('arrow',function(){
            return function(value){
                if(/-/g.test(value)){
                    return "iconfont icon-xiangxia";
                }else{
                    return "iconfont icon-xiangshang";
                }
            }
        });

        $filterProvider.register('stockName',function(){
            return function(value){
                var str ;
                if(/中国/g.test(value) || /香港/g.test(value)){
                    str = value.substring(2, value.length);
                }else if(/指数/g.test(value)){
                    str = value.substring(0, value.length-2);
                }else{
                    str = value;
                }
                return str;
            }
        });

        $filterProvider.register('isUp',function(){
            return function(value){
                if(/-/g.test(value.range || value.changepercent || value)){
                    return "green";
                }else{
                    return "red";
                }
            }
        });

        $filterProvider.register('rateName',function(){
            return function(value){
                var str = value;
                return str.substring(0, 2) + '/' + str.substring(2, str.length);
            }
        });

        $filterProvider.register('plus', function () {
            return function(value){
                if(/-/g.test(value)){
                    return value
                }else{
                    return '+' + value;
                }
            }
        });

        $filterProvider.register('percent', function() {
            return function(value){
                var v = value.substring(0, value.length-1);
               if(/-/g.test(value)){
                    return v + '%';
                }else{
                    return '+' + v + '%';
                }
            }
        });

        $filterProvider.register('percent3', function() {
            return function(value){
               if(/--/g.test(value)){
                    return value;
                }else{
                    return  value + '%';
                }
            }
        });

        $filterProvider.register('percent2', function() {
            return function(value){
               if(/-/g.test(value)){
                    return value.substring(1, value.length);
                }else{
                    return value;
                }
            }
        });

        $filterProvider.register('futuresNA', function() { //期货NA类型数据过滤
            return function(value){
               if(value==='NA'){
                    return value.replace('NA', '--');
                }else{
                    return value;
                }
            }
        });

        $filterProvider.register('bondStyle', function() { //债券银行间拆放利率颜色
            return function(value){
               if(value==='Agreen'){
                    return 'down';
                }else{
                    return 'up';
                }
            }
        });

        $filterProvider.register('bondArrow', function() { //债券银行间拆放利率升降
            return function(value){
               if(value==='Agreen'){
                    return 'iconfont icon-xiangxia';
                }else{
                    return 'iconfont icon-xiangshang';
                }
            }
        });

        $filterProvider.register('filterTurnover', function() { //黄金成交额
            return function(val) {
                var num = (val/10000).toFixed(2);
                return num;
            };
        });

        $filterProvider.register('importanceFilter', function() { //直播日历重要性过滤
            return function(val) {
                if (val>=3) {
                    return 'hot';
                }
            };
        });

        $filterProvider.register('publishValTagFilter', function() { //直播日历公布值图标过滤
            return function(val) {
                if (val==='--'||val==='待公布') {
                    return 'search_tag';
                }
            };
        });

        $filterProvider.register('publishValFilter', function() { //直播日历公布值文字过滤
            return function(val) {
                if (val==='--'||val==='待公布') {
                    return '侦查中';
                } else {
                    return val;
                }
            };
        });

        $filterProvider.register('liveDateFilter', function() { //直播日历时间戳过滤
            return function(val) {
                var date = val.slice(-5);
                return date;
            };
        });

        $filterProvider.register('importanceLevelFilter', function() { //直播日历重要性过滤
            return function(val) {
                if (val==='1') {
                    return 'level1';
                } else if (val==='2') {
                    return 'level2';
                } else if (val==='3') {
                    return 'level3';
                }
            };
        });

        $filterProvider.register('publishLoadFilter', function() { //直播日历公布值图标过滤
            return function(val) {
                if (val==='--'||val==='待公布') {
                    return true;
                }
            };
        });

        $filterProvider.register('importanceTagFilter', function() { //直播日历重要性标签过滤
            return function(val) {
                if (val==='1') {
                    return '低';
                } else if (val==='2') {
                    return '中';
                } else if (val==='3') {
                    return '高';
                }
            };
        });

        $filterProvider.register('todayFormatFilter', function() { //全球日历日期过滤
            return function(val) {
                switch (val) {
                  case "Sunday":
                    return '星期日';
                    break;
                  case "Monday":
                    return '星期一';
                    break;
                  case "Tuesday":
                    return '星期二';
                    break;
                  case "Wednesday":
                    return '星期三';
                    break;
                  case "Thursday":
                    return '星期四';
                    break;
                  case "Friday":
                    return '星期五';
                    break;
                  case "Saturday":
                    return '星期六';
                    break;
                  default:
                    console.log("今天");
                };
            };
        });

        $filterProvider.register('codeNumFilter', function() { //广告CODE过滤
            return function(val) {
                var code = val.slice(-3);
                return code;
            };
        });

        $filterProvider.register('filterLiftPlus', function() { //外汇金融数据升降序符号
            return function(val) {
                if(/-/g.test(val)){
                    return val;
                }else{
                    return '+' + val;
                }
            };
        });

        $filterProvider.register('eventModel', function() { //大事件评论模式评论
            return function(v) {
                if(v){
                    return 'event_text_submit';
                }else{
                    return '';
                }
            };
        });
    });