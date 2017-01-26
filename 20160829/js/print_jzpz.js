var jzpzWFun=function(){
    /*初始*/
    var mydate=new Date(),
        p_zth='006',
        p_year='0000',
        p_month1=mydate.getMonth()===0?12:mydate.getMonth(),
        p_month2=mydate.getMonth()===0?12:mydate.getMonth(),
        p_bool_nojz=false,
        p_code='1001',
        p_zhaiyao='';
    if(getQueryString('zth')) p_zth=getQueryString('zth');
    if(getQueryString('year')) p_year=getQueryString('year');
    if(getQueryString('month1')) p_month1=getQueryString('month1');
    if(getQueryString('month2')) p_month2=getQueryString('month2');
    if(getQueryString('zhaiyao')) p_zhaiyao=getQueryString('zhaiyao');
    if(getQueryString('code')) p_code=getQueryString('code');
    $('.select-month1 [value='+p_month1+']').prop('selected',true);
    $('.select-month2 [value='+p_month2+']').prop('selected',true);
    $('.input-code').val(getQueryString('code'));
    $('.input-zhaiyao').val(getQueryString('zhaiyao'));
    $.post(server_url,{
        how: 'query',
        zth: 'system',
        sql: 'select iYear from UA_Account_sub where cAcc_Id=\''+p_zth+'\' and iModiPeri>0 order by iYear desc'
    },function(d){
        if(d.count>0){
            var str_html='';
            $.map(d.data,function(obj,i){
                if(obj.iYear===p_year || (p_year==='0000' && i===0)){
                    str_html+='<option value="'+obj.iYear+'" selected="selected">'+obj.iYear+'</option>';
                }else{
                    str_html+='<option value="'+obj.iYear+'">'+obj.iYear+'</option>';
                }
            });
            $('.select-year').html(str_html);
        }else{
            $('.select-year').html('<option value="">获取失败</option>');
        }
    });
    $.post(server_url,{
        how: 'query',
        zth: 'system',
        sql: 'select cAcc_Name from UA_Account where cAcc_Id=\''+p_zth+'\''
    },function(d){
        if(d.count>0){
            $('.txt-company').html(d.data[0].cAcc_Name);
        }else{
            $('.txt-company').html('获取失败');
        }
    });

    $('.btn-query').on('click',function(){
        var str_year=$('.select-year').val(),
            str_month1=$('.select-month1').val(),
            str_month2=$('.select-month2').val(),
            str_tableformat=$('input[name=tableformat]:checked').val();
        p_zhaiyao=str_zhaiyao=$('.input-zhaiyao').val();
        p_code=$('.input-code').val();
        p_bool_nojz=$('.has-nojz').prop('checked');    
        if(/^\d{4}$/.test(str_year)){
            p_year=str_year;
        }else{
            dialog({
                title: '操作失败',
                content: '无法获取年份'
            }).showModal();
            return;
        }
        p_month1=str_month1;
        p_month2=str_month2;
        $('.toggle-arrow').trigger('click');
    });

}

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        require('dialog');
        require('common');
        exports.init=jzpzWFun;
    });
}else{
    jzpzWFun();
}