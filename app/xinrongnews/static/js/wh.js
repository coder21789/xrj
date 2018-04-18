/**
 * 外汇首页模块
 *
 */

angular.module('cjhApp', ['ngDialog', 'cjhService', 'cjhFilter','cjhDirective', 'Template'])
    .controller('indexCtrl', ['$scope', function ($scope) {}])
    .controller('moneyRateCtrl', ['$scope', 'interfaceTYPE', 'reqJSON', 'intervalREQ', 
        function ($scope, interfaceTYPE, reqJSON, intervalREQ) { //各国利率
        $scope.moneyRateLoad = function() {
            var _interfaceTYPE = angular.copy(interfaceTYPE.moneyRate);
            reqJSON(_interfaceTYPE, function(data) {
                $scope.moneyRate = data.data;
            });
            intervalREQ(_interfaceTYPE, function(data) {
                $scope.moneyRate = data.data;
            }, 1);
        };
        $scope.moneyRateLoad();
    }])
    .controller('directQuotationCtrl', ['$scope', 'interfaceTYPE', 'reqJSON', 'intervalREQ', 
        function ($scope, interfaceTYPE, reqJSON, intervalREQ) { //直盘
        $scope.directQuotationLoad = function() {
            var _interfaceTYPE = angular.copy(interfaceTYPE.directQuotation);
            reqJSON(_interfaceTYPE, function(data) {
                $scope.directQuotation = data.data.slice(0,7);
            });
            intervalREQ(_interfaceTYPE, function(data) {
                $scope.directQuotation = data.data.slice(0,7);
            }, 1);
        };
        $scope.directQuotationLoad();
    }])
    .controller('crossMarketCtrl', ['$scope', 'interfaceTYPE', 'reqJSON', 'intervalREQ', 
        function ($scope, interfaceTYPE, reqJSON, intervalREQ) { //交叉盘
        $scope.crossMarketLoad = function() {
            var _interfaceTYPE = angular.copy(interfaceTYPE.crossMarket);
            reqJSON(_interfaceTYPE, function(data) {
                $scope.crossMarket = data.data;
            });
            intervalREQ(_interfaceTYPE, function(data) {
                $scope.crossMarket = data.data;
            }, 1);
        };
        $scope.crossMarketLoad();
    }])
    .controller('rmbRateCtrl', ['$scope', 'interfaceTYPE', 'reqJSON', 'intervalREQ', 
        function ($scope, interfaceTYPE, reqJSON, intervalREQ) { //人民币汇率
        var codeArray = ['USDCNY','EURCNY','GBPCNY','CNYJPY','HKDCNY','AUDCNY'];
        var codePush = function codePush(data, codeArray) {
            angular.forEach(data, function(ctx, index) {
                ctx.code = codeArray[index];
            });
            return data;
        };
        $scope.rmbRateLoad = function() {
            var _interfaceTYPE = angular.copy(interfaceTYPE.rmbRate);
            reqJSON(_interfaceTYPE, function(data) {
                var dataFinal = codePush(data.data, codeArray);
                $scope.rmbRate = dataFinal;
            });
            intervalREQ(_interfaceTYPE, function(data) {
                var dataFinalInterval = codePush(data.data, codeArray);
                $scope.rmbRate = dataFinalInterval;
            }, 1);
        };
        $scope.rmbRateLoad();
    }])
    .controller('qqrlCtrl', ['$scope', '$filter', function($scope, $filter){}]);

$(function() {
    var newsSubstring = function(tag, num) {
        tag.each(function(i) {
            if ($(this).text().length>num) {
                var _tag = $(this).text().substring(0,num);
                $(this).text(_tag);
            }
        });
    };
    newsSubstring($('.wh-news'), 20);
});