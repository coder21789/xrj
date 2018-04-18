/*indexof IE8 兼容*/
/*于2017-04-12 合并线上*/
if(!Array.prototype.indexOf){  
    Array.prototype.indexOf = function(elt /*, from*/){  
        var len = this.length >>> 0;  
        var from = Number(arguments[1]) || 0;  
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);  
        if (from < 0) from += len;  
        for (; from < len; from++) {  
            if (from in this && this[from] === elt)  return from;  
        }  
        return -1;  
    };  
};

/*基本汇率*/
function rateController($interval,$scope,commonDate,$http){
    $scope.error = false; 
    $scope.isloading = true;
    $ajax($scope, $http, api.rate, function(data) {
            commonDate.baseRate = $scope.items = data.data;
            $scope.isloading = false;
        }
    );
    $setIntervalAjax($interval, $scope, $http, api.rate, function(data) {
            commonDate.baseRate = $scope.items = data.data;
            $scope.isloading = false;
        }
    );
};

/*个股涨跌*/
function shareRankController($interval,$scope,commonDate,$http){
    $scope.error = false;
    $scope.isloading = true;
    $scope.isCurrent = false;
    $scope.menus = [
        {name: '个股涨幅'},
        {name: '个股跌幅'}
    ];
    $scope.items = {
        asc: [],
        desc: []
    };
    $scope.tabToggle =  function(index){
         $scope.isCurrent = index;
    };
    $ajax($scope, $http, api.shareRank, function(data) {
            $scope.items = data.data;
            $scope.isloading = false;
        }
    );
    $setIntervalAjax($interval, $scope, $http, api.shareRank, function(data) {
            $scope.items = data.data;
            $scope.isloading = false;
        }
    );
};

/*每日推荐*/
function recommendController($scope,commonDate,$http){
    $scope.error = false;
    $scope.isloading = true;
    $scope.isCurrent = 0;
    $scope.menus = [
        {name: '今天'},
        {name: '昨天'},
        {name: '前天'}
    ];
    $scope.items = {
        data0: [],
        data1: [],
        data2: []
    };
    $scope.tabToggle = function(index){
        api.recommend.data.date =  GetDateStr('-'+index);
        $scope.isCurrent = index;
        $scope.isCurrent = index;
        if($scope.items['data'+index].length == 0){
            $scope.isloading = true;
            $ajax($scope, $http, api.recommend, function(data){
                $scope.isloading = false;
                $scope.items['data'+index] = data.data;
            });
        }
    };
    $ajax($scope, $http, api.recommend, function(data){
        //data = {"data":[{"SUBJECT":"test","thumbnailUrl":"http://xrj.oss-cn-hangzhou.aliyuncs.com/data/20161024/5501477302149181.jpg","url":"/gp/20161024-d-333111.html"},{"SUBJECT":"test2","thumbnailUrl":"http://xrj.oss-cn-hangzhou.aliyuncs.com/data/20161024/33911477302181774.jpg","url":"/cj/20161024-d-332984.html"},{"SUBJECT":"test3","thumbnailUrl":"http://xrj.oss-cn-hangzhou.aliyuncs.com/data/20161024/37101477302214022.jpg","url":"/cj/20161024-d-332983.html"},{"SUBJECT":"test4","thumbnailUrl":"http://xrj.oss-cn-hangzhou.aliyuncs.com/data/20161024/84141477302246322.png","url":"/cj/20161024-d-332982.html"}],"code":0,"msg":"请求成功"};
        $scope.isloading = false;
        $scope.items['data'+$scope.isCurrent] = data.data;
    });
};

/*北美，欧洲，亚太*/
function marketBoxController($interval ,$scope,commonDate,$http){
    var area = ['asia','usa','eur'];
    $scope.menus = [
        {name: '亚太'},
        {name: '北美'},
        {name: '欧洲'}
    ];
    $scope.items = {
        data0: {},
        data1: {},
        data2: {}
    };
    $scope.error = false;
    $scope.isloading = true;
    $scope.isCurrent = 0;
    $scope.twoCurrent = 0;
    $scope.oneCurrent =  0;
    $ajax($scope, $http, api.stock_index, function(data){
        $scope.isloading = false;
        $scope.items['data0'] = data.data;
    });
    $scope.tabToggle  = function(index){
       $scope.isCurrent = index;
       api.stock_index.data = area[index];
       $('.dataCss').addClass('hide').eq(index).removeClass('hide');
       if(!$scope.items['data'+index].length){
            $scope.isloading = true;
            $ajax($scope, $http, api.stock_index, function(data){
                $scope.isloading = false;
                $scope.items['data'+index] = data.data;
            });
       }
    };
    $scope.asiaToggle = function(index){
        $scope.oneCurrent = index;
    };
    $scope.usaToggle = function(index){
        $scope.twoCurrent = index ==2 ? 1 :index;
    };
    $setIntervalAjax($interval, $scope, $http,api.stock_index, function(data) {
            $scope.items['data'+$scope.isCurrent] = data.data;
            $scope.isloading = false;
        }
    );
};

/*国债企债中债*/
$(function(){
    var stockArr = ["000012|I","000013|I"];
    var $elem = $('#sideBond');
    var $li = $elem.find('li');
    $li.on('mouseover',function(){
        var index = $(this).index();
        $(this).addClass('hover').siblings().removeClass('hover');
        $('#con_t1_'+(index+1)).show().siblings().hide();
        if(index==0|| index ==1){
            $('#con_t1_1').show().siblings().hide();
            swfobject.embedSWF("http://f0.jrj.com.cn/hq2/hqzs.swf?"+Math.random(), "focus_flash", "320", "250", "9.0.0", "",{first:stockArr[index],url:'share.jrj.com.cn'},{wmode:"opaque",AllowScriptAccess:"always"})
        }
    });
});

var liveUrl = {
    '4': {
        name: '财经',
        url: 'cj'
    },
    '5': {
        name: '股票',
        url: 'gp'
    },
    '7': {
        name: '理财',
        url: 'lc'
    },
    '11': {
        name: '基金',
        url: 'jj'
    },
    '15': {
        name: '外汇',
        url: 'wh'
    },
};

/*7*24小时直播*/
function directBroadcastController($interval ,$scope,commonDate,$http){
    $scope.error = false;
    $scope.isloading = true;
    var channelId = window.location.pathname.split('-')[1] === 'd';
    $scope.isCurrent = channelId?'5':'4';
    api.live.data.catId = $scope.isCurrent;
    $ajax($scope,$http,api.live,function(data){
        $scope.items = data.data;
        $scope.isloading = false;
    });
    $scope.getLiveData = function(id){
        api.live.data.catId = $scope.isCurrent = id;
        $ajax($scope,$http,api.live,function(data){
            $scope.items = data.data;
            $scope.isloading = false;
        });
    };
    $setIntervalAjax($interval, $scope, $http, api.live, function(data) {
            $scope.items = data.data;
            $scope.isloading = false;
        },10
    );
    $scope.loadmore = function(){
        var str =  getUrlRelativePath() || 'cj';
        window.open("/zb/"+liveUrl[$scope.isCurrent].url+'.html');
    };
};

/*热门文章*/
function hotArticlesController($interval ,$scope,commonDate,$http){
    $scope.error = false;
    $scope.isloading = true;
    $scope.items = {
            data0: [],
            data1: [],
            data2: []
        };
    $scope.menus = [
            {name: '一天'},
            {name: '一周'},
            {name: '一月'}
        ];
    $scope.isCurrent = 0;
    var days = [1,7,30];
    if($http,api.hotArticles.data.catCode == "word"){
        $http,api.hotArticles.data.catCode = 'cj';
    }
    $ajax($scope, $http,api.hotArticles,function(data){
        $scope.isloading = false;
        $scope.items.data0 = data;
    },function(){
        $scope.isloading = false;
        $scope.error = true;
    });
    $scope.tabToggle = function(index){
        $scope.isCurrent = index;
        if(!$scope.items['data'+index].length){
            $scope.isloading = true;
            api.hotArticles.data.dayNum = days[index];
            $ajax($scope, $http,api.hotArticles,function(data){
                $scope.isloading = false;
                $scope.items['data'+index] = data;
            });
        }
    };
};

/*基金榜*/
function fundController($scope,commonDate,$http){
    $scope.items = {
            data0: {},
            data1: {},
            data2: {}
        };
    $scope.menus = [
            {name: '股票型'},
            {name: '混合型'},
            {name: '债券型'}
        ];
    $scope.isCurrent = 0;
    $scope.isloading = true;
    $scope.error = false;
    $ajax($scope, $http,api.fund,function(data){
        $scope.isloading = false;
        $scope.items.data0 = data.data;
    });
    $scope.tabToggle = function(index){
        api.fund.data.type = $scope.isCurrent = index;
        if(!$scope.items['data'+index].length){
            $ajax($scope, $http,api.fund,function(data){
                $scope.isloading = false;
                $scope.items['data'+index] = data.data;
            });
        }
    };
};

/*内外盘*/
function forwardController($scope,commonDate,$http){
   $scope.items = {
        item0: {
            menu: [
                {name: '上期所'},
                {name: '大商所'},
                {name: '郑商所'},
            ],
            data:{
                data0: [],
                data1: [],
                data2: []
            }           
        },
        item1: {
            menu: [
                {name: ''}
            ],
            data:{
                data0: []
            }  
        }
    };
    $scope.menus = [
        {name: '内盘报价'},
        {name: '外盘报价'}
    ];
    $scope.isOn = 0;
    $scope.isCurrent = 0;
    $scope.isloading = true;
    $scope.error = false;
    $ajax($scope, $http,api.forward,function(data){
        $scope.isloading = false;
        $scope.items.item0.data.data0 = data.data;
    });
    $scope.tabToggle = function(index){
        var arr = ["shfe" ,"dce","zce","buy"];
        $scope.isCurrent = index;
        if(!$scope.isCurrent){
            api.forward.data.type = arr[$scope.isOn];
        }else{
            api.forward.data.type =  "buy";
            $scope.isOn = 0;
        }
        if( !$scope.items['item'+index].data['data'+$scope.isOn].length){
            $ajax($scope, $http,api.forward,function(data){
                $scope.isloading = false;
                $scope.items['item'+index].data['data'+$scope.isOn] = data.data;
            });
        }
    };
    $scope.menuToggle = function(index){
        var arr = ["shfe" ,"dce","zce","buy"];
        $scope.isOn = index;
        api.forward.data.type = !$scope.isCurrent ? arr[$scope.isOn] : "buy";
        $ajax($scope, $http,api.forward,function(data){
            $scope.isloading = false;
            $scope.items['item'+$scope.isCurrent].data['data'+$scope.isOn] = data.data;
        });
    };
};

/*行情中心*/
function equityMarketController($interval ,$scope,commonDate,$http){
    var $marketCenter = $('#marketCenter');
    var $indices_box = $marketCenter.find('.indices-box');
    var $indices_box5 = $indices_box.eq(4);
    $scope.isloading = true;
    $scope.error = false;
   // $scope.stock = commonDate.stockIndex;
    $scope.isCurrent = 0;
    $scope.smallId = 0;
    $scope.isOn = 0;
    $scope.menus = [
        {name: "A股"},
        {name: "港股"},
        {name: "全球"},
        {name: "基金"},
        {name: "外汇"},
        {name: "期货"},
    ];
    $scope.smallMenus = [
        {name: "美元指数"},
        {name: "基本汇率"},
        {name: "交叉汇率"},
        {name: "人民币牌价"}
    ];
    $scope.items = {
        cross: {},
        rmb: {}
    };
    if(!commonDate.baseRate){
        $ajax($scope, $http, api.rate, function(data) {
                commonDate.baseRate = $scope.exchange = data.data;
                $scope.isloading = false;
            }
        );
    }
    if(!commonDate.stockIndex){
        $ajax($scope, $http, api.stock, function(data) {
                $scope.stock = commonDate.stockIndex = data.data;
                $scope.isloading = false;
            }
        );
    }
    $scope.tabToggle = function(index){
        $scope.isloading = commonDate.stockIndex ? false : true;
        $indices_box.addClass('hide').eq(index).removeClass('hide');
        $scope.isCurrent = index;
        $scope.stock = commonDate.stockIndex;
        $scope.smallId = 0;
    };
    $scope.smallToggle = function(index){
        var $flashbox = $indices_box5.find('.flashbox').eq(index);
        var $link = $indices_box5.find('.noraml-link,.indices-link');
        $flashbox.hasClass('flashboxhtwo') ? $link.addClass('hide'): $link.removeClass('hide');
        $flashbox.removeClass('hide').siblings('.flashbox').addClass('hide');
        $scope.smallId = index;
        $scope.stock = commonDate.stockIndex;
        $scope.items.exchange = commonDate.baseRate;

        if(index == 2 && !$http,api.cross ){
            $ajax($scope, $http,api.cross,function(data){
                $scope.isloading = false;
                $scope.items.cross = data.data;
            });
        }

        if(index == 3 && !$http,api.rmb){
            $ajax($scope, $http,api.rmb,function(data){
                $scope.isloading = false;
                $scope.items.rmb = data.data;
            });
        }
    };
    $marketCenter.find('.tab-sub span').on('mouseover',function(){
        var index = $(this).index();
        var $parent = $(this).closest('.indices-box');
        var $flashbox = $parent.find('.flashbox').eq(index);
        var $link = $parent.find('.noraml-link,.indices-link');
        $scope.smallId = index;
        $(this).addClass('cur').siblings().removeClass('cur');
        $flashbox.hasClass('flashboxhtwo') ? $link.addClass('hide'): $link.removeClass('hide');
        $flashbox.removeClass('hide').siblings('.flashbox').addClass('hide');
    });
    var arr = ['rate','cross','rmb'];
    var url;   
    url = $scope.isCurrent  ==2 ? 'stock': url = arr[$scope.smallId];
    $setIntervalAjax($interval, $scope, $http, api[url], function(data) {
            $scope[url] = data.data;
            $scope.isloading = false;
        }
    );
};

/*人民币牌价*/
function bankListController($scope,commonDate,$http,$interval){   
    $scope.items = {
        data0: [],
        data1: [],
        data2: [],
        data3: []
    };
    $scope.menus = [
        {name: '工商银行',id: 'icbc'},
        {name: '中国银行',id: 'boc'},
        {name: '农业银行',id: 'abchina'},
        {name: '建设银行',id: 'ccb'}
    ];
    $scope.isCurrent = 0;
    $scope.error = false;
    $scope.isloading = true;
    $scope.filter = 7;   
    $scope.getData = function(item,filter){
        return item.slice(0,filter); 
    }; 
    $ajax($scope, $http,api.BankList,function(data){
        $scope.isloading = false;
        $scope.items.data0 = data.data;
    });            
    $scope.tabToggle = function(index){
        api.BankList.data = $scope.menus[index].id;
        $scope.isCurrent = index;

        if(!$scope.items['data'+index].length){
            $ajax($scope, $http,api.BankList,function(data){
                $scope.isloading = false;
                $scope.items['data'+index] = data.data;
            });
        }
    };      
};

/*请求链接配置*/
var app = angular.module('cjhApp', ['ngDialog', 'cjhService', 'cjhFilter', 'cjhDirective', 'Template']);