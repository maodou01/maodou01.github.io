var mxzWFun=function(){
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
        $('.yeb-table-wrap .txt-query-time').html(p_year+'年'+p_month1+'月-'+p_month2+'月');
        $('.yeb-table-wrap .'+str_tableformat).fadeIn(400).find('tbody').html('');
        $('.yeb-table-wrap .table').hide(0);
        $('.yeb-table-wrap .'+str_tableformat).fadeIn(400).find('tbody').html('');
        $('.txt-filldate').html('查询中');
        queryCode(p_code,str_tableformat);
    });

    /*账簿格式模板*/
    var tableTemplate=function(class_table,class_name){
        var str_html='',
            str_class_name=class_name?' class="'+class_name+'"':''
            arg=arguments;  
        switch(class_table){
            case 'table_amount':/*金额*/
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+arg[2]+'</td>'+
                    '<td class="text-center">'+arg[3]+'</td>'+
                    '<td class="text-left">'+arg[4]+'</td>'+
                    '<td class="text-left">'+arg[5]+'</td>'+
                    '<td class="price">'+arg[6]+'</td>'+
                    '<td class="price">'+arg[7]+'</td>'+
                    '<td class="text-center">'+arg[8]+'</td>'+
                    '<td class="price">'+arg[9]+'</td>'+
                '</tr>';
            break;
            case 'table_quantity_amount':/*数量金额*/
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+arg[2]+'</td>'+
                    '<td class="text-center">'+arg[3]+'</td>'+
                    '<td class="text-left">'+arg[4]+'</td>'+
                    '<td class="text-left">'+arg[5]+'</td>'+
                    '<td class="text-center">'+arg[10]+'</td>'+
                    '<td class="text-center">'+arg[11]+'</td>'+
                    '<td class="price">'+arg[6]+'</td>'+
                    '<td class="text-center">'+arg[12]+'</td>'+
                    '<td class="price">'+arg[7]+'</td>'+
                    '<td class="text-center">'+arg[8]+'</td>'+
                    '<td class="text-center">'+arg[13]+'</td>'+
                    '<td class="text-center">'+arg[14]+'</td>'+
                    '<td class="price">'+arg[9]+'</td>'+
                '</tr>';
            break;
            case 'table_foreign_amount':/*外币金额*/
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+arg[2]+'</td>'+
                    '<td class="text-center">'+arg[3]+'</td>'+
                    '<td class="text-left">'+arg[4]+'</td>'+
                    '<td class="text-left">'+arg[5]+'</td>'+
                    '<td class="text-center">'+arg[15]+'</td>'+
                    '<td class="price">'+arg[16]+'</td>'+
                    '<td class="price">'+arg[6]+'</td>'+
                    '<td class="price">'+arg[17]+'</td>'+
                    '<td class="price">'+arg[7]+'</td>'+
                    '<td class="text-center">'+arg[8]+'</td>'+
                    '<td class="price">'+arg[18]+'</td>'+
                    '<td class="text-center">'+arg[19]+'</td>'+
                    '<td class="price">'+arg[9]+'</td>'+
                '</tr>';
            break;
            case 'table_quantity_foreign':/*数量外币*/
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+arg[2]+'</td>'+
                    '<td class="text-center">'+arg[3]+'</td>'+
                    '<td class="text-left">'+arg[4]+'</td>'+
                    '<td class="text-left">'+arg[5]+'</td>'+
                    '<td class="text-center">'+arg[10]+'</td>'+
                    '<td class="text-center">'+arg[15]+'</td>'+
                    '<td class="text-center">'+arg[11]+'</td>'+
                    '<td class="price">'+arg[16]+'</td>'+
                    '<td class="price">'+arg[6]+'</td>'+
                    '<td class="text-center">'+arg[12]+'</td>'+
                    '<td class="price">'+arg[17]+'</td>'+
                    '<td class="price">'+arg[7]+'</td>'+
                    '<td class="text-center">'+arg[8]+'</td>'+
                    '<td class="text-center">'+arg[13]+'</td>'+
                    '<td class="text-center">'+arg[14]+'</td>'+
                    '<td class="price">'+arg[18]+'</td>'+
                    '<td class="text-center">'+arg[19]+'</td>'+
                    '<td class="price">'+arg[9]+'</td>'+
                '</tr>';
            break;
        }
        return str_html;
    }

    /*明细账查询*/
    var MxzFun=function(month1,month2,code,year,zth){
        this.month1=month1;
        this.month2=month2;
        this.year=year;
        this.zth=zth;
        this.code=code;
    }
    MxzFun.prototype.qcFun=function(){
        var qc_arr={};
        $.ajax({
            url: server_url,
            async: false,
            type: 'post',
            dataType: 'json',
            data: {
                how: 'query',
                zth: this.zth,
                year: this.year,
                sql: 'select cbegind_c,sum(mb) as mb,sum(mb_f) as mb_f,sum(nb_s) as nb_s from GL_accsum inner join code on code.ccode=GL_accsum.ccode where code.ccode like \''+this.code+'%\' and iperiod='+this.month1+' and code.bend=\'True\' group by cbegind_c'
            },
            success: function(d){
                //console.log(d);
                if(d.status===1){
                    if(d.count!=='0'){
                        qc_arr=d.data[0];
                    }
                }
            }
        });
        return qc_arr;
    }
    MxzFun.prototype.qmFun=function(){
        var str_sql_nojz='';
        if(!p_bool_nojz) str_sql_nojz=' and ibook=1';
        var bq_arr=[];
        $.ajax({
            url: server_url,
            async: false,
            type: 'post',
            dataType: 'json',
            data: {
                how: 'query',
                zth: this.zth,
                year: this.year,
                sql: 'select iperiod,dbill_date,csign,ino_id,cdigest,md,mc,md_f,mc_f,nd_s,nc_s,nfrat from GL_accvouch where ccode like \'' + this.code + '%\' and (iperiod between ' + this.month1 + ' and ' + this.month2 + ') and cdigest like \'%'+p_zhaiyao+'%\'' + str_sql_nojz + ' order by iperiod,ino_id'
            },
            success: function(d){
                //console.log(d);
                if(d.status===1){
                    if(d.count!=='0'){
                        bq_arr=d.data;
                    }
                }
            }
        });
        return bq_arr;
    }

    var codeMxzFun=function(class_table){
        var $tbody=$('.yeb-table-wrap .'+class_table+' tbody'),
            fun_mxz=new MxzFun(p_month1,p_month2,p_code,p_year,p_zth),
            arr_qm=fun_mxz.qmFun(),
            count=arr_qm.length;
        if(num<count){
            var str_first='期初余额';
            if(parseInt(fun_mxz.month1)===1){
                str_first='上年结转';
            }
            if(num===0){
                var obj_qc=fun_mxz.qcFun();
                if(obj_qc.mb>0){
                    if(obj_qc.cbegind_c==='借'){
                        qm_price=parseFloat(obj_qc.mb);
                        qm_sl=parseFloat(obj_qc.nb_s);
                        qm_wb=parseFloat(obj_qc.mb_f);
                    }else if(obj_qc.cbegind_c==='贷'){
                        qm_price=parseFloat(obj_qc.mb)*-1;
                        qm_sl=parseFloat(obj_qc.nb_s)*-1;
                        qm_wb=parseFloat(obj_qc.mb_f)*-1;
                    }
                    $tbody.append(tableTemplate(class_table,'',
                        '',
                        '',
                        '',
                        str_first,
                        '',
                        '',
                        obj_qc.cbegind_c,
                        qm_price>0?current(qm_price):current(qm_price*-1),
                        '',
                        '',
                        '',
                        (parseFloat(obj_qc.nb_s)!==0?obj_qc.nb_s:''),
                        (parseFloat(obj_qc.mb)/parseFloat(obj_qc.nb_s)).toFixed(2),
                        '',
                        '',
                        '',
                        (parseFloat(obj_qc.mb_f)!==0?current(obj_qc.mb_f):''),
                        (parseFloat(obj_qc.mb)/parseFloat(obj_qc.mb_f)).toFixed(4)
                    ));
                }
            }
            var qm_fx='平',qm_outprice=0.00,qm_outsl=0,qm_outwb=0.00,
                last_iperiod=0;   

            qm_price=qm_price+parseFloat(arr_qm[num].md)-parseFloat(arr_qm[num].mc);
            qm_sl=qm_sl+parseFloat(arr_qm[num].nd_s)-parseFloat(arr_qm[num].nc_s);
            qm_wb=qm_wb+parseFloat(arr_qm[num].md_f)-parseFloat(arr_qm[num].mc_f);
            if(parseFloat(qm_price.toFixed(2))>0){
                qm_fx='借';
                qm_outprice=qm_price;
                qm_outsl=qm_sl;
                qm_outwb=qm_wb;
            }else if(parseFloat(qm_price.toFixed(2))<0){
                qm_fx='贷';
                qm_outprice=qm_price*-1;
                qm_outsl=qm_sl*-1;
                qm_outwb=qm_wb*-1;
            }
            var unit=0.00;
            if(parseFloat(arr_qm[num].md)>0){
                unit=(parseFloat(arr_qm[num].md)/parseFloat(arr_qm[num].nd_s)).toFixed(2);
            }else if(parseFloat(arr_qm[num].mc)>0){
                unit=(parseFloat(arr_qm[num].mc)/parseFloat(arr_qm[num].nc_s)).toFixed(2);
            }
            $tbody.append(tableTemplate(class_table,'',
                (new Date(arr_qm[num].dbill_date).getMonth()+1),
                (new Date(arr_qm[num].dbill_date).getDate()),
                arr_qm[num].csign+'-'+arr_qm[num].ino_id,
                arr_qm[num].cdigest,
                (parseFloat(arr_qm[num].md)>0?current(arr_qm[num].md):''),
                (parseFloat(arr_qm[num].mc)>0?current(arr_qm[num].mc):''),
                qm_fx,
                qm_outprice?current(qm_outprice):'',
                (parseFloat(unit)>0?unit:''),
                (parseFloat(arr_qm[num].nd_s)!==0?arr_qm[num].nd_s:''),
                (parseFloat(arr_qm[num].nc_s)!==0?arr_qm[num].nc_s:''),
                (parseFloat(qm_outsl)!==0?qm_outsl:''),
                '',
                (parseFloat(arr_qm[num].nfrat)!==0?arr_qm[num].nfrat:''),
                (parseFloat(arr_qm[num].md_f)>0?current(arr_qm[num].md_f):''),
                (parseFloat(arr_qm[num].mc_f)>0?current(arr_qm[num].mc_f):''),
                (parseFloat(qm_outwb)!==0?current(qm_outwb):''),
                ''
            ));
            month_jtotal+=parseFloat(arr_qm[num].md);
            month_dtotal+=parseFloat(arr_qm[num].mc);
            month_jtotal_sl+=parseFloat(arr_qm[num].nd_s);
            month_dtotal_sl+=parseFloat(arr_qm[num].nc_s);
            month_jtotal_wb+=parseFloat(arr_qm[num].md_f);
            month_dtotal_wb+=parseFloat(arr_qm[num].mc_f);
            all_jtotal+=parseFloat(arr_qm[num].md);
            all_dtotal+=parseFloat(arr_qm[num].mc);
            all_jtotal_sl+=parseFloat(arr_qm[num].nd_s);
            all_dtotal_sl+=parseFloat(arr_qm[num].nc_s);
            all_jtotal_wb+=parseFloat(arr_qm[num].md_f);
            all_dtotal_wb+=parseFloat(arr_qm[num].mc_f);
            if(arr_qm.length-1!==num){
                if(arr_qm[num].iperiod!==arr_qm[num+1].iperiod){
                    $tbody.append(tableTemplate(class_table,'info',
                        arr_qm[num].iperiod,
                        '',
                        '',
                        '本月合计',
                        (month_jtotal>0?current(month_jtotal):''),
                        (month_dtotal>0?current(month_dtotal):''),
                        qm_fx,
                        qm_outprice?current(qm_outprice):'',
                        '',
                        (month_jtotal_sl>0?month_jtotal_sl:''),
                        (month_dtotal_sl>0?month_dtotal_sl:''),
                        (parseFloat(qm_outsl)!==0?qm_outsl:''),
                        qm_outprice/qm_outsl?(qm_outprice/qm_outsl).toFixed(2):'',
                        '',
                        (month_jtotal_wb>0?current(month_jtotal_wb):''),
                        (month_dtotal_wb>0?current(month_dtotal_wb):''),
                        (parseFloat(qm_outwb)!==0?current(qm_outwb):''),
                        ''
                    ));
                    $tbody.append(tableTemplate(class_table,'success',
                        arr_qm[num].iperiod,
                        '',
                        '',
                        '累计',
                        (all_jtotal>0?current(all_jtotal):''),
                        (all_dtotal>0?current(all_dtotal):''),
                        qm_fx,
                        qm_outprice?current(qm_outprice):'',
                        '',
                        (all_jtotal_sl>0?all_jtotal_sl:''),
                        (all_dtotal_sl>0?all_dtotal_sl:''),
                        (parseFloat(qm_outsl)!==0?qm_outsl:''),
                        qm_outprice/qm_outsl?(qm_outprice/qm_outsl).toFixed(2):'',
                        '',
                        (all_jtotal_wb>0?current(all_jtotal_wb):''),
                        (all_dtotal_wb>0?current(all_dtotal_wb):''),
                        (parseFloat(qm_outwb)!==0?current(qm_outwb):''),
                        ''
                    ));
                    month_jtotal=0.00;
                    month_dtotal=0.00;
                    month_jtotal_sl=0.00;month_dtotal_sl=0.00;
                    month_jtotal_wb=0.00;month_dtotal_wb=0.00;
                }
            }else{
                last_iperiod=parseInt(arr_qm[num].iperiod);
                $tbody.append(tableTemplate(class_table,'info',
                    last_iperiod,
                    '',
                    '',
                    '本月合计',
                    (month_jtotal>0?current(month_jtotal):''),
                    (month_dtotal>0?current(month_dtotal):''),
                    qm_fx,
                    qm_outprice?current(qm_outprice):'',
                    '',
                    (month_jtotal_sl>0?month_jtotal_sl:''),
                    (month_dtotal_sl>0?month_dtotal_sl:''),
                    (parseFloat(qm_outsl)!==0?qm_outsl:''),
                    qm_outprice/qm_outsl?(qm_outprice/qm_outsl).toFixed(2):'',
                    '',
                    (month_jtotal_wb>0?current(month_jtotal_wb):''),
                    (month_dtotal_wb>0?current(month_dtotal_wb):''),
                    (parseFloat(qm_outwb)!==0?current(qm_outwb):''),
                    ''
                ));
                $tbody.append(tableTemplate(class_table,'success',
                    last_iperiod,
                    '',
                    '',
                    (last_iperiod===12?'全年累计':'累计'),
                    (all_jtotal>0?current(all_jtotal):''),
                    (all_dtotal>0?current(all_dtotal):''),
                    qm_fx,
                    qm_outprice?current(qm_outprice):'',
                    '',
                    (all_jtotal_sl>0?all_jtotal_sl:''),
                    (all_dtotal_sl>0?all_dtotal_sl:''),
                    (parseFloat(qm_outsl)!==0?qm_outsl:''),
                    qm_outprice/qm_outsl?(qm_outprice/qm_outsl).toFixed(2):'',
                    '',
                    (all_jtotal_wb>0?current(all_jtotal_wb):''),
                    (all_dtotal_wb>0?current(all_dtotal_wb):''),
                    (parseFloat(qm_outwb)!==0?current(qm_outwb):''),
                    ''
                ));
            }
            num++;
            setTimeout(function(){
                codeMxzFun(class_table);
            },50);
        }else{
            console.log('查询完毕');
            fun_mxz=null;/*释放内存*/
            NProgress.done();
            var mydate=new Date(),
                myyear=mydate.getFullYear(),
                mymonth=mydate.getMonth()+1,
                mydate=mydate.getDate();
            mymonth=mymonth>9?mymonth:'0'+mymonth;
            mydate=mydate>9?mydate:'0'+mydate;    
            $('.txt-filldate').html(myyear+'-'+mymonth+'-'+mydate);
        }
        if(count>0) NProgress.set(num/count);
    }

    var num=0,qm_price=0.00,qm_sl=0,qm_wb=0.00,
        month_jtotal=0.00,month_dtotal=0.00,
        month_jtotal_sl=0.00,month_dtotal_sl=0.00,
        month_jtotal_wb=0.00,month_dtotal_wb=0.00,
        all_jtotal=0.00,all_dtotal=0.00,
        all_jtotal_sl=0.00,all_dtotal_sl=0.00,
        all_jtotal_wb=0.00,all_dtotal_wb=0.00,
        code_arr=[];
    function queryCode(code,tableformat){
        var code=code?code:'1001';
        p_code=code;
        num=0;qm_price=0.00;
        month_jtotal=0.00;month_dtotal=0.00;
        month_jtotal_sl=0.00;month_dtotal_sl=0.00;
        month_jtotal_wb=0.00;month_dtotal_wb=0.00;
        all_jtotal=0.00;all_dtotal=0.00;
        all_jtotal_sl=0.00;all_dtotal_sl=0.00;
        all_jtotal_wb=0.00;all_dtotal_wb=0.00;
        $.post(server_url,{
            how: 'query',
            zth: p_zth,
            year: p_year,
            sql: 'select ccode,ccode_name,cmeasure,cexch_name from code where ccode = \''+code+'\''
        },function(d){
            console.log(d);
            if(d.status<0){
                dialog({
                    title: '查询失败',
                    content: d.err
                }).showModal();
                return;
            }else{
                if(d.count!=='0'){
                    $('.txt-code').html(d.data[0].ccode_name+'-'+d.data[0].ccode);
                    $('.txt-danwei').html('数量单位：'+(d.data[0].cmeasure?d.data[0].cmeasure:'无')+'，外币名称：'+(d.data[0].cexch_name?d.data[0].cexch_name:'无'));
                    $('h2.table-title').html(d.data[0].ccode_name+'明细账');
                    codeMxzFun(tableformat);
                }else{
                    $('.txt-code').html('找不到相关科目，请重新查询');
                }
            }
        },'json');
    }
}

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        require('nprogress');
        require('dialog');
        require('common');
        exports.init=mxzWFun;
    });
}else{
    mxzWFun();
}