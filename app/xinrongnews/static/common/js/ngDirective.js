/**
 * Directive 公共依赖指令注入
 *
 * @file ngDirective.js
 * @Date 2016.8.31
 *
 * 备注:AngularJS模板内类似标签引入
 * uiTab组件 Tab切换、可继承嵌套
 * uiPop组件 浮窗控件、可继承嵌套
 * eCharts组件 第三方控件二次封装
 * uiShare社交分享组件封装
 * uiAd内部广告分发组件封装
 */

angular.module('cjhDirective', ['cjhService'])
	.config(['$compileProvider', function($compileProvider) {

		$compileProvider.directive("uiTab", function() { //TAB组件封装
			return {
				restrict : "EA",
				transclude : true,
				scope : {
					currentChannel : '='
				},
				templateUrl : "uiTab.html",
				controller : ['$scope', function ($scope) {
					var panes = $scope.scopes = [];
					$scope.select = function(pane, i) {
					    angular.forEach(panes, function(scope) {
					      	scope.selected = false;
					    });
					    pane.selected = true;
					    $scope.currentChannel = i+1;
					};
					this.addScope = function(scope) {
						if ($scope.currentChannel) {
							if(panes.length === $scope.currentChannel-1){
						      	$scope.select(scope);
						    }
						} else {
							if(panes.length === 0){
						      	$scope.select(scope);
						    }
						}
					    panes.push(scope);
					}
				}]
			}
		});

		$compileProvider.directive("uiPane", function() {
			return {
				restrict : 'EA',
				scope : {
					tittle : '='
				},
				transclude : true,
				require : '^uiTab',
				templateUrl : "uiPane.html",
				link : function(scope, elemenet, attrs, uiTabController) {
				 	uiTabController.addScope(scope);
				}
			}
		});

	    $compileProvider.directive('eChart', function() { //Echarts组件封装
	        return {
	            restrict : 'EA',
	            link : function link(scope, element, attrs) {
		            var myChart = echarts.init(element[0]);
		            if (attrs) {
		            	myChart.showLoading();
		                attrs.$observe('arrayChart', function() {
		                	if (attrs.arrayChart) {
		                		var $array = scope.$eval(attrs.arrayChart)
					            var uiOptions = {
					            	tooltip:{show: true},
				                    xAxis:[
				                        {
				                        type:'category',
				                        data:$array[0]
				                        }
				                    ],
				                    yAxis:[
				                        {
				                        type:'value'
				                        }
				                    ],
				                    series:[
				                        {
				                        'name':'现值',
				                        'type':'line',
				                        'data':$array[1]
				                        },
				                        {
				                        'name':'前值',
				                        'type':'line',
				                        'data':$array[2]
				                        }
				                    ]
					            };
			                    if (angular.isObject(uiOptions)) {
			                    	myChart.hideLoading();
			                        myChart.setOption(uiOptions);
			                    }
		                	}
		                }, true);
		            }
		        }
	        }
	    });

	    $compileProvider.directive('uiPop', function() { //POP组件封装
	    	return {
	    		restrict : 'EA',
	    		transclude : true,
	    		scope : {
	    			createDate : '='
	    		},
	    		replace : true,
	    		templateUrl : 'uiPop.html',
	    		link : function(scope, elem, attrs) {
	    			var popSubject = elem[0].childNodes[0],
	    				$document = elem[0].ownerDocument;
	    			scope.isPopshow = false;
	    			scope.popSave = function() {
	    				scope.isPopshow = !scope.isPopshow;
	    			};
	    			if ($document.addEventListener) {
	    				$document.addEventListener('click', function() {
		    				scope.isPopshow = false;
		    			}, false);
	    			} else {
	    				document.attachEvent('onclick', function() {
		    				scope.isPopshow = false;
		    			}, false);
	    			}
	    			if (attrs.isShow) {
	    				attrs.$observe('isShow', function() {
	    					var isShowing = scope.$eval(attrs.isShow);
	    					if (angular.isDefined(isShowing)) {
	    						scope.isPopshow = isShowing;
	    					}
	    				}, true);
	    			}
	    		}
	    	}
	    });

	    $compileProvider.directive("uiShare", function() { //社交分享组件
	    	return {
				restrict : 'EA',
				scope : {},
				transclude : true,
				require : '^uiPop',
				templateUrl : "uiShare.html"
			}
	    });

	    $compileProvider.directive("uiAd", function() { //内部广告系统图片分发
	    	return {
	    		restrict: 'EA',
	    		scope: {
	    			adCode: '@',
	    			adStyle: '@',
	    			adChannel: '@'
	    		},
	    		templateUrl: 'uiAd.html',
	    		link : function(scope, elem, attrs) {}
	    	}
	    });
	    
	}]);

angular.module("Template", [])
    .run(["$templateCache", function($templateCache) { //TAB组件模板
      	$templateCache.put("uiTab.html", "<div>" +
	      	"<ul class='topNav'>" +
	      	"<li ng-repeat='pane in scopes' ng-class='{actived:pane.selected}' ng-mouseenter='select(pane, $index)'>" +
	         	"{{pane.tittle}}" + 
	      	"</li>" +
	      	"</ul>" +
	      	"<div ng-transclude class='tab-content'></div>" +
	      	"</div>"
	    )
    }])
    .run(["$templateCache", function($templateCache) {
      	$templateCache.put("uiPane.html", "<div ng-show='selected' ng-transclude>" + "</div>")
    }])
    .run(["$templateCache", function ($templateCache) { //POP组件模版
    	$templateCache.put("uiPop.html", "<div class='popup'>" +  
            "<div id='popSubject' class='pophead {{isPopshow|filterDate}}' ng-click='popSave()' ng-bind='createDate'>" + 
            "</div>" + 
            "<div class='pop' ng-if='isPopshow'>" + 
                "<div ng-transclude class='pop-content' ng-click='popSave()'></div>" +
            "</div>" + 
            "<span ng-show='isPopshow'></span>" + 
        	"</div>"
        )
    }])
    .run(["$templateCache", function($templateCache) { //社交分享模板
      	$templateCache.put("uiShare.html", "<div class='sharegroups'>" + 
            "<div class='jiathis_style_24x24'>" + 
                "<h2><a class='jiathis_button_qzone'></a></h2>" + 
                "<h2><a class='jiathis_button_tsina'></a></h2>" + 
                "<h2><a class='jiathis_button_cqq'></a></h2>" + 
                "<h2><a class='jiathis_button_weixin'></a></h2>" + 
            "</div>" + 
            "<script type='text/javascript' src='http://v3.jiathis.com/code/jia.js' charset='utf-8'></script>" + 
            "<div ng-transclude></div>" +   
        "</div>")
    }])
    .run(["$templateCache", function($templateCache) { //内部广告系统图片分发模板
    	$templateCache.put("uiAd.html", "<div class='ad-img' ng-style='{{adStyle}}'>" + 
			"<a href='' title='' target='_blank'>" + 
			"<img id='{{adCode}}' class='adPosCode' src='/imgs/default_logo_bg.png' alt='' ng-style='{{adStyle}}' data-code='{{adCode}}' data-channel='{{adChannel}}'>" + 
			"</a>" + 
		"</div>")
    }]);