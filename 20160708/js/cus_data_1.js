/*判断mychart-line-1*/
if($('.mychart-line-1').length>0){
    var option1 = {
        title : {
            text: '实时交易数据',
            subtext: '',
            x: 'left',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        color: [
            '#87cefa','#ed7b53'
        ],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        grid: {
            left: '50px'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#BDC0CF'
                    }
                },
                data : [
                    '2016/01/02 05:00','2016/01/02 06:00','2016/01/02 07:00','2016/01/02 08:00','2016/01/02 09:00','2016/01/02 10:00','2016/01/02 11:00','2016/01/02 12:00'
                ].map(function (str) {
                    return str.replace(' ', '\n')
                }),
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#5a6378']
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: 500,
                axisLine: {
                    lineStyle: {
                        color: '#BDC0CF'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#5a6378']
                    }
                }
            }
        ],
        series: [
            {
                name:'借款',
                type:'line',
                animation: true,
                smooth: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true
                },
                data:[
                    123,182,265,245,236,454,332
                ]
            },
            {
                name:'还款',
                type:'line',
                animation: true,
                smooth: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true
                },
                data:[
                    223,382,165,445,336,354,232
                ]
            }
        ]
    };

    var app1={};
    app1.bool=true;

    var myChart1=echarts.init(document.querySelector('.mychart-line-1'));
    var refreshCharts1=function(){
        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

        option1.grid.width= ($('.mychart-line-1').width()-80) +'px';

        var data = option1.series[0].data;
        var data1 = option1.series[1].data;
        data.shift();
        data1.shift();
        data.push(Math.round(Math.random() * 500));
        data1.push(Math.round(Math.random() * 500));

        option1.xAxis[0].data.shift();
        option1.xAxis[0].data.push(axisData);

        myChart1.setOption(option1);

        if(app1.bool){
            $('.wrapper-left').toggleClass('hide');$('.wrapper-right').toggleClass('lw');
            app1.bool=false;
        }
    }

    refreshCharts1();
    clearInterval(app1.timeTicket);
    app1.timeTicket = setInterval('refreshCharts1()',1000);
}

/*判断mychart-bar*/
if($('.mychart-bar').length>0){
    var option = {
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : {
                type: 'category',
                data: [1,2,3,4,5,6,7],
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#385e92',
                        opacity: 1
                    }
                }
        },
        yAxis : {
            type : 'value',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#385e92'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#385e92']
                }
            }
        },
        series : [
            {
                name: '金额',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'insideTop',
                        textStyle:{
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color:'#63DCB9'
                    }
                },
                barWidth: 20,
                data: [45,55,66,85,45,50,20]
            }
        ]
    };
    var myChart=echarts.init(document.querySelector('.mychart-bar'));
    myChart.setOption(option);
}

/*判断mychart-line-2*/
if($('.mychart-line-2').length>0){
    var option = {
        title : {
            text: '每日交易数据',
            subtext: '',
            x: 'left',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        color: [
            '#87cefa','#ed7b53'
        ],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        grid: {
            left: '50px'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#BDC0CF'
                    }
                },
                data : [
                    '2016/01/02 05:00','2016/01/02 06:00','2016/01/02 07:00','2016/01/02 08:00','2016/01/02 09:00','2016/01/02 10:00','2016/01/02 11:00','2016/01/02 12:00'
                ].map(function (str) {
                    return str.replace(' ', '\n')
                }),
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#5a6378']
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: 500,
                axisLine: {
                    lineStyle: {
                        color: '#BDC0CF'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#5a6378']
                    }
                }
            }
        ],
        series: [
            {
                name:'借款',
                type:'line',
                animation: true,
                smooth: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true
                },
                data:[
                    123,182,265,245,236,454,332,454,332
                ]
            },
            {
                name:'还款',
                type:'line',
                animation: true,
                smooth: true,
                areaStyle: {
                    normal: {}
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                markArea: {
                    silent: true
                },
                data:[
                    223,382,165,445,336,354,232,454,332
                ]
            }
        ]
    };

    var app={};
    app.bool=true;

    var myChart=echarts.init(document.querySelector('.mychart-line-2'));
    var refreshCharts2=function(){
        axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

        option.grid.width= ($('.mychart-line-2').width()-80) +'px';

        var data = option.series[0].data;
        var data1 = option.series[1].data;
        data.shift();
        data1.shift();
        data.push(Math.round(Math.random() * 500));
        data1.push(Math.round(Math.random() * 500));

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);

        myChart.setOption(option);

        if(app.bool){
            $('.wrapper-left').toggleClass('hide');$('.wrapper-right').toggleClass('lw');
            app.bool=false;
        }
    }
    refreshCharts2();
    clearInterval(app.timeTicket);
    app.timeTicket = setInterval("refreshCharts2()",1000);
}


/*实时交易数据向上滚动*/
if($('.info-detail-table').length>0){
    var $r_list=$('.info-detail-table .t-body'),
        info_fun=function(){
            $r_list.append('<li><div class="col">张三</div><div class="col">210</div><div class="col">2016-03-05</div><div class="col">湖南赫山区</div><div class="col">阿伦不网点</div><div class="col">刘德华</div><div class="col">张里样</div><div class="col">2016-07-01</div></li>');
            $r_list.animate({
                scrollTop: $r_list.find('li').length*38,
            },1000);
        };
    var info_interval=setInterval('info_fun()',2000);
    $r_list.on({
        mouseover: function(){
            clearInterval(info_interval);
        },
        mouseout: function(){
            info_interval=setInterval('info_fun()',2000);
        }
    });
}

/*展示中心首页*/
if($('.info-detail').length>0){
    var $col_list_1=$('.info-detail .col-list').eq(0),
        info_fun_1=function(){
            $col_list_1.append('<li><div class="pic" style="background-image:url(images/pic01.jpg)"></div><div class="txt"><h3 class="t-title">阿伦不网点</h3><p class="t-txt">中国互联网安全大会，是在国家网信办工信部、公安部指导下。</p></div></li>');
            $col_list_1.animate({
                scrollTop: $col_list_1.find('li').length*71,
            },1000);
        };
    var info_interval_1=setInterval('info_fun_1()',2000);
    $col_list_1.on({
        mouseover: function(){
            clearInterval(info_interval_1);
        },
        mouseout: function(){
            info_interval_1=setInterval('info_fun_1()',2000);
        }
    });

    var $col_list_2=$('.info-detail .col-list').eq(1),
        info_fun_2=function(){
            $col_list_2.append('<li><div class="pic" style="background-image:url(images/pic01.jpg)"></div><div class="txt"><h3 class="t-title">阿伦不网点</h3><p class="t-txt">中国互联网安全大会，是在国家网信办工信部、公安部指导下。</p></div></li>');
            $col_list_2.animate({
                scrollTop: $col_list_2.find('li').length*71,
            },1000);
        };
    var info_interval_2=setInterval('info_fun_2()',2000);
    $col_list_2.on({
        mouseover: function(){
            clearInterval(info_interval_2);
        },
        mouseout: function(){
            info_interval_2=setInterval('info_fun_2()',2000);
        }
    });
}