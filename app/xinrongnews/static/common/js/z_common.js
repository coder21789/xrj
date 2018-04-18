/**
 * 通用模块构造函数
 * @constructor bootstrapCommonModule
 * @param config
 * 
 * @func initGeetest gt3客户端参数
 * @func net         gt3参数获取
 * @func mask        表单气泡提示
 * @func href        url hash过滤
 * @func slide       滚动轮播
 * @func timeSet     定时器设置
 * @func page        上下滚动轮播
 * @func mouse       导航动态切换
 * @func code        二维码浮窗
 * @func header      顶部导航置顶
 * @func redirectToWap 移动端跳转
 * @func adImgPull   广告代码
 * @func operator    运营数据埋点统计
 * @func expertImgLoad 专家头像获取
 *
 */

function commonModuleBootstrap(show) {
    var config = {},
        config = {
            url: '/gt3/register',
            container: '#captcha',
            msg: '#wait',
            type: 'float',
            slider: '.radioSlider',
            live: '.wh_live_container_outer',
            move: '#whChannelBar'
        };
    var gt3Plugin = new bootstrapCommonModule(config);
    if (show) gt3Plugin.net(function() {
        $('.registerForm').show(500);
    });
    return gt3Plugin;
};

function bootstrapCommonModule(config) {
    // gt3构造函数参数
    this.url = config.url;
    this.container = config.container;
    this.msg = config.msg;
    this.type = config.type;
    this.slider = config.slider;
    this.live = config.live;
    this.move = config.move;
};
bootstrapCommonModule.prototype = {
    // gt3客户端参数
    initGeetest: function(data, callback) {
        var self = this;
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            new_captcha: data.new_captcha,
            offline: !data.success,
            product: this.type,
            width: '100%'
        }, function(captchaObj) {
            captchaObj.appendTo(self.container);
            captchaObj.onReady(function() {
                $(self.msg).hide();
            });
            captchaObj.onSuccess(callback);
        });
    },
    // gt3参数获取
    net: function(callback, init) {
        if (init) init();
        var self = this;
        $.ajax({
            url: this.url,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                self.initGeetest(data, callback);
            }
        });
    },
    // 表单气泡提示
    mask: function(el, msg, timeout, callback) {
        var html = '',
            $parent = $(el);
        html = '<div class="msg-container"><div><p>' + msg + '</p></div></div>';
        $parent.append(html);
        setTimeout(function() {
            $('.msg-container').remove();
            callback();
        }, timeout);
    },
    // url hash过滤
    href: function(url) {
        var result;
        result = url.match('#') ? url.split('#')[0] : url;
        return result;
    },
    // 滚动轮播
    slide: function(sliderClass){
        if (!sliderClass) {
            var $slider = $(this.slider);
        } else {
            var $slider = $(sliderClass);
        }
        if ($slider[0]) {
            this.timeSet($slider, true);
        }
    },
    // 定时器设置
    timeSet: function($slider, $width) {
        var timer = sliderTime($slider);
        $slider.on('mouseover', function() {
            clearInterval(timer);
        });
        $slider.on('mouseleave', function() {
            timer = sliderTime($slider);
        });
        function sliderTime($slider) {
            return setInterval(function(){            
                setSlider($slider, $width);
            }, 3000);
        };
        function setSlider($el, $width) {
            var $ul = $el.find('ul');
            var $li = $ul.find('li:eq(0)');
            var width = $li.width();
            var height = $li.height();
            var options = $width ? {'left': -width} : {'top': -height};
            $ul.stop(true,false).animate(options, {
                duration: 500,
                easing: 'linear',
                complete: function() {
                    $ul.append($li.clone());
                    $li.remove();
                    $ul.removeAttr('style');
                }
            });
        }; 
    },
    // 上下滚动轮播
    page: function(pageClass) {
        if (!pageClass) {
            var $live = $(this.live);
        } else {
            var $live = $(pageClass);
        }
        if ($live[0]) {
            this.timeSet($live, false);
        }
    },
    // 导航动态切换
    mouse: function(onEl, onClass, addClass) {
        var $move = $(this.move).find('li').not(onEl);
        if($move[0]) {
            $move.on('mouseover', function() {
                setMove($(this), onEl, onClass, addClass);
            });
            $move.on('mouseleave', function() {
                setLeave($(this));
            });
        }
        function setMove($el, onEl, onClass, addClass) {
            var $parentSiblings = $el.siblings('li').not(onEl);
            $parentSiblings.find('span').remove;
            $parentSiblings.removeClass(addClass);
            $el.append('<span></span>');
            $el.addClass(addClass);
        };
        function setLeave($el) {
            $el.find('span').remove();
            $el.removeClass(addClass);
        };
    },
    // 二维码浮窗
    code: function(container, pop) {
        var $code = $(container);
        if($code[0]) {
            $code.on('mouseover', function() {
                $(this).find(pop).show();
            });
            $code.on('mouseleave', function() {
                $(this).find(pop).hide();
            });
        }
    },
    // 顶部导航置顶
    header: function(header) {
        var $header = $(header);
        if($header[0]) {
            $(window).on('scroll', function() {
                var $scroll = $(window).scrollTop();
                if($scroll > 40) {
                    $header.css({'position':'fixed', 'top': '-40px'});
                    $header.stop(true,false).animate({
                        'top': 0
                    }, {
                        duration: 300,
                        easing: 'linear'
                    });
                } else {
                    $header.css('position', 'relative');
                }
            });
        }
    },
    // 移动端跳转
    redirectToWap: function(url) {
       isPhone(function() {
           var local = window.location.href;
           if (local === 'http://' + url.base || local === 'https://' + url.base) 
           window.location = url.dest;
       });
       function isPhone(callback) {
           var browser={
           versions: function(){
           var u = navigator.userAgent, app = navigator.appVersion;
           return {
               trident: u.indexOf('Trident') > -1,
               presto: u.indexOf('Presto') > -1,
               webKit: u.indexOf('AppleWebKit') > -1,
               gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
               mobile: !!u.match(/AppleWebKit.Mobile./),
               ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
               android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
               iPhone: u.indexOf('iPhone') > -1 ,
               iPad: u.indexOf('iPad') > -1,
               webApp: u.indexOf('Safari') == -1
           };
           }(),
           language: (navigator.browserLanguage || navigator.language).toLowerCase()
           };
           if(browser.versions.android || browser.versions.iPhone){
               callback();
           }
       };
    },
    // 广告代码
    adImgPull: function() {
        var arrayCode = adCodeMap(),
            pos_code = '';
            pos_code += ('pos_code=' + arrayCode.join(','));
        var opt = api.ad;
            opt.data = pos_code;
        if (arrayCode.length > 0) {
            CORS(opt, function(data) {
                for (var i = 0; i < data.data.length; i++) {
                    if(data.data[i]){
                        var $num = data.data[i].code.toUpperCase();
                        $('#' + $num).attr({
                            'src': 'https://adimg.xinrongnews.com/upload/' + data.data[i].picUrl,
                            'alt': data.data[i].tip
                        });
                        $('#' + $num).parent('a').attr({
                            'href': data.data[i].webUrl,
                            'title': data.data[i].tip
                        });
                    }
                }
            });
        }
        function adCodeMap() {
            var $adCode = $('.adPosCode'),
            codeArray = [];
            $adCode.each(function(i) {
                var _code = $(this).attr('data-code'),
                    _pathname = window.location.pathname;
                if (_code.length < 4) {
                    __code = 'XRJ_' + _pathname.split('/')[1].toUpperCase() + '_' + 
                        _pathname.split('/')[2].split('.')[0].split('-')[0].toUpperCase() + '_' + _code;
                    codeArray.push(__code);
                } else {
                    codeArray.push(_code);
                }
            });
            return codeArray;
        };
    },
    // 运营数据埋点统计
    operator: function($el) {
        $el.on('click', function() {
            var id = $(this).attr('data-id'),
                channel = $(this).attr('data-channel'),
                recommendUrl = ($(this).attr('href')).split('-')[2].split('.')[0];
            var data = 'recommendCode=' + id 
                + '&categoryCode=' + channel 
                + '&method=addWebRecommendVisitLog' 
                + '&newsId=' + recommendUrl;
            $.ajax({
                url: '/news-api/p/operationService',
                type: 'post',
                data: data
            });
        });
        function dataCollect() {
            var pathname = window.location.pathname;
            function urlReg(url) {
                if (url.match('-d-') && !url.match('/dashijian/')) {
                    return 18;
                } else if (url.match('-h-') && url.match('/ht/')) {
                    return 14;
                } else if (url.match('-t-') && url.match('/tj/')) {
                    return 10;
                } else if (url.match('-d-') && url.match('/dashijian/')) {
                    return 24;
                } else {
                    return null;
                }
            };
            if (urlReg(pathname)) {
                var param = '',
                    newsId = pathname.split('-')[2].split('.')[0],
                param = 'method=addVisitLog&type=' 
                    + urlReg(pathname) 
                    + '&newsId=' + newsId;
                $.ajax({
                    url: '/news-api/p/operationService',
                    type: 'post',
                    data: param
                });
            }
        };
        dataCollect();
    },
    // 专家头像获取
    expertImgLoad: function(imgData, imgContainer) {
        var $data = $(imgData),
            $img = $(imgContainer);
        if ($data.length > 0) {
            for (var i = 0; i < $data.length; i++) {
                $code = $data.eq(i).attr('data-id');
                var $img_i = $img.eq(i);
                var $parent = $img_i.closest(imgData);
                $.ajax({
                    type: 'GET',
                    url: '/news-api/m/internalUserService?clientVer=1.3.0&expertId='+ $code,
                    data: '',
                    async: false,
                    success: function(data) {
                        if (data && data.resultCode == 10000 && data.resultBody) {
                            $html = '';
                            $html = '<a href="/zj/'+$code+'/guandian.html" target="_blank"><img src="'+ data.resultBody.authorImageUrl +'" /><i class="icon"></i></a>';
                            $img_i.append($html);
                            if($parent.find('.author').length){
                                $parent.find('.name').html('<a href="/zj/'+$code+'/guandian.html" target="_blank">'+data.resultBody.author+'</a><span class="author">'+data.resultBody.job+'</span>');
                            }else{
                                $parent.find('.name').html('<a href="/zj/'+$code+'/guandian.html" target="_blank">'+data.resultBody.author+'</a>');
                            }
                        } else {}
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
};

/*通用模块初始化*/
$(function() {
    var commonModuleLoader = commonModuleBootstrap(false);
    commonModuleLoader.slide();
    commonModuleLoader.slide('.radioSliderChild');
    commonModuleLoader.page();
    commonModuleLoader.page('.top_slider_left');
    commonModuleLoader.page('.top_slider_right');
    commonModuleLoader.mouse('.wh_nav_on', 'wh_nav_on', 'wh_nav_move');
    commonModuleLoader.code('.yy_code', '.yy_pop_container');
    commonModuleLoader.redirectToWap({base: 'www.xinrongnews.com/', dest: 'https://m.xinrongnews.com'});  
    commonModuleLoader.adImgPull();
    commonModuleLoader.operator($('.recommendCollect'));
    commonModuleLoader.expertImgLoad('.expert-img', '.expert-load');
});

/*获取URL文件路径*/
var locations = location.pathname;

/*头部logo*/
function commonHead($scope,commonDate){
    $scope.color = commonDate.navBgClass;
    $scope.isIndex = commonDate.isIndexHeader;
};

/*顶部导航*/
function topHeader($scope,commonDate,ngDialog,$http){
    $scope.isCodeShow = false;
    $scope.isBaseHead = commonDate.isIndexHeader;
    $scope.arror = 'icon-xiangxia1';
    $scope.icon = 'icon-triangle-copy-copy-copy';
    $scope.username = $.cookie('nickName') || '';
    $scope.islogin = $.cookie('nickName')? true : false;

    /*如果是从个人中心跳转过来，则弹出登录框*/
    if(!$.cookie('nickName') && ($.cookie('from') == 'person' || location.pathname == "/person/editor")){
        ngDialog.open({
            template: '/common/login.html',
            controller: 'loginController',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();    
        $.cookie('from', '', {expires: -1, path: '/'});
    }
    $scope.codeShow = function($event){
        $scope.isCodeShow = true; 
        $scope.arror = 'icon-arrows-copy';
    };
    $scope.codeHide = function($event){
        $scope.isCodeShow = false; 
        $scope.arror = 'icon-xiangxia1';
    };
    $scope.Show = function($event){
        $scope.isShow = true; 
        $scope.icon = 'icon-triangle-copy';
    };
    $scope.Hide = function($event){
        $scope.isShow = false; 
        $scope.icon = 'icon-triangle-copy-copy-copy';
    };
    $scope.setLogin = function(){
        ngDialog.open({
            template: '/common/login.html',
            controller: 'loginController',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.setRegister = function(){  
        ngDialog.open({
            template: '/common/register.html',
            controller: 'registerController',
            className: 'modal-mask',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.logout = function(){
       $ajax($scope, $http,api.logout,function(data){
            console.log(data);
        }, function(data) {
            QC.Login.signOut();
            WB2.logout();
            $.cookie('nickName', '', {expires: -1, path: '/'});
            $scope.islogin = false;
            location =location.origin;
        });
    };
    $scope.contribute = function(){
        if (!$.cookie('nickName')) {
            ngDialog.open({
                template: '/common/login.html',
                controller: 'loginController',
                scope: $scope,
                closeByDocument: false,
                className: 'modal-mask'
            });  
            ngDialog.closeAll();    
        } else {
            if ($.cookie('hasNickName') == "true" &&  $.cookie('hasImageUrl') == "true") {
                location.href = location.origin+'/person/editor';
            } else {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    shadeClose: true,
                    skin: 'layer warn-layer',
                    area: ['400px', 'auto'], //宽高
                    btn: ['立即完善', '以后再说'],
                    content: '<div class="iconfont icon-danchuang-1"></div><p>你还没有设置个人信息</p>',
                    yes: function(index){
                        location.href = location.origin+'/person?type=modify';
                    }
                });
                 
            }
        }
    };
};

function footerController($scope,commonDate,ngDialog,$http){
    $scope.contribute = function(){
        if (!$.cookie('nickName')) {
            ngDialog.open({
                template: '/common/login.html',
                controller: 'loginController',
                scope: $scope,
                closeByDocument: false,
                className: 'modal-mask'
            });  
            ngDialog.closeAll();    
        } else {
            if($.cookie('hasNickName') == "true" &&  $.cookie('hasImageUrl') == "true"){
                location.href = location.origin+'/person/editor';
            } else {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    shadeClose: true,
                    skin: 'layer warn-layer',
                    area: ['400px', 'auto'], //宽高
                    btn: ['立即完善', '以后再说'],
                    content: '<div class="iconfont icon-danchuang-1"></div><p>你还没有设置个人信息</p>',
                    yes: function(index){
                        location.href = location.origin+'/person?type=modify';
                    }
                });
            }
        }
    };
};

/*登录*/
function loginController($scope,ngDialog,$http){
    $scope.username = "";
    $scope.password = "";
    $scope.error = "";

    $scope.setPassword = function($scope,$http){
        ngDialog.open({
            template: '/common/password.html',
            controller: 'passwordController',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.setRegister = function($scope,$http){
        ngDialog.open({
            template: '/common/register.html',
            controller: 'registerController',
            className: 'modal-mask',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.loginFun = function(login){
        $scope.error = '';

        if(!login.username.$viewValue){
            $scope.error = '请填写您的手机号';
            return;
        }

        if(login.username.$invalid && login.username.$viewValue){
            $scope.error = '请填写正确的手机号';
            return;
        }  

        if(!login.password.$viewValue){
            $scope.error = '请填写密码';
            return;
        } 

        if(login.password.$viewValue.length < 6){
            $scope.error = '密码长度在6-20位';
            return;
        }   

        if(login.password.$invalid && login.password.$viewValue.length >5){
            $scope.error = '密码格式不正确';
            return;
        }   

        if ($scope.error) {
            return;
        } else {
            api.login.data = 'phone=' + $scope.username + '&password=' + $scope.password + '&method=login' + '&thirdInfo=';
            $ajax($scope, $http, api.login, function(data) {
                    $.cookie('nickName', data.resultBody.nickName, {expires: 7, path: '/'});
                    var _gt3 = commonModuleBootstrap(false);
                    _gt3.mask('.modal-container', data.resultMessage, 1000, function() {
                        window.location.href = _gt3.href(window.location.href);
                    });
                },function(data){
                    $scope.error = data.resultMessage;
                }
            );
        }
    };
};

/*注册*/
function registerController($scope,ngDialog,$interval,$http){
    $scope.username = "";
    $scope.password = "";
    $scope.error  = "";
    $scope.code = "";
    $scope.send = "发送";
    $scope.cheched = true;
    $scope.setLogin = function($scope,$http){ 
        ngDialog.open({
            template: '/common/login.html',
            controller: 'loginController',
            //scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.setTime = function(register,id){
        $scope.error = '';
        $scope.phoneChecked = true;
        setTimeout(function() {
            $scope.phoneChecked = false;
        }, 1000);

        if(!register.username.$viewValue){
            $scope.error = '请填写您的手机号';
            return;
        }

        if(register.username.$invalid && register.username.$viewValue){
            $scope.error = '请填写正确的手机号';
            return;
        }  

        if ($scope.error || $scope.isDisabled) {
            return;
        } else {
            api.code.data = 'phone=' + this.username + '&type=' + id;
            $ajax($scope, $http, api.code, function(data) {
                    $scope.error = '';
                    countDown($scope,$interval);
                },function(data){
                    $scope.error= data.resultMessage;
                }
            );
        }
    };
    $scope.registerFun = function(register){
        $scope.error = '';

        if(!register.username.$viewValue){
            $scope.error = '请填写您的手机号';
            return;
        }

        if(register.username.$invalid && register.username.$viewValue){
            $scope.error = '请填写正确的手机号';
            return;
        }  

        if(!register.code.$viewValue){
            $scope.error = '请输入验证码';
            return;
        }

        if(register.code.$invalid){
            $scope.error = '验证码错误';
            return;
        }

        if(register.code.$viewValue.length < 6){
            $scope.error = '验证码错误';
            return;
        } 

        if(!register.password.$viewValue){
            $scope.error = '请填写密码';
            return;
        } 

        if(register.password.$viewValue.length < 6){
            $scope.error = '密码长度在6-20位';
            return;
        }   

        if(register.password.$invalid && register.password.$viewValue.length >5){
            $scope.error = '密码格式不正确';
            return;
        } 

        if(!$scope.cheched){
            $scope.error = '请同意服务条例';
            return;
        }  

        if ($scope.error) {
            return;
        } else {
            api.register.data = 'phone=' + $scope.username + '&password=' +  $scope.password + '&checkCode=' + $scope.code;
            $ajax($scope, $http, api.register,function(data){
                $scope.error = '';
                var _gt3 = commonModuleBootstrap(false);
                _gt3.mask('.modal-container', data.resultMessage, 1000, function() {
                    $scope.setLogin($scope,$http,ngDialog);
                });
            },function(data){
                $scope.error = data.resultMessage;
            });
        }
    };
    $scope.setService = function($scope,$http) {
        ngDialog.open({
            template: '/common/service.html',
            closeByDocument: false,
            className: 'modal-mask-service'
        }); 
    };
    commonModuleBootstrap(true);
};

/*忘记密码*/
function passwordController($scope,ngDialog,$interval,$http){
    $scope.username = "";
    $scope.password = "";
    $scope.error = "";
    $scope.code = "";
    $scope.send = "发送";
    $scope.passwordAgain = "";

    $scope.setLogin = function(){ 
        ngDialog.open({
            template: '/common/login.html',
            controller: 'loginController',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.setTime = function(passwordForm,id){
        $scope.error = '';
        $scope.phoneChecked = true;
        setTimeout(function() {
            $scope.phoneChecked = false;
        }, 1000);
       
        if(!passwordForm.username.$viewValue){
            $scope.error = '请填写您的手机号';
            return;
        }

        if(passwordForm.username.$invalid && passwordForm.username.$viewValue){
            $scope.error = '请填写正确的手机号';
            return;
        }  

        if ($scope.error || $scope.isDisabled) {
            return;
        } else {
            api.code.data = 'phone=' + this.username + '&type=' + id;
            $ajax($scope, $http, api.code, function(data) {
                    $scope.error = '';
                    countDown($scope,$interval);
                },function(data){
                    $scope.error = data.resultMessage;
                }
            );
        }
    };
    $scope.setLogin = function($scope,$http){
        ngDialog.open({
            template: '/common/login.html',
            controller: 'loginController',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask'
        });  
        ngDialog.closeAll();          
    };
    $scope.passwordFun = function(passwordForm){
        $scope.error = '';

        if(!passwordForm.username.$viewValue){
            $scope.error = '请填写您的手机号';
            return;
        }

        if(passwordForm.username.$invalid && passwordForm.username.$viewValue){
            $scope.error = '请填写正确的手机号';
            return;
        }  

        if(!passwordForm.code.$viewValue){
            $scope.error = '请输入验证码';
            return;
        }

        if(passwordForm.code.$invalid){
            $scope.error = '验证码错误';
            return;
        }

        if(passwordForm.code.$viewValue.length < 6){
            $scope.error = '验证码错误';
            return;
        } 

        if(!passwordForm.password.$viewValue){
            $scope.error = '请填写密码';
            return;
        } 

        if(passwordForm.password.$viewValue.length < 6){
            $scope.error = '密码长度在6-20位';
            return;
        }   

        if(passwordForm.password.$invalid && passwordForm.password.$viewValue.length >5){
            $scope.error = '密码错误';
            return;
        } 

        if(!passwordForm.passwordAgain.$viewValue){
            $scope.error = '请填写确认密码';
            return;
        } 

        if(passwordForm.passwordAgain.$viewValue.length < 6){
            $scope.error = '密码长度在6-20位';
            return;
        }   

        if(passwordForm.passwordAgain.$invalid && passwordForm.passwordAgain.$viewValue.length >5){
            $scope.error = '密码格式不正确';
            return;
        }

        if($.trim(passwordForm.passwordAgain.$viewValue) != $.trim(passwordForm.password.$viewValue)){
            $scope.error = '二次密码输入不一致';
            return;
        }   

        if ($scope.error) {
            return;
        } else {
            api.setPassword.data = 'phone=' + $scope.username + '&password=' + $scope.password + '&checkCode=' + $scope.code;
            $ajax($scope, $http, api.setPassword,function(data){
                $scope.error = '';
                var _gt3 = commonModuleBootstrap(false);
                _gt3.mask('.modal-container', data.resultMessage, 1000, function() {
                    window.location.href = _gt3.href(window.location.href);
                });
            },function(data){
                $scope.error = data.resultMessage;
            });
        }
    };
    commonModuleBootstrap(true);
};

/*60秒倒计时*/
function countDown($scope,$interval){  
    $scope.send = "发送";  
    $scope.isDisabled = false;  
    var second = 60,
    timePromise;
    timePromise = $interval(function(){  
        if (second<=0) {  
            $interval.cancel(timePromise);  
            timePromise = undefined;  
            second = 60;  
            $scope.send = "发送";  
            $scope.isDisabled = false; 
            $scope.paraevent = true;  
        } else {  
            $scope.send = second + "s后重发";  
            $scope.isDisabled = true;  
            second--;   
        }  
    },1000,100);  
};

/*全球指数*/
function globalIndex($scope,commonDate,$http,$interval){
    $scope.error = false; 
    $scope.isloading = true;
    $scope.isloadingExchange = true;
    var width = 278;
    var timer;
    var timerEChanage;  
    var animTimer;
    var animWidth = 50;
    var arr2;
    $ajax($scope, $http, api.stock, function(data) {
            $scope.data = commonDate.stockIndex = $scope.items = data.data;
            $scope.isloading = false;
            globalSwipe($('.global'), true);
        }
    );
    $ajax($scope, $http, api.rate, function(data) {
            $scope.exchangeItems = data.data;
            $scope.isloadingExchange = false; 
            globalSwipe($('.exchangeContainer'), true);
        }
    );
    function globalSwipe($slider, $width) {
        var timer = sliderTime($slider);
        $slider.on('mouseover', function() {
            clearInterval(timer);
        });
        $slider.on('mouseleave', function() {
            timer = sliderTime($slider);
        });
        function sliderTime($slider) {
            return setInterval(function(){            
                setSlider($slider, $width);
            }, 3000);
        };
        function setSlider($el, $width) {
            var $ul = $el.find('ul');
            var $li = $ul.find('li:eq(0)');
            var width = $li.width();
            var height = $li.height();
            var options = $width ? {'left': -width} : {'top': -height};
            $ul.stop(true,false).animate(options, {
                duration: 500,
                easing: 'linear',
                complete: function() {
                    $ul.append($li.clone());
                    $li.remove();
                    $ul.removeAttr('style');
                }
            });
        }; 
    };
};

/*外汇指数*/
function directBroadcastWhController($interval ,$scope,commonDate,$http){
    $scope.error = false;
    $scope.isloading = true;
    $scope.isCurrent = '4';
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

/*头部导航*/
function navHeader($scope,commonDate){
    $scope.color = commonDate.navBgClass;
    $scope.sideNav = !commonDate.isIndexHeader ? 'channelPage': '';
    $scope.isBaseHead = commonDate.isIndexHeader;
};

/*广告申请*/
function adPushCtrl($scope,ngDialog){
    $scope.adPush = function($scope){
        ngDialog.open({
            template: '/common/ad_push.html',
            controller: 'adCorsCtrl',
            scope: $scope,
            closeByDocument: false,
            className: 'modal-mask ad-mask'
        });  
        ngDialog.closeAll();          
    };
};
function adCorsCtrl($scope) {
    $scope.adFormShow = true;
    $scope.successMsgShow = !$scope.adFormShow;
    $scope.adPushSubmit = function() {
        var opt = api.adRequest;
        opt.data = 'applyChannel=NewRoadWeb&ownerName=' 
        + $scope.ownerName + '&cusName=' 
        + $scope.cusName + '&tel=' + $scope.tel;
        CORS(opt, function(data) {
        if(data.data === '1') {
            console.log(data.msg);
            $('#adPush').add('.ngdialog-close').addClass('ng-hide');
            $('#successMsg').removeClass('ng-hide');
            setTimeout(function() {
                $scope.closeThisDialog();
            }, 1000);
        } else if (data.data === '-1') {
            console.log(data.msg);
        }
        }, function(err) {
            consoel.log(err);
        });
    };
};

//第三方登录
function wb_Login(){   
    location = 'https://api.weibo.com/2/oauth2/authorize?client_id=1870081511&redirect_uri=http://www.xinrongnews.com/person/?from=weibo&state='+state;
};
 
function wx_Login(){
    location = "https://open.weixin.qq.com/connect/qrconnect?appid=wx2975e7bf85f812c8&redirect_uri=http://www.xinrongnews.com/person/?from=weixin&response_type=code&scope=snsapi_login&state="+state+"#wechat_redirect";
};

function qq_Login(){
    QC.Login.showPopup({
       appId:"101418625",
       redirectURI:"http://www.xinrongnews.com/person/?from=qq&state="+state
    });
};

/*底部工具条*/
$(function() {
    var $elem = $('#toolbar');
    var $li = $elem.find('li:gt(0)');
    $(function(){
        windowResize($elem);
        $('#directBroadcast ul').css('overflow','hidden').hover(function(){
            $(this).css('overflow','auto');
        },function(){
            $(this).css('overflow','hidden');
        });
    });
    $(window).resize(function() {
        windowResize($elem);
    }).scroll(function() {
        if($(document).scrollTop() > $(window).height() && $(window).width() > 1200){
            $elem.css('right',($(window).width() - $('.layout').width() - 100 )/2 - 10 +'px');
            $li.show();
            $elem.find('li').hover(function(){
                $(this).addClass('current').siblings().removeClass('current');
            },function(){
                $(this).removeClass('current');
            });                 
        }else{
            $li.hide();
        }
    });
    $elem.find('li:last').on('click',function(){
        if( $(document).scrollTop() > 0 ){
            $( 'body, html' ).animate({ scrollTop : 0 }, 800 );
        }
    });
    function windowResize($elem) {
        if($(window).width() > 1200){
            $elem.css('right',($(window).width() - $('.layout').width() - 100 )/2 - 10 +'px');
            $li.hide();
        }else{
            $li.hide();
        }    
    };
});

/*百度流量统计*/
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?1f85b086f73ec02254543a15879da3da";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();

/*百度自动推送*/
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else{
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
var _vds = _vds || [];
window._vds = _vds;
(function() {
    _vds.push(['setAccountId', '9218d76212131b60']);
    (function() {
        var vds = document.createElement('script');
        vds.type='text/javascript';
        vds.async = true;
        vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vds, s);
    })();
})();

//360自动推送
(function(){
   var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?0a964a2a0f5f05f997f58b65ed21d54e":"https://jspassport.ssl.qhimg.com/11.0.1.js?0a964a2a0f5f05f997f58b65ed21d54e";
   document.write('<script src="' + src + '" id="sozz"><\/script>');
})();

//站点统计
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1258426870'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1258426870%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));