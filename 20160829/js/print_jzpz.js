var jzpzWFun=function(){
    /*初始*/
    var mydate=new Date(),
        p_zth='006',
        p_year=mydate.getMonth()===0?mydate.getFullYear()-1:mydate.getFullYear(),
        p_month=mydate.getMonth()===0?12:mydate.getMonth(),
        p_inoid=1,
        p_max_inoid=1,
        p_bool_nojz=true;
    if(getQueryString('zth')) p_zth=getQueryString('zth');
    if(getQueryString('year')) p_year=getQueryString('year');
    if(getQueryString('month')) p_month=getQueryString('month');
    if(getQueryString('no')) p_inoid=getQueryString('no');
    $('.select-month [value='+p_month+']').prop('selected',true);
    $('.input-inoid').val(p_inoid);
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
            $('.pz-wrap').find('.pz-company').html(d.data[0].cAcc_Name);
        }else{
            $('.pz-wrap').find('.pz-company').html('获取失败');
        }
    });

    $('.btn-pz').on('click',function(){
        if($(this).hasClass('first')){
            p_inoid=1;
        }else if($(this).hasClass('up')){
            if(p_inoid>1) p_inoid--;
        }else if($(this).hasClass('down')){
            if(p_max_inoid>p_inoid) p_inoid++;
        }else if($(this).hasClass('last')){
            p_inoid=p_max_inoid;
        }
        $('.input-inoid').val(p_inoid);
        funQuery();
    });

    $('.btn-query').on('click',function(){
        var str_year=$('.select-year').val(),
            str_month=$('.select-month').val(),
            str_inoid=$('.input-inoid').val();
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
        p_month=str_month;
        p_inoid=str_inoid;
        funRefreshTotal();
        $('.toggle-arrow').trigger('click');
        funQuery();
    });

    $('.pz-wrap .table tbody').on({
        'mouseover': function(){
            var $tr=$(this),
                $price=$tr.find('.pz-price'),
                f_mdprice=Number($price.eq(0).attr('data-price')),
                f_mcprice=Number($price.eq(1).attr('data-price')),f_price=0.00,f_num=0.00,f_unit=0;
            if(f_mdprice!=0) f_price=f_mdprice;
            if(f_mcprice!=0) f_price=f_mcprice;
            if(!isNaN(Number($tr.attr('data-nds'))) && Number($tr.attr('data-nds'))!==0) f_num=Number($tr.attr('data-nds'));
            if(!isNaN(Number($tr.attr('data-ncs'))) && Number($tr.attr('data-ncs'))!==0) f_num=Number($tr.attr('data-ncs'));
            if(!isNaN(f_price/f_num) && isFinite(f_price/f_num)) f_unit=f_price/f_num;
            $('.pz-wrap').find('.pz-cnid').text($tr.attr('data-cnid'));
            $('.pz-wrap').find('.pz-dtndate').text($tr.attr('data-dtdate'));
            $('.pz-wrap').find('.pz-snum').text(f_num!=0?f_num+$tr.attr('data-cmeasure'):'');
            $('.pz-wrap').find('.pz-unit').text(f_unit!=0?f_unit.toFixed(4):'');
        },
        'mouseout': function(){
            $('.pz-wrap').find('.pz-cnid').text('');
            $('.pz-wrap').find('.pz-dtndate').text('');
            $('.pz-wrap').find('.pz-snum').text('');
            $('.pz-wrap').find('.pz-unit').text('');
        }
    },'tr');

    var funRefreshTotal=function(){
        $.post(server_url,{
            how: 'query',
            zth: p_zth,
            year: p_year,
            sql: 'select max(ino_id) as max_inoid from GL_accvouch where iperiod='+p_month
        },function(d){
            if(d.data.length>0){
                p_max_inoid=parseInt(d.data[0].max_inoid);
            }
        });
    };

    var funQuery=function(){
        var str_sql_nojz='';
        if(!p_bool_nojz) str_sql_nojz=' and ibook=1';
        $.post(server_url,{
            how: 'query',
            year: p_year,
            zth: p_zth,
            sql: 'select iperiod, csign, ino_id, inid, dbill_date, idoc, cbill, ccheck, cbook, ibook, ccashier, iflag, cdigest, ccode, cexch_name, md, mc, md_f, mc_f, nfrat, nd_s, nc_s, cn_id, dt_date from GL_accvouch where iperiod='+p_month+' and ino_id='+p_inoid+str_sql_nojz+' order by inid asc'
        },function(d){
            if(d.status!==1){
                dialog({
                    title: '查询失败',
                    content: d.err
                }).showModal();
                return false;
            }
            if(d.data.length>0){
                $('.pz-wrap').find('thead tr>td:eq(0)').attr('width','210');
                $('.pz-wrap').find('thead tr>td:eq(1)').attr('width','190');
                $('.pz-wrap').find('thead tr>td:eq(2)').attr('width','120').show();
                $('.pz-wrap').find('td.r2').show();
                $('.pz-wrap').find('tfoot td.td-left').attr('colspan','3');
                $('.pz-wrap').find('.pz-csign').text(d.data[0].csign);
                $('.pz-wrap').find('.pz-inoid').text(d.data[0].ino_id);
                $('.pz-wrap').find('.pz-dbilldate').text(convertDate('date',d.data[0].dbill_date,'.'));
                $('.pz-wrap').find('.pz-idoc').text(d.data[0].idoc);
                var str_html='<tr><td class="text-left"><div class="box-txt"></div></td><td class="text-left"><div class="box-txt"></div></td><td class="text-left r2"><div class="box-r2">&nbsp;</div><div class="box-r2 text-right">&nbsp;</div></td><td class="text-right pz-price"></td><td class="text-right pz-price"></td></tr>',$outer=$('<div></div>'), total_md=0, total_mc=0;
                $.each(d.data,function(i,obj){
                    var $element=$(str_html),
                        arr_code=funCodeName(obj.ccode),
                        float_f=0.00,float_s=0.00;
                    $element.attr({
                        'data-cnid': obj.cn_id,
                        'data-dtdate': obj.dt_date,
                        'data-nds': obj.nd_s,
                        'data-ncs': obj.nc_s,
                        'data-cexchname': arr_code[2],
                        'data-cmeasure': arr_code[1]
                    });
                    if(Number(obj.nd_s)!==0) float_s=Number(obj.nd_s);
                    if(Number(obj.nc_s)!==0) float_s=Number(obj.nc_s);
                    float_f=Number(obj.md_f)!==0?Number(obj.md_f):Number(obj.mc_f);
                    $element.find('.box-txt').eq(0).html(obj.cdigest+' <small class="yes-print-inlineblock">'+(obj.dt_date?convertDate('date',obj.dt_date,'/'):'')+'</small><small class="yes-print-inlineblock">'+(float_s!==0?float_s+arr_code[1]:'')+'</small>');
                    $element.find('.box-txt').eq(1).html(arr_code[0]+' <small>(<a href="明细账.html?zth='+p_zth+'&month1=1&month2='+p_month+'&year='+p_year+'&code='+obj.ccode+'&how=query" target="_blank" title="查明细">'+obj.ccode+'</a>)</small>');
                    $element.find('.pz-price').eq(0).attr('data-price',obj.md).text(current(obj.md));
                    $element.find('.pz-price').eq(1).attr('data-price',obj.mc).text(current(obj.mc));
                    $element.find('.box-r2').eq(0).attr('data-nfrat',obj.nfrat).html(Number(obj.nfrat)!==0?'汇率'+obj.nfrat:'&nbsp;');
                    $element.find('.box-r2').eq(1).attr({
                        'data-price-j':obj.md_f,
                        'data-price-d':obj.mc_f
                    }).html(float_f!==0?current(float_f)+obj.cexch_name:'&nbsp;');
                    $outer.append($element);
                    total_md+=Number(obj.md);
                    total_mc+=Number(obj.mc);
                });
                while($outer.find('tr').length<4){
                    $outer.append($(str_html));
                }
                var no_f=false;
                $outer.find('.box-r2').each(function(){
                    if(!!$.trim($(this).text())){
                        no_f=true;
                        return false;
                    }
                });
                if(!no_f){
                    $('.pz-wrap').find('thead tr>td:eq(0)').attr('width','270');
                    $('.pz-wrap').find('thead tr>td:eq(1)').attr('width','250');
                    $('.pz-wrap').find('thead tr>td:eq(2)').attr('width','0').hide();
                    $outer.find('td.r2').hide();
                    $('.pz-wrap').find('tfoot td.td-left').attr('colspan','2');
                }
                $('.pz-wrap').find('tbody').html($outer.html());
                $('.pz-wrap').find('tfoot .pz-price').eq(0).text(current(total_md));
                $('.pz-wrap').find('tfoot .pz-price').eq(1).text(current(total_mc));
                $('.pz-wrap').find('.pz-cbook').text(d.data[0].cbook);
                $('.pz-wrap').find('.pz-ccheck').text(d.data[0].ccheck);
                $('.pz-wrap').find('.pz-ccashier').text(d.data[0].ccashier);
                $('.pz-wrap').find('.pz-cbill').text(d.data[0].cbill);
            }else{
                $('.pz-wrap').find('tbody td>div').html('暂时无数据');
                $('.pz-wrap').find('tbody td.pz-price').html('暂时无数据');
            }
        },'json');
    }

    var funCodeName=function(code){
        var str_code=code,
            arr_code=[];
        $.ajax({
            url: server_url,
            async: false,
            type: 'post',
            dataType: 'json',
            data: {
                how: 'query',
                zth: p_zth,
                year: p_year,
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
                            arr_code[0]=obj.ccode_name
                        }else{
                            var tmp_int_i=4;
                            for(var i=1;i<arr_igrade.length;i++){
                                tmp_int_i+=parseInt(arr_igrade[i]);
                                if(tmp_int_i>str_code.length) break;
                                var tmp_str_code=str_code.substr(0,tmp_int_i);
                                //console.log(tmp_int_i+' '+tmp_str_code+' '+obj.ccode);
                                if(tmp_str_code==obj.ccode){
                                    arr_code[0]+=('/'+obj.ccode_name);
                                    if(str_code==obj.ccode || obj.bend==='True'){
                                        str_lastcode=obj.ccode;
                                        arr_code[1]=obj.cmeasure;
                                        arr_code[2]=obj.cexch_name;
                                        return false;
                                    }
                                    break;
                                }
                            }
                        }
                    });
                    if(str_lastcode!=str_code) arr_code[0]=str_code+'科目编码没找到';
                }else{
                    arr_code[0]=str_code+'科目编码没找到';
                }
            }
        });
        //console.log('最终：'+str_name);
        return arr_code;
    }
    funRefreshTotal();
    funQuery();
    //funCodeName('3103');

    /*点击打印*/
    $('.btn-print').on('click',function(){
        $('.fixed-tool').removeClass('show');
        window.print();
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