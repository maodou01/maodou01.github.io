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

    if((num+"").trim()==""){

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