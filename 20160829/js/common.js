$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    error: function(r) {
        console.log(r);
        $('.load-box').hide(0);
        dialog({
            title: '处理异常',
            content: '服务器未开启，或者接收异常'
        }).showModal();
    }
});
if(window.NProgress) NProgress.configure({ trickle: false,minimum: 0.01 });
window.server_url='https://ning668.wicp.net/gdjson/index.ashx';
//window.server_url='/jsonp-aspx/index.ashx';
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
/*数字转换千分位*/
function current(num){
    if(num!==''){
        var num=Number(num).toFixed(2);
    }

    if((num+"").trim()=="" || Number(num)===0){

      return"";

   }

   if(isNaN(num)){

      return"";

   }

   num = num+"";

   if(/^.*\..*$/.test(num)){

      var pointIndex =num.lastIndexOf(".");

      var intPart = num.substring(0,pointIndex);

      var pointPart =num.substring(pointIndex+1,num.length);

      intPart = intPart +"";

       var re =/(-?\d+)(\d{3})/

       while(re.test(intPart)){

          intPart =intPart.replace(re,"$1,$2")

       }

      num = intPart+"."+pointPart;

   }else{

      num = num +"";

       var re =/(-?\d+)(\d{3})/

       while(re.test(num)){

          num =num.replace(re,"$1,$2")

       }

   }

    return num;
}

/*取消默认事件*/
var stopDefault=function(e){
    if(e && e.preventDefault){
        e.preventDefault();
    }else{
        window.event.returnValue=false;
    }
}

/*转换时间YYYYMMDDHHIISS*/
function convertDate(string,value,sign){
    var value=value || '',
        sign=sign || '-';
    var myDate=new Date(value),
        myyear=myDate.getFullYear(),
        mymonth=myDate.getMonth()+1,
        mydate=myDate.getDate(),
        myhour=myDate.getHours(),
        mymin=myDate.getMinutes(),
        mysec=myDate.getSeconds();
        mymonth=mymonth>9?mymonth:'0'+mymonth;
        mydate=mydate>9?mydate:'0'+mydate;
        myhour=myhour>9?myhour:'0'+myhour;
        mymin=mymin>9?mymin:'0'+mymin;
        mysec=mysec>9?mysec:'0'+mysec;
    if(string==='date')
        return myyear+sign+mymonth+sign+mydate;
    return myyear+mymonth+mydate+myhour+mymin+mysec;  
}

/* 科目编码一一转换科目名称-返回数组 */
function convertCodeArr(code,str_zth,ztr_year){
    var str_code=code,
        arr_outcode=[];
    arr_outcode[0]=str_code;
    $.ajax({
        url: server_url,
        async: false,
        type: 'post',
        dataType: 'json',
        data: {
            how: 'query',
            zth: str_zth,
            year: ztr_year,
            sql: 'select ccode_name, ccode, igrade, bend, cexch_name, cmeasure, cValue from code,AccInformation where ccode like \''+str_code.substr(0,4)+'%\' and cName=\'cGradeLevel\' order by ccode'
        },
        success: function(d){
            if(d.status!==1) return;
            if(d.data.length>0){
                var arr_igrade=d.data[0].cValue.split(','),
                    str_lastcode='';
                $.each(d.data,function(i,obj){
                    if(obj.igrade=='1'){
                        str_lastcode=obj.ccode;
                        arr_outcode[1]=obj.ccode_name
                    }else{
                        var tmp_int_i=4;
                        for(var i=1;i<arr_igrade.length;i++){
                            tmp_int_i+=parseInt(arr_igrade[i]);
                            if(tmp_int_i>str_code.length) break;
                            var tmp_str_code=str_code.substr(0,tmp_int_i);
                            //console.log(tmp_int_i+' '+tmp_str_code+' '+obj.ccode);
                            var tmp_code=obj.ccode;
                            if(tmp_str_code==obj.ccode){
                                arr_outcode[1]+=('/'+obj.ccode_name);
                                if(str_code==obj.ccode || obj.bend==='True'){
                                    str_lastcode=obj.ccode;
                                    arr_outcode[2]=obj.cmeasure;
                                    arr_outcode[3]=obj.cexch_name;
                                    arr_outcode[4]=obj.ccode_name;
                                    return false;
                                }
                                break;
                            }
                        }
                    }
                });
                if(str_lastcode!=str_code){
                    arr_outcode[1]=str_code+'科目编码没找到';
                    arr_outcode[2]='';
                    arr_outcode[3]='';
                    arr_outcode[4]='';
                }
            }else{
                arr_outcode[1]=str_code+'科目编码没找到';
            }
        }
    });
    //console.log(arr_outcode);
    return arr_outcode;
}