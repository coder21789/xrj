/**
 * Service 公共依赖服务注入
 *
 * @file ngService.js
 * @Date 2016.8.18
 */

angular.module('cjhService', [])
	.config(['$provide', function($provide) {

		$provide.factory('reqJSON', ['$http', function($http){ //AngularJS请求模块封装通过reqJSON依赖注入的方式进行调用
			// var basePath = 'http://172.16.200.245'; //开发服务
			// var basePath = 'http://120.26.229.223:8088'; //现网服务
			var basePath = 'https://spider.xinrongnews.com'; //测试服务
			return function(opt, callBack, error) {
				if(opt.type == 'finance'){ //跨域金融数据请求
			        var param = '?',
			        	obj = opt.data,
			        	url;
			        if(typeof obj == 'object'){
			            for (items in obj){
			                param = param  + items +'='+ obj[items] + '&';
			            }
			            url = basePath + opt.url + param +'format=json&jsoncallback=JSON_CALLBACK';
			        }else{
			            url = basePath  + opt.url + obj +'?format=json&jsoncallback=JSON_CALLBACK';
			        }			        
			        $http.jsonp(url).success(
						function(data) {
							if (data && data.code === 0) {
				                callBack && callBack(data);
				            } else {
				                error && error(data);
				            }
						}
					);
			    } else { //内网数据请求默认JSON可定义contentType为application/x-www-form-urlencoded等
			        $http({
				        url: opt.url,
				        method: opt.method || 'POST',
				        data: opt.data || '',
				        headers: { 'Content-Type' : opt.contentType || 'application/json; charset=utf-8' }
				    })
				    .success(function(data, header, config, status) {
				        if (data && (data.code === 0 || data.resultCode === 10000)) {
				    		callBack && callBack(data);
				        } else {
		                    error && error(data);
		                }
				    }).error(function(data, header, config, status) {});
			    }
			};
		}]);

		$provide.factory('intervalREQ', ['$interval', 'reqJSON', function($interval, reqJSON){ //请求定时器可定义时长
			return function(opt, callback, n) {
				var time = n || 1;
				$interval(function() {
		      		reqJSON(opt, callback);
		  		}, time * 60000);
			};
		}]);


		$provide.factory('nearlyWeekDate', [function(){ //获取最近七天日期封装
			return function(){
				var dateStr = new Date();  
			    dateStr.setDate(dateStr.getDate() - 6);   
			    var dateArray = [];  
			    var dateTemp;  
			    var flag = 1;  
			    for (var i = 0; i < 7; i++) {   
			        dateTemp = dateStr.getFullYear() + '-' + (dateStr.getMonth() + 1) + '-' + dateStr.getDate();  
			        dateArray.push(dateTemp);  
			        dateStr.setDate(dateStr.getDate() + flag);  
			    }
			    dateArray.reverse();
			    return dateArray;   
			};
		}]);

		$provide.factory('dataSliceFn', [function(){ //金融数据返回验证封装
			return function(data, len, obj){
				 if (data.length>len) {
					obj = data.slice(0, len);
				} else {
					obj = data;
				}
				return obj;
			};
		}]);

		$provide.factory('commonDate', function() {   
		    var factory = {},
		    	liveChannel = (String(locations).match('/zj/list/')) ? true : false;
		    	newsList = (locations == "/zb/cj.html" || locations == "/zb/gp.html" || locations == "/zb/lc.html" || locations == "/zb/jj.html" || locations == "/zb/wh.html") ? true : false;
		    factory.isIndexHeader = (locations.length == 1 || locations == "/zb/" || 
		    	locations == "/zj/" || locations == "/ph/" || liveChannel || newsList) ? true : false;
		    factory.navBgClass = getUrlRelativePath();
		    return factory;
		});

		$provide.factory('reqCORS', ['$http', function($http){ //AngularJS跨域AJAX请求兼容性封装、添加XDOMAIN对象支持
			return function(opt, callBack, error) {
				if (window.XDomainRequest) {
					var xdr = new XDomainRequest();
				  	xdr.open("get", opt.url + '?' +opt.data);
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
						type: 'GET',
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
		}]);

		$provide.factory('arrayPUSH', [function(){ //函数参数数组合并封装
			return function() {
				var args = Array.prototype.slice.call(arguments, 0),
					_array = [];
				for (var i = 0; i < args.length; i++) {
					_array.push(args[i]);
				}
				return _array;
			};
		}]);

		$provide.factory('interfaceTYPE', function(){ //金融数据接口配置
			var interfaceData = {
				quote : { //理财个人涨跌幅
					url : '/finance-spider/share/rank',
					data : '',
					type : 'finance',
					contentType : ''
				},
				fundStyle : { //基金保障本金基金等多个基金种类数据
					url : '/finance-spider/fund/hot',
					data : '',
					type : 'finance',
					contentType : ''
				},
				fundRank : { //基金混合型股票型等金融数据
					url : '/finance-spider/fund/rank-jrj',
					data : '',
					type : 'finance',
					contentType : ''
				},
				channelRank : { //排行新闻TOP10
					url : '/news/top',
					data : '',
					type : '',
					contentType : 'application/x-www-form-urlencoded;charset=utf-8'
				},
				futuresforward : { //期货国内外行情金融数据
					url : '/finance-spider/forward/data',
					data : '',
					type : 'finance',
					contentType : ''
				},
				futuresMetal : { //期货国际金银价金融数据
					url : '/finance-spider/metal/international-price',
					data : '',
					type : 'finance',
					contentType : ''
				},
				futuresLondon : { //期货伦敦贵金属定盘价金融数据
					url : '/finance-spider/metal/london-fix',
					data : '',
					type : 'finance',
					contentType : ''
				},
				futuresEcharts : { //期货Echarts金融数据
					url : '/finance-spider/crude/stock',
					data : '',
					type : 'finance',
					contentType : ''
				},			
				live : { //直播频道数据
					url : '/news-api/liveNew',
					data : '',
					type : '',
					contentType : 'application/x-www-form-urlencoded;charset=utf-8'
				},
				bondShibor : { //债券同业拆放利率金融数据
					url : '/finance-spider/bond/shibor',
					data : '',
					type : 'finance',
					contentType : ''
				},
				bondFirr : { //债券收益率排行数据
					url : '/finance-spider/bond/firr',
					data : '',
					type : 'finance',
					contentType : ''
				},
				bondReturndebt : { //债券可转债数据
					url : '/finance-spider/bond/returndebt',
					data : '',
					type : 'finance',
					contentType : ''
				},
				bondPrices : { //债券沪市债券、深市债券、银行间市场行情数据
					url : '/finance-spider/bond/prices',
					data : '',
					type : 'finance',
					contentType : ''
				},
				bondTrade : { //债券交易所回购行情数据
					url : '/finance-spider/bond/tradequotation',
					data : '',
					type : 'finance',
					contentType : ''
				},
				insuranceRange : { //保险股行情报价数据
					url : '/finance-spider/share/insurance',
					data : '',
					type : 'finance',
					contentType : ''
				},
				insuranceProduct : { //保险产品区数据
					url : '/finance-spider/insurance/product',
					data : '',
					type : 'finance',
					contentType : ''
				},
				crudeProduct : { //原油产品金融数据
					url : '/finance-spider/crude/chinese',
					data : '',
					type : 'finance',
					contentType : ''
				},
				goldMarket : { //黄金上海交易所行情金融数据
					url : '/finance-spider/metal/gold-transaction',
					data : '',
					type : 'finance',
					contentType : ''
				},
				goldQuote : { //黄金概念股行情金融数据
					url : '/finance-spider/share/gold',
					data : '',
					type : 'finance',
					contentType : ''
				},
				moneyRate : { //外汇央行利率
			        url : '/finance-spider/exchange/bank-rate',
			        data : '',
			        type : 'finance'
			    },
			    directQuotation: { //外汇直盘
			        // url : '/finance-spider/exchange/rate/basic/jrj',
			        url : '/finance-spider/exchange/rate/basic/qq',
			        data : '',
			        type : 'finance'
			    },
			    crossMarket: { //外汇交叉盘
			        url : '/finance-spider/exchange/rate/cross',
			        data : '',
			        type : 'finance'
			    },
			    rmbRate: { //外汇人民币汇率
			        url : '/finance-spider/exchange/rate/qq',
			        data : '',
			        type : 'finance'
			    },
			    ad: { //内部广告系统接口
			        url : 'http://ad.xinrongnews.com/adv/api/advInfo',
			        data : '',
			        type : ''
			    },
			    viewPoint: { //大事件评论模式支持观点
			    	url: '/news-api/pc/newsViewpoint/addSupport',
			    	data: '',
			    	type: '',
			    	contentType : 'application/x-www-form-urlencoded;charset=utf-8'
			    },
			    newsReviewAdd: { //大事件评论模式提交评论
			    	url: '/news-api/pc/newsReview/add',
			    	data: '',
			    	type: '',
			    	contentType : 'application/x-www-form-urlencoded;charset=utf-8'
			    },
			    newsReviewList: { //大事件评论模式评论列表
			    	url: '/news-api/pc/newsReview/list',
			    	data: '',
			    	type: '',
			    	contentType : 'application/x-www-form-urlencoded;charset=utf-8'
			    },
			    newsReviewLike: { //大事件评论模式评论点赞
			    	url: '/news-api/pc/newsReview/addLike',
			    	data: '',
			    	type: '',
			    	contentType : 'application/x-www-form-urlencoded;charset=utf-8'
			    }
			};
			return interfaceData;
		});

	}]);