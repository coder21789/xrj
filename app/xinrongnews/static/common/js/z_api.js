var basePath = "http://spider.xinrongnews.com"; //正式 

//https 跳转到 http;
if(location.protocol  == "https:"){
    location.href = 'http://' + location.host + location.pathname;
}

var api = {
    /*友情链接*/
    /*基本汇率*/
    rate:  {
        url : '/finance-spider/exchange/rate/basic/qq',
        data: '',
        type: 'finance'
    },
    /*个股涨跌*/
    shareRank:  {
        url : '/finance-spider/share/rank',
        data: {
            asc: 2
        },
        type: 'finance'
    },
    /*推荐新闻*/
    recommend: {
        // url : '/service/searchDailyNews',
        url : '/news-api/searchDailyNews',
        data: {
            date: GetDateStr(0),
            catCode: 'index'
        },
        type: ''
    },
    /*直播*/
    live: {
        // url : '/service/live',
        url : '/news-api/live',
        data: {"pageSize":10,"catId":"4","lastNewsId":0,"fetchMore":false},
        type: ''
    },
    /*行情中心-全球,全球指数*/
    stock: {
        url : '/finance-spider/share/data/jrj/all',
        data: '',
        type: 'finance'
    },
    /*行情中心-交叉汇率*/
    cross: {
        url : '/finance-spider/exchange/rate/cross',
        data: '',
        type: 'finance'
    },
    /*行情中心-人民币牌价*/
    rmb: {
        url : '/finance-spider/exchange/rate/rmb/web',
        data: '',
        type: 'finance'
    },
    /*亚太,北美，欧洲*/
    stock_index:  {
        url : '/finance-spider/share/data/qq/',
        data: 'asia',//asia/ usa/eur
        type: 'finance'
    },
    /*基金榜*/
    fund:{
        url : '/finance-spider/fund/rank',
        data: {
            type: 0,
        },
        type: 'finance'
    },
    /*内外盘*/
    forward:{
        url : '/finance-spider/forward/data',
        data: {
            type: "shfe",
        },
        type: 'finance'
    },
    /*人民币牌价*/
    BankList: {
        url : '/finance-spider/exchange/rmb-price/',
        data:  "icbc",
        type: 'finance'
    },
    /*各国利率*/
    moneyRate: {
        url : '/finance-spider/exchange/bank-rate',
        data: '',
        type: 'finance'
    },
    /*外汇直播*/
    foreignExchange: {
        // url : '/service/liveWh',
        url : '/news-api/liveWh',
        data: {catId: 15},
        type: ''
    },
    /*热门文章*/
    hotArticles:  {
        // url : '/service/news/top',
        url : '/news-api/web/news/top',
        data: {
            catCode: getUrlRelativePath(),
            size: 10,
            dayNum: 1
        },
        type: 'service'
    },
    /*登录*/
    login: {
        url : '/news-api/m/loginService',
        data: {
            username: '',
            password: '',
            rememberMe: ''
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        apiVersion : '1.7.1',
        type: 'app'
    },
    /*手机验证码获取*/
    code: {
        url : '/news-api/user/sendSms',
        data: {
            phone: '',
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        type: 'app'
    },
    /*注册*/
    register: {
        url : '/news-api/user/register',
        data: {
            username: '',
            password: '',
            checkCode: ''
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        type: 'app'
    },
    /*绑定手机*/
    bindPhone: {
        url : '/news-api/web/user/phone/bind',
        data: {
            phone: '',
            password: '',
            checkCode: ''
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        type: 'app'
    },
    /*修改手机*/
    setPhone: {
        url : '/news-api/web/user/phone/change',
        data: {
            oldPhone: '',
            newPhone: '',
            password: '',
            checkCode: ''
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        type: 'app'
    },
    /*忘记密码*/
    setPassword: {
        url : '/news-api/user/updatePassword',
        data: {
            username: '',
            password: '',
            checkCode: ''
        },
        contentType : 'application/x-www-form-urlencoded;charset=utf-8',
        type: 'app'
    },
    /*登出*/
    logout:{
        url : '/news-api/user/logout',
        data: '',
        type: ''
    },
    /*机构关注最高个股*/
    concernStock:{
        url : '/finance-spider/share/agencyconcern/stock',
        data: '',
        type: 'finance'
    },
    /*机构关注最高行业*/
    concernTrade:{
            url : '/finance-spider/share/agencyconcern/trade',
            data: '',
            type: 'finance'
    },
    /*广告申请接口*/
    adRequest:{
        url : 'http://ad.xinrongnews.com/customer/api/save',
        data: '',
        type: ''
    },
    ad: { //内部广告系统接口
        url : 'http://ad.xinrongnews.com/adv/api/advInfo',
        data : '',
        type : ''
    },
    addCollect: { //添加收藏
        url : '/news-api/web/user/addCollect',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data : {
            newsId: '',
        },
        type : 'app'
    },
    delCollect: { //取消收藏
        url : '/news-api/web/user/delCollect',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data : {
            collectId: '',
        },
        type : 'app'
    },
    hasCollect: {//是否收藏
        url : '/news-api/web/user/hasCollect',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data : {
            newsId: '',
        },
        type : 'app'
    },
    addLike: {//点赞接口
        url : '/news-api/web/expert/thumbsUp',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        data : {
            answerId: '',
        },
        type : 'app'
    }
};

function getUrlRelativePath(){
　　var url = document.location.toString();
　　var arrUrl = url.split("//");
　　var start = arrUrl[1].indexOf("/");
　　var relUrl = arrUrl[1].substring(start+1);//stop省略，截取从start开始到结尾的所有字符
　　if(relUrl.indexOf("/") != -1){
　　　　　　relUrl = relUrl.split("/")[0];
　　}
　　return relUrl;
};

/*获取日期*/
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+Number(AddDayCount));//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
};

function $ajax($scope, $http, opt, callBack, error){
    if(opt.type == "finance"){
        var param = "?";
        var obj = opt.data;
        var params ;
        var url;
        if(typeof obj=="object"){
            params = opt.data;
            for (items in obj){
                param = param  + items +'='+ obj[items] + '&';
            }
            url = basePath + opt.url + param +'jsoncallback=JSON_CALLBACK';
        } else {
            params = "";
            url = basePath  + opt.url + obj +'?jsoncallback=JSON_CALLBACK';
        }   
        $http.jsonp(url, params)
           .success(function(data){
               if (data && data.code == 0) {
                    callBack && callBack(data);
                } else {
                    error && error(data);
                }
            })
            .error(function(data) {
                error && error(data);
            });
    } else if (opt.type == "app") {
        $http({
                url: opt.url,
                method: opt.method || 'POST',
                data: opt.data || '',
                headers: { 'Content-Type' : opt.contentType || 'application/json; charset=utf-8',
                    'api-version' : opt.apiVersion || ''
                }
            })
            .success(function(data, header, config, status) {
                if (data && data.resultCode === 10000) {
                    callBack && callBack(data);
                } else {
                    error && error(data);
                }
            }).error(function(data, header, config, status) {});
    } else {
        var backendUrl = '';
        if (opt.type == "service" && typeof(opt.data) == "object") {
            var param = '?';
            for (items in opt.data){
                param = param  + items +'='+ opt.data[items] + '&';
            }
            backendUrl = opt.url + param;
        }
        $http.post(backendUrl || opt.url, opt.data)
            .success(function(data){
                if (opt.type == "service") {
                    if (data) {
                        callBack && callBack(data);
                    } else {
                        error && error(data);
                    }
                } else {
                    if (data && data.code == 0) {
                        callBack && callBack(data);
                    } else {
                        error && error(data);
                    }
                }
            })
            .error(function(data) {
                error && error(data);
            });
    }
};

function $setIntervalAjax($interval, $scope, $http, opt, callBack, n){
    var time = n ||1;
    $interval(
        function() {
            $ajax($scope, $http, opt,callBack)
        },
    time * 60000)
};

function CORS(opt, callBack, error) {
    if (window.XDomainRequest) {
        var xdr = new XDomainRequest();
        xdr.open("get", opt.url + '?' + encodeURI(opt.data));
        xdr.onerror = function (err) { 
            console.log('IE' + err);
        };
        xdr.onload = function() {
            var data = eval('(' + xdr.responseText + ')');
            callBack(data);
        };
        setTimeout(function () {
            xdr.send();
        }, 0);
    } else if (window.XMLHttpRequest) {
        $.ajax({
            type: 'POST',
            url: opt.url,
            data: opt.data,
            async: true,
            success: function(data) {
                callBack(data);
            },
            error: function(err) {
                console.log('CHROME' + err);
            }
        });
    }
};