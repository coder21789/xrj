/*
* 外汇全球日历
* @2016.12.14
*/


//时间格式化
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        //month
        "d+": this.getDate(),
        //day
        "h+": this.getHours(),
        //hour
        "m+": this.getMinutes(),
        //minute
        "s+": this.getSeconds(),
        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//字符串转 日期
function strToDate(strDate) {
    if (strDate.indexOf('--:--') > -1) {
        return '--:--';
    }
    strDate = strDate.replace(/-/g, "/");
    var newDate = new Date(strDate);
    return newDate.format("hh:mm");
};

//str 空值时 设置默认值
function nullDefault(str) {
    if (typeof(str) == "undefined" || str == null || str == "") {
        str = '';
    }
    return str
};

// 价格处理
function price_handle(price, defaultValue) {
    var defaultVal = defaultValue ? defaultValue : '--';

    if (price) {
        if (price.toString().indexOf('-') > 0 || escape(price).indexOf("%u") >= 0) {
            /* 包含中文 9-0-2 */
            price = price;
        } else {
            var prefix = price.toString().indexOf('+') == 0 ? '+' : '';
            var pos = price.indexOf('.');
            pos = pos > 0 ? pos + 2 : -1;
            if (price.toString().charAt(pos)) {
                price = prefix + parseFloat(price).toFixed(2);
            } else {
                price = price;
            }
        }
    } else {
        price = defaultVal;
    }
    return price;
};

/* 指标重要度 */
function level(str) {
    if (typeof(str) == "undefined" || str == null || str == "") {
        return 1;
    } else {
        return str;
    }
};

/* 处理指标单位 */
function unit(str) {
    if (typeof(str) == "undefined" || str == null || str == "") return '';
    if (str) {
        return "(" + str + ")";
    }
};

//根据国家名获取国旗
function country(name) {
    var cl = "";
    if (name) {
        name = name.replace(/^\s+|\s+$/g, '');
        switch (name) {
            case '新西兰':
                cl = 'new_zealand';
                break;
            case '俄罗斯':
                cl = 'russia';
                break;
            case '新加坡':
                cl = 'singapore';
                break;
            case '义大利':
                cl = 'italy';
                break;
            case '意大利':
                cl = 'italy';
                break;
            case '卢森堡':
                cl = 'luxembourg';
                break;
            case '阿根廷':
                cl = 'argentina';
                break;
            case '埃及':
                cl = 'egypt';
                break;
            case '日本':
                cl = 'japan';
                break;
            case '利比亚':
                cl = 'libya';
                break;
            case '瑞士':
                cl = 'switzerland';
                break;
            case '台湾':
                cl = 'taiwan';
                break;
            case '英国':
                cl = 'uk';
                break;
            case '南非':
                cl = 'south_africa';
                break;
            case '西班牙':
                cl = 'spain';
                break;
            case '瑞典':
                cl = 'sweden';
                break;
            case '以色列':
                cl = 'israel';
                break;
            case '中国':
                cl = 'china';
                break;
            case '欧元区':
            case '欧盟':
                cl = 'european_union';
                break;
            case '法国':
                cl = 'france';
                break;
            case '澳大利亚':
                cl = 'australia';
                break;
            case '巴西':
                cl = 'brazil';
                break;
            case '加拿大':
                cl = 'canada';
                break;
            case '印度':
                cl = 'indea';
                break;
            case '伊朗':
                cl = 'iran';
                break;
            case '伊拉克':
                cl = 'iraq';
                break;
            case '德国':
                cl = 'germany';
                break;
            case '希腊':
                cl = 'greece';
                break;
            case '香港':
                cl = 'hong_kong';
                break;
            case '美国':
                cl = 'usa';
                break;
            case '奥地利':
                cl = 'austria';
                break;
            case '智利':
                cl = 'chile';
                break;
            case '泰国':
                cl = 'thailand';
                break;
            case '乌克兰':
                cl = 'ukraine';
                break;
            case '科威特':
                cl = 'kuwait';
                break;
            case '沙特阿拉伯':
                cl = 'saudi_arabia';
                break;
            case '委内瑞拉':
                cl = 'venezuela';
                break;
            case '印度尼西亚':
                cl = 'indonesia';
                break;
            case '爱尔兰':
                cl = 'the_irish';
                break;
            case '安哥拉':
                cl = 'angola';
                break;
            case '比利时':
                cl = 'belgium';
                break;
            case '葡萄牙':
                cl = 'portugal';
                break;
            case '土耳其':
                cl = 'turkey';
                break;
            case '挪威':
                cl = 'Norwegian';
                break;
            case 'OECD':
                cl = 'oecd';
                break;
            case '韩国':
                cl = 'korea_south';
                break;
            case '秘鲁':
                cl = 'peru';
                break;
            default:
                cl = 'null_flags';
                break;
        }
    } else {
        cl = 'null_flags';
    }
    return cl;
};

function fill(data) {
    if (!data || data.length < 1) {
        dataHtml = '<div class="errorMsg">暂无财经数据发行公布！</div>';
        $("#current_data").hide();
        $(".floor1 .errorMsg").remove();
        $(".floor1").append(dataHtml);
        return;
    }
    dataHtml = '<tr><th width="75">时间</th><th width="90">国家地区</th><th width="450">指标</th><th width="85">前值</th><th width="80">预测值</th><th width="80">公布值</th><th width="80">重要性</th><th width="95">利多&nbsp;利空</th><th width="80">解读</th></tr>';
    data = JSON.parse(data); 
    var ids = "";
    $.each(data, function(time, val) {
        $.each(val, function(pid, va) {
            $.each(va, function(index, v) {
                var hot = level(v.IDX_RELEVANCE) > 2? 'hot' :'';
               
                if (v['IDX_RELEVANCE'] > 2)  {
                    dataHtml += '<tr class="'+hot+'">';
                } else {
                    dataHtml += '<tr class="'+hot+'">';
                }
                if (index == 0) {
                    dataHtml += '<td rowspan="' + va.length + '" class="time tab_time' + v.IDX_ID + '">' + strToDate(time) + '</td>';
                    dataHtml += '<td rowspan="' + va.length + '" class="flag tab_time' + v.IDX_ID + '"><span class="c_' + country(v.COUNTRY_CN) + ' circle_flag"></span></td>';
                }
                if (!v.IDX_PID || va[0]['IDX_PID']) {
                    if(va.length >1){
                        // dataHtml += '<td  class="event"><a target="_blank" href="/wh/rl/' + v.IDX_ID + '.html">' + nullDefault(v.COUNTRY_CN) + nullDefault(v.IDX_PERIOD) + v.IDX_DESC_CN + unit(v.UNIT) + '</a><span title="点击展开分项指标" class="primary close" idx="' + v.IDX_ID + '">-</span></td>';
                        dataHtml += '<td  class="event"><a target="_blank" href="/wh/rl/' + v.IDX_ID + '.html">' + nullDefault(v.COUNTRY_CN) + nullDefault(v.IDX_PERIOD) + v.IDX_DESC_CN + unit(v.UNIT) + '</a></td>';
                        ids = 'follow' + v.IDX_ID;
                    }else{
                        dataHtml += '<td  class="event"><a target="_blank" href="/wh/rl/' + v.IDX_ID + '.html">' + nullDefault(v.COUNTRY_CN) + nullDefault(v.IDX_PERIOD) + v.IDX_DESC_CN + unit(v.UNIT) + '</a></td>';
                        ids = '';
                    }
                   
                } else {
                    dataHtml += '<td  class="event '+ids+'"><a target="_blank" href="/wh/rl/' + v.IDX_ID + '.html">--' + nullDefault(v.COUNTRY_CN) + nullDefault(v.IDX_PERIOD) + v.IDX_DESC_CN + unit(v.UNIT) + '</a></td>';
                }
                dataHtml += '<td class="beforeVal">' + price_handle(v.PREVIOUS_PRICE) + '</td>';
                dataHtml += '<td class="predictionVal">' + price_handle(v.SURVEY_PRICE) + '</td>';
                dataHtml += '<td class="publishVal" id="' + v.IDX_ID + '">' + price_handle(v.ACTUAL_PRICE, "<span class='search_tag'>侦查中</sapn>") + '</td>';
                if(level(v.IDX_RELEVANCE) < 2){
                    dataHtml += '<td class="level level1"><span>低</span></td>';
                }else if(level(v.IDX_RELEVANCE) < 3){
                    dataHtml += '<td class="level level2"><span>中</span></td>';
                }else{
                    dataHtml += '<td class="level level3"><span>高</span></td>';
                }
                dataHtml += '<td class="profit">';
                if (v.liduo || v.likong) {
                    if (v.liduo) {
                        dataHtml += '<div class="red">利多 ' + v.liduo + ' </div>';
                    }
                    if (v.likong) {
                        dataHtml += '<div class="green">利空 ' + v.likong + ' </div>';
                    }
                } else {
                    dataHtml += "--";
                }
                dataHtml += '</td>';
                dataHtml += '<td class="last"><a target="_blank" href="/wh/rl/' + v.IDX_ID + '.html" class="link iconfont icon-qushitu"></a></td>';
                dataHtml += "</tr>";          
            });
        });
    });
    $(".floor1 .errorMsg").remove();
    $("#current_data").html(dataHtml).show();
};

function getCountry(params) {
    params.date = $('#day li[data-time]').attr('data-time') || '';
    $.ajax({
        type: "post",
        dataType: "json",
        url: '/news/getFxNews',
        data: params,
        success: function(data) {
            fill(data.data);
        }
    });
};
var params;

(function(){
    $('#refresh').on('click',function(){
        location = location;
    });
})();

