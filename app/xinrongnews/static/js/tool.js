(function(){
   
    var temp = {
    //计算复利终值
    '1005': "<div class='declare'>工具说明：</div>"+
                       "<p>复利终值计算器是计算以复利方式记息的终值或现值。复利的计算是考虑前一期利息再生利息的问题，要计入本金重复计息，即“利生利”“利滚利”。</p>"+
                       "<ul class='box'>"+
                            "<li>"+
                                "<div class='name'>计算项目：</div>"+
                                "<div class='diy_select'>"+
                                    "<div class='select-text'>"+
                                        "<input type='hidden' name='' class='diy_select_input' />"+
                                        "<div class='diy_select_txt'>计算复利终值</div>"+
                                        "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                    "</div>"+
                                    "<ul class='diy_select_list'>"+
                                        "<li>计算复利终值</li>"+
                                        "<li>计算存入本金</li>"+
                                    "</ul>"+
                                "</div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>存入本金：</div>"+
                                "<input type='text' name='capital' class='input-num' maxlength='20'/>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>年利率：</div>"+
                                "<input type='text' name='rate' class='input-percent' maxlength='20' />"+
                                "<div class='unit'>（%）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>存入年限：</div>"+
                                "<input type='text' name='years' class='input-num' maxlength='20' />"+
                                "<div class='unit'>（年）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<a class='submit'>开始计算</a>"+
                                "<a class='empty'>清空</a>"+
                            "</li>"+
                        "</ul>"+
                        "<div class='declare'>计算结果：</div>"+
                        "<ul class='result'>"+
                            "<li>"+
                                "<div class='name'>复利终值：</div>"+
                                "<div class='computed-result gray'>计算得出</div>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                        "</ul>",

    //计算存入本金
    '1005-1': "<div class='declare'>工具说明：</div>"+
                       "<p>复利终值计算器是计算以复利方式记息的终值或现值。复利的计算是考虑前一期利息再生利息的问题，要计入本金重复计息，即“利生利”“利滚利”。</p>"+
                       "<ul class='box'>"+
                            "<li>"+
                                "<div class='name'>计算项目：</div>"+
                                "<div class='diy_select'>"+
                                    "<div class='select-text'>"+
                                        "<input type='hidden' name='' class='diy_select_input' />"+
                                        "<div class='diy_select_txt'>计算存入本金</div>"+
                                        "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                    "</div>"+
                                    "<ul class='diy_select_list'>"+
                                        "<li>计算复利终值</li>"+
                                        "<li>计算存入本金</li>"+
                                    "</ul>"+
                                "</div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>复利终值：</div>"+
                                "<input type='text' name='' class='input-num' maxlength='20'/>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>年利率：</div>"+
                                "<input type='text' name='' class='input-percent' maxlength='20' />"+
                                "<div class='unit'>（%）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>存入年限：</div>"+
                                "<input type='text' name='' class='input-num' maxlength='20' />"+
                                "<div class='unit'>（年）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<a class='submit'>开始计算</a>"+
                                "<a class='empty'>清空</a>"+
                            "</li>"+
                        "</ul>"+
                        "<div class='declare'>计算结果：</div>"+
                        "<ul class='result'>"+
                            "<li>"+
                                "<div class='name'>存入本金：</div>"+
                                "<div class='computed-result gray'>计算得出</div>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                        "</ul>",

    //计算将来某时刻现金购买力价值
    '1006': "<div class='declare'>工具说明：</div>"+
                       "<p>通货膨胀是指商品和劳务的货币价格总水平的持续上涨现象。如果通货膨胀持续为正数，它会使持有的现金在将来的购买力减弱，也会使商品价格水平逐年提升。</p>"+
                       "<ul class='box'>"+
                            "<li>"+
                                "<div class='name'>您希望计算：</div>"+
                                "<input type='text' name='' class='input-num short' maxlength='20'/>"+
                                "<div class='tips'>年后通货膨胀对消费的影响</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>计算项目：</div>"+
                                "<div class='diy_select'>"+
                                    "<div class='select-text'>"+
                                        "<input type='hidden' name='' class='diy_select_input' />"+
                                        "<div class='diy_select_txt'>将来某时刻现金购买力价值</div>"+
                                        "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                    "</div>"+
                                    "<ul class='diy_select_list'>"+
                                        "<li>将来某时刻现金购买力价值</li>"+
                                        "<li>将来某时刻某种商品的价格</li>"+
                                    "</ul>"+
                                "</div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>目前持有的现金金额：</div>"+
                                "<input type='text' name='' class='input-num' maxlength='20'/>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<div class='name'>您所预期的年通货膨胀率：</div>"+
                                "<input type='text' name='' class='input-percent' maxlength='20' />"+
                                "<div class='unit'>（%）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                            "<li>"+
                                "<a class='submit'>开始计算</a>"+
                                "<a class='empty'>清空</a>"+
                            "</li>"+
                        "</ul>"+
                        "<div class='declare'>计算结果：</div>"+
                        "<ul class='result'>"+
                            "<li>"+
                                "<div class='name'>X年后您的现金购买力为：</div>"+
                                "<div class='computed-result gray'>计算得出</div>"+
                                "<div class='unit'>（元）</div>"+
                                "<div class='error'></div>"+
                            "</li>"+
                        "</ul>",

    //计算将来某时刻现金购买力价值
    '1006-1': "<div class='declare'>工具说明：</div>"+
                   "<p>通货膨胀是指商品和劳务的货币价格总水平的持续上涨现象。如果通货膨胀持续为正数，它会使持有的现金在将来的购买力减弱，也会使商品价格水平逐年提升。</p>"+
                   "<ul class='box'>"+
                        "<li>"+
                            "<div class='name'>您希望计算：</div>"+
                            "<input type='text' name='' class='input-num short' maxlength='20'/>"+
                            "<div class='tips'>年后通货膨胀对消费的影响</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>计算项目：</div>"+
                            "<div class='diy_select'>"+
                                "<div class='select-text'>"+
                                    "<input type='hidden' name='' class='diy_select_input' />"+
                                    "<div class='diy_select_txt'>将来某时刻某种商品的价格</div>"+
                                    "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                "</div>"+
                                "<ul class='diy_select_list'>"+
                                    "<li>将来某时刻现金购买力价值</li>"+
                                    "<li>将来某时刻某种商品的价格</li>"+
                                "</ul>"+
                            "</div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>目前该商品的价格：</div>"+
                            "<input type='text' name='' class='input-num' maxlength='20'/>"+
                            "<div class='unit'>（元）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>您所预期的年通货膨胀率：</div>"+
                            "<input type='text' name='' class='input-percent' maxlength='20' />"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<a class='submit'>开始计算</a>"+
                            "<a class='empty'>清空</a>"+
                        "</li>"+
                    "</ul>"+
                    "<div class='declare'>计算结果：</div>"+
                    "<ul class='result'>"+
                        "<li>"+
                            "<div class='name'>X年后该种商品的价格是：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（元）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                    "</ul>",

    //计算通货膨胀影响投资计算器
    '1007': "<div class='declare'>工具说明：</div>"+
                   "<p>进行投资时，通货膨胀对投资收益所造成的影响是不能忽略的。本计算器将计算出在扣除通货膨胀部分后，投资所获得的实际收益。</p>"+
                   "<ul class='box'>"+
                        
                        "<li>"+
                            "<div class='name'>初始投资金额：</div>"+
                            "<input type='text' name='' class='input-num' maxlength='20'/>"+
                            "<div class='unit'>（元）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>存入年限：</div>"+
                            "<input type='text' name='' class='input-num' maxlength='20' />"+
                            "<div class='unit'>（年）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>预期年收益率：</div>"+
                            "<input type='text' name='' class='input-percent' maxlength='20' />"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>预期年通货膨胀率：</div>"+
                            "<input type='text' name='' class='input-percent' maxlength='20' />"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<a class='submit'>开始计算</a>"+
                            "<a class='empty'>清空</a>"+
                        "</li>"+
                    "</ul>"+
                    "<div class='declare'>计算结果：</div>"+
                    "<ul class='result'>"+
                        "<li>"+
                            "<div class='name'>到期本利总额：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（元）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>到期本利总额的实际购买力：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（元）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>扣除通货膨胀后实际收益率：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                    "</ul>",

    //计算期间收益
    '1008': "<div class='declare'>工具说明：</div>"+
                   "<p>为了比较两个不同期限的收益率的高低，需要将两个收益率转换为相同期限后进行比较。通过本转换器，可以对期间收益率以及年化收益率进行相互转换。</p>"+
                   "<ul class='box'>"+
                        "<li>"+
                            "<div class='name'>请选择转换类型：</div>"+
                            "<div class='diy_select'>"+
                                "<div class='select-text'>"+
                                    "<input type='hidden' name='' class='diy_select_input' />"+
                                    "<div class='diy_select_txt'>年化收益转换为期间收益</div>"+
                                    "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                "</div>"+
                                "<ul class='diy_select_list'>"+
                                    "<li>年化收益转换为期间收益</li>"+
                                    "<li>期间收益转换为年化收益</li>"+
                                "</ul>"+
                            "</div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>年化收益率：</div>"+
                            "<input type='text' name='' class='input-percent' maxlength='20' />"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>投资时间：</div>"+
                            "<input type='text' name='' class='input-num' maxlength='20' />"+
                            "<div class='unit'>（月）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<a class='submit'>开始计算</a>"+
                            "<a class='empty'>清空</a>"+
                        "</li>"+
                    "</ul>"+
                    "<div class='declare'>计算结果：</div>"+
                    "<ul class='result'>"+
                        "<li>"+
                            "<div class='name'>期间收益：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                    "</ul>",

    //计算年化收益
    '1008-1': "<div class='declare'>工具说明：</div>"+
                   "<p>为了比较两个不同期限的收益率的高低，需要将两个收益率转换为相同期限后进行比较。通过本转换器，可以对期间收益率以及年化收益率进行相互转换。</p>"+
                   "<ul class='box'>"+
                        "<li>"+
                            "<div class='name'>请选择转换类型：</div>"+
                            "<div class='diy_select'>"+
                                "<div class='select-text'>"+
                                    "<input type='hidden' name='' class='diy_select_input' />"+
                                    "<div class='diy_select_txt'>期间收益转换为年化收益</div>"+
                                    "<div class='diy_select_btn iconfont icon-xia'></div>"+
                                "</div>"+
                                "<ul class='diy_select_list'>"+
                                    "<li>年化收益转换为期间收益</li>"+
                                    "<li>期间收益转换为年化收益</li>"+
                                "</ul>"+
                            "</div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>期间收益：</div>"+
                            "<input type='text' name='' class='input-percent' maxlength='20' />"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<div class='name'>投资时间：</div>"+
                            "<input type='text' name='' class='input-num' maxlength='20' />"+
                            "<div class='unit'>（月）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                        "<li>"+
                            "<a class='submit'>开始计算</a>"+
                            "<a class='empty'>清空</a>"+
                        "</li>"+
                    "</ul>"+
                    "<div class='declare'>计算结果：</div>"+
                    "<ul class='result'>"+
                        "<li>"+
                            "<div class='name'>年化收益率：</div>"+
                            "<div class='computed-result gray'>计算得出</div>"+
                            "<div class='unit'>（%）</div>"+
                            "<div class='error'></div>"+
                        "</li>"+
                    "</ul>",

    //计算股票市盈率
    '1001': "<ul class='box'>"+
                "<li>"+
                    "<div class='name'>股票价格：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>企业每股税后利润：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<a class='submit'>开始计算</a>"+
                    "<a class='empty'>清空</a>"+
                "</li>"+
            "</ul>"+
            "<div class='declare'>计算结果：</div>"+
            "<ul class='result'>"+
                "<li>"+
                    "<div class='name'>股票市盈率：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'></div>"+
                    "<div class='error'></div>"+
                "</li>"+
            "</ul>",

     //计算基金认购份额
    '1002': "<ul class='box'>"+
                "<li>"+
                    "<div class='name'>认购金额：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>单位份额基金净值：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>认购费率（0-1.5）：</div>"+
                    "<input type='text' name='' class='input-percent limit' maxlength='20' />"+
                    "<div class='unit'>（%）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>同业存款利率：</div>"+
                    "<input type='text' name='' class='input-percent' maxlength='20' />"+
                    "<div class='unit'>（%）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>认购日期：</div>"+
                    "<input type='text' name='startDate' class='input-time' maxlength='20' id='startDate' readonly='readonly'/>"+
                    "<div class='unit'></div>"+
                    "<div class='error'></div>"+
                "</li>"+
                 "<li>"+
                    "<div class='name'>成立日期：</div>"+
                    "<input type='text' name='endDate' class='input-time' maxlength='20' id='endDate' readonly='readonly'/>"+
                    "<div class='unit'></div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<a class='submit'>开始计算</a>"+
                    "<a class='empty'>清空</a>"+
                "</li>"+
            "</ul>"+
            "<div class='declare'>计算结果：</div>"+
            "<ul class='result'>"+
                "<li>"+
                    "<div class='name'>认购手续费：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>认购期利息结转：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>认购份额：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（份）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
            "</ul>",

    //计算基金赎回资金
    '1003': "<ul class='box'>"+
                "<li>"+
                    "<div class='name'>赎回份额：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>单位基金净值：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>赎回费率（0-0.5）：</div>"+
                    "<input type='text' name='' class='input-percent limit' maxlength='20' />"+
                    "<div class='unit'>（%）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<a class='submit'>开始计算</a>"+
                    "<a class='empty'>清空</a>"+
                "</li>"+
            "</ul>"+
            "<div class='declare'>计算结果：</div>"+
            "<ul class='result'>"+
                "<li>"+
                    "<div class='name'>赎回手续费：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>实际可得资金：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
            "</ul>",

    //计算基金赎回资金
    '1004': "<ul class='box'>"+
                "<li>"+
                    "<div class='name'>转出基金净值：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（元）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>转出基金份额：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（份）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>转出基金赎回费率：</div>"+
                    "<input type='text' name='' class='input-percent' maxlength='20' />"+
                    "<div class='unit'>（%）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>转入基金净值：</div>"+
                    "<input type='text' name='' class='input-num' maxlength='20' />"+
                    "<div class='unit'>（份）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<div class='name'>转出补差费率：</div>"+
                    "<input type='text' name='' class='input-percent' maxlength='20' />"+
                    "<div class='unit'>（%）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
                "<li>"+
                    "<a class='submit'>开始计算</a>"+
                    "<a class='empty'>清空</a>"+
                "</li>"+
            "</ul>"+
            "<div class='declare'>计算结果：</div>"+
            "<ul class='result'>"+
                "<li>"+
                    "<div class='name'>转入份额：</div>"+
                    "<div class='computed-result gray'>计算得出</div>"+
                    "<div class='unit'>（份）</div>"+
                    "<div class='error'></div>"+
                "</li>"+
            "</ul>"

    };

    $('.menu-list a[data-id="'+id+'"]').addClass('current');
    $('.tool .tool-desc').html(temp[id]);

    submit(id);

   
    function submit(id) {
        var TTDiy_select = new diy_select({ //参数可选
            TTContainer: 'diy_select', //控件的class
            TTDiy_select_input: 'diy_select_input', //用于提交表单的class
            TTDiy_select_txt: 'diy_select_txt', //diy_select用于显示当前选中内容的容器class
            TTDiy_select_btn: 'diy_select_btn', //diy_select的打开按钮
            TTDiv_select_list: 'diy_select_list', //要显示的下拉框内容列表class
            TTFcous: 'focus', //得到焦点时的class
            TTCurrent: 'current', //选中时的class
            TTHover: 'hover',//点击时的class ,
            render: function(i){
                var ids = i ? id+'-'+i : id;
                $('.tool .tool-desc').html(temp[ids]);
                submit(ids);
                new diy_select(this);
            }
        }); //如同时使用多个时请保持各class一致.

        $('.tool input:text').on('focus',function(){
            $(this).siblings('.error').hide();
        })
        $('.tool .submit').on('click',function(){
            $(this).closest('ul').find('.error').hide();
            var reg = /^\d+(\.\d{1,2})?$/;
            $('.tool input:text').each(function(){
                var value = $.trim($(this).val());
                var text = $(this).siblings('.name').text();
                if(!value){
                    $(this).siblings('.error').html('<i class="iconfont icon-cuowutishi1"></i>'+text.substr(0,text.length-1)+'为空').show();
                    return false;
                }else{
                    if (!reg.test(value) && !$(this).hasClass('input-time')) {
                        $(this).siblings('.error').html('<i class="iconfont icon-cuowutishi1"></i>请填写正确的数值（最多2位小数）').show();
                        return false;
                    }
                    if(id == '1003' && $(this).hasClass('limit') && parseFloat(value) > 0.5) {
                        $(this).siblings('.error').html('<i class="iconfont icon-cuowutishi1"></i>赎回费率在0-0.5之间').show();
                        return false;
                    }

                    if(id == '1002' && $(this).hasClass('limit') && parseFloat(value) > 1.5) {
                        $(this).siblings('.error').html('<i class="iconfont icon-cuowutishi1"></i>认购费率在0-1.5之间').show();
                        return false;
                    }
                }
            })

            if(!$(this).closest('ul').find('.error:visible').length){
                calculator[id].call(this);
            }
        })

        layui.use('laydate', function(){

            var laydate = layui.laydate;
            var currentDate = laydate.now(1,"YYYY/MM/DD hh:mm:ss");
            var start = {
                min: laydate.now(),
                max: '2099-06-16 23:59:59',
                istoday: false,
                choose: function(datas){
                  var newDate = moment(datas).add(1,'days').format('YYYY-MM-DD hh:mm:ss');
                  end.min = newDate; //开始日选好后，重置结束日的最小日期
                  end.start = newDate;//将结束日的初始值设定为开始日
                }
            };
           
            var end = {
                min: currentDate,
                start: currentDate,
                max: '2099-06-16 23:59:59',
                istoday: false,
                choose: function(datas){
                  var newDate = moment(datas).subtract(1,'days').format('YYYY-MM-DD hh:mm:ss');
                  start.max = newDate; //结束日选好后，重置开始日的最大日期
                }
            };
           
            $('#startDate').on('click', function(){
                start.elem = this;
                laydate(start);
            })

            $('#endDate').on('click', function(){
                end.elem = this
                laydate(end);
            })  
        });

        $('.tool .empty').on('click',function(){
           $('.tool .tool-desc').html(temp[id]);
           submit(id);
        })
    }

    //计算器
    var calculator ={
        '1005': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(0).val(),
                e = input.eq(1).val(),
                t = input.eq(2).val(),
                n = 1,
                total = calc_c(e, n, t, r),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1005-1': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(0).val(),
                e = input.eq(1).val(),
                t = input.eq(2).val(),
                n = 1,
                total = calc_p(e, n, t, r),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1006': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(1).val(),
                e = input.eq(2).val(),
                t = input.eq(0).val(),
                total = calc_i(e, t, r),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1006-1': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(1).val(),
                e = input.eq(2).val(),
                t = input.eq(0).val(),
                total = calc_w(e, t, r),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1007': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(0).val(),
                e = input.eq(2).val(),
                t = input.eq(1).val(),
                n = input.eq(3).val(),
                total = calc_t(e, t, n, r),
                str0  = returnStr(total.total_cost),
                str1  = returnStr(total.real_buy_cost),
                str2  = returnStr(total.real_inflation_cost);
            $('.computed-result').removeClass('gray').eq(0).text(str0);
            $('.computed-result').eq(1).text(str1);
            $('.computed-result').eq(2).text(str2);
        },
        '1008': function calculator() {
            var input = $('.tool input:text'),
                e = input.eq(0).val(),
                t = input.eq(1).val(),
                total = calc_m(e, t),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1008-1': function calculator() {
            var input = $('.tool input:text'),
                e = input.eq(0).val(),
                t = input.eq(1).val(),
                total = calc_y(e, t),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1001': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(0).val(),
                rr = input.eq(1).val(),
                total = calc_s(r,rr),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        },
        '1002': function calculator() {
            var input = $('.tool input:text'),
                r = input.eq(0).val(),
                rr = input.eq(1).val(),
                e = input.eq(2).val(),
                ee = input.eq(3).val(),
                t1 = input.eq(4).val(),
                t2 = input.eq(5).val(),
                total = calc_f(e, ee, r, rr, t1, t2),
                str0  = returnStr(total.cost),
                str1  = returnStr(total.rate),
                str2  = returnStr(total.num);
            $('.computed-result').removeClass('gray').eq(0).text(str0);
            $('.computed-result').eq(1).text(str1);
            $('.computed-result').eq(2).text(str2);
        },
        '1003': function calculator() {
            var input = $('.tool input:text'),
                n = input.eq(0).val(),
                r = input.eq(1).val(),
                e = input.eq(2).val(),
                total = calc_j(e, r, n),
                str0  = returnStr(total.commission),
                str1  = returnStr(total.capital);
            $('.computed-result').removeClass('gray').eq(0).text(str0);
            $('.computed-result').eq(1).text(str1);
        },
        '1004': function calculator() {
            var input = $('.tool input:text'),
                n = input.eq(1).val(),
                r = input.eq(0).val(),
                e = input.eq(2).val(),
                rr = input.eq(3).val(),
                ee = input.eq(4).val(),
                total = calc_jj(e, r, n, rr, ee),
                str  = returnStr(total);
            $('.computed-result').removeClass('gray').text(str);
        }


    }

    /*返回字段处理*/
    function returnStr(n){
        var num = parseInt(n,10);
        var str = num.toString().length > 20 || isNaN(num) ? '超范围，无法计算': n;
        return str;
    }

    /*计算复利率： e是利率，t是年限，r是金额，n是次数 固定为1*/
    function calc_c(e, t, n, r) {
        var i = parseFloat(e) / 100,
            s = parseInt(t),
            o = parseFloat(n),
            u = Math.pow(1 + i / s, s) - 1,
            a = parseFloat(r),
            f = a * Math.pow(1 + u, o);
        return Round(f, 2)
    }

    /*计算本金：e是利率，t是年限，r是金额，n是次数 固定为1*/
    function calc_p(e, t, n, r) {
        var i = parseFloat(e) / 100,
            s = parseInt(t),
            o = parseFloat(n),
            u = Math.pow(1 + i / s, s) - 1,
            a = parseFloat(r),
            f = a * Math.pow(1 + u, -o);
        return Round(f, 2)
    }

    /*计算购买力：e是利率，t是年限，r是金额*/
    function calc_i(e, t, r) {
        var i = parseFloat(e) / 100,
            s = parseInt(t),
            a = parseFloat(r),
            f = a / Math.pow(1 + i, s);
        return Round(f, 2)
    }

    /*计算商品价格：e是利率，t是年限，r是金额*/
    function calc_w(e, t, r) {
        var i = parseFloat(e) / 100,
            s = parseInt(t),
            a = parseFloat(r),
            f = a * Math.pow(1 + i, s);
        return Round(f, 2)
    }

    /*计算通货膨胀影响投资：e是利率，t是年限，r是金额，n是通货膨胀率 需要收入*/
    function calc_t(e, t, n, r) {
        var i = parseFloat(e) / 100,
            s = parseInt(t),
            a = parseFloat(r),
            o = parseFloat(n) / 100,
            u = a * Math.pow(1 + i, s);
            f = a * Math.pow((1 + i) / (1 + o), s),
            m = (1 + i) / (1 + o) - 1,
            w = Math.round(m * 10000) / 100;
        return {
            total_cost: Round(u, 2),
            real_buy_cost: Round(f, 2),
            real_inflation_cost : Round(w, 2)
        }
    }

    /*计算期间收益：e是利率，t是月份*/
    function calc_m(e, t) {
        var i = parseFloat(e) / 100,
            s = parseFloat(t),
            f = (Math.pow(1 + i,s / 12) - 1) * 100;
        return Round(f, 2)
    }

    /*计算年化收益：e是利率，t是月份*/
    function calc_y(e, t) {
        var i = parseFloat(e) / 100,
            s = parseFloat(t),
            f = (Math.pow(1 + i,12 / s) - 1) * 100;
        return Round(f, 2)
    }

    /*计算股票市盈率：r是价格，rr是利润*/
    function calc_s(r, rr) {
        var a = parseFloat(r),
            aa = parseFloat(rr),
            f = a / aa;
        return Round(f, 2)
    }

    /*计算基金认购份额：r是认购价，rr是净值，e是认购费率，ee是存款利率，t1是认购日期，t2是成立时间*/
    function calc_f(e, ee, r, rr, t1, t2) {
        var i = parseFloat(e) / 100,
            ii = parseFloat(ee) / 100,
            a = parseFloat(r),
            aa = parseFloat(rr),
            s = moment(t1),
            ss = moment(t2),
            d =  parseInt(ss.diff(s,'days')),
            o =  a * i / (1 + i),
            f = a * ii * d / 365,
            m = (a - o + f) / rr;
        return {
            cost: Round(o, 2),
            rate: Round(f, 2),
            num : Round(m, 2)
        }
    }

    /*计算基金赎回资金：e是赎回费率，r是净值，n是份额*/
    function calc_j(e, r, n) {
        var i = parseFloat(e) / 100,
            a = parseFloat(r),
            o = parseFloat(n),
            c = n * a,
            f = c * i,
            m = c - f;
        return {
            commission: Round(f, 2),
            capital: Round(m, 2)
        }
    }

    /*计算基金转换：e是转出赎回费率，r是转出净值，n是转出份额，rr转出净值，ee补差费率*/
    function calc_jj(e, r, n, rr, ee) {
        var i = parseFloat(e) / 100,
            a = parseFloat(r),
            o = parseFloat(n),
            aa = parseFloat(rr),
            ii = parseFloat(ee) / 100,
            f = ((o * a *(1 - i)) / (1 + ii)) / aa;
        return Round(f, 2);
    }

    function Round(e, t) {
        return t == 0 ? p = 1 : t ? p = Math.pow(10, t) : p = 100, Math.round(e * p) / p
    }

})()