var yebWFun=function(){
    /*初始*/
    var mydate=new Date(),
        p_zth='006',
        p_year='0000',
        p_month1=mydate.getMonth()===0?12:mydate.getMonth(),
        p_month2=mydate.getMonth()===0?12:mydate.getMonth(),
        p_bool_nojz=false;   
    if(getQueryString('zth')) p_zth=getQueryString('zth');
    if(getQueryString('year')) p_year=getQueryString('year');
    if(getQueryString('month1')) p_month1=getQueryString('month1');
    if(getQueryString('month2')) p_month2=getQueryString('month2');
    $('.select-month1 [value='+p_month1+']').prop('selected',true);
    $('.select-month2 [value='+p_month2+']').prop('selected',true);
    $('.input-code1').val(getQueryString('code1'));
    $('.input-code2').val(getQueryString('code2'));
    $('.input-codename').val(getQueryString('codename'));
    (function initFun(){
        $.post(server_url,{
            how: 'query',
            zth: 'system',
            sql: 'select distinct iYear from UA_HoldAuth where cAcc_Id=\''+p_zth+'\' order by iYear desc'
        },function(d){
            if(d.count>0){
                var str_html='';
                $.map(d.data,function(obj,i){
                    if(obj.iYear===p_year || (p_year==='0000' && i===0)){
                        str_html+='<option value="'+obj.iYear+'" selected="selected">'+obj.iYear+'</option>';
                        p_year=obj.iYear;
                    }else{
                        str_html+='<option value="'+obj.iYear+'">'+obj.iYear+'</option>';
                    }
                });
                $('.select-year').html(str_html);
                if(getQueryString('query')==='yes') $('.btn-query').trigger('click');
            }else{
                $('.select-year').html('<option value="">获取失败</option>');
            }
            if(d.status===-3){
                dialog({
                    fixed: true,
                    title: '登录',
                    content: '<label class="qucik-login"><span>用户名：</span><input id="quick-login-user" type="text" value="" placeholder="请输入用户名" /></label><label class="qucik-login"><span>密码：</span><input id="quick-login-pass" type="password" value="" placeholder="请输入密码" /></label>',
                    okValue: '登录',
                    ok: function () {
                        var obj_login = {
                            user: $('#quick-login-user').val(),
                            pass: $('#quick-login-pass').val(),
                            how: 'login'
                        };
                        $.post(window.server_url,obj_login,function(result){
                            if(result.status===2){
                                initFun();
                                this.remove();
                            }else{
                                dialog({
                                    title: '登录失败',
                                    content: d.err
                                }).showModal();
                            }
                        }.bind(this),'json');
                    }
                }).showModal();
            }
        },'json').fail(function(){
            $('.select-year').html('<option value="">获取失败</option>');
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
        },'json').fail(function(){
            $('.txt-company').html('获取失败');
        });
    })();

    /*F2键弹出科目*/
    jwerty.key('ctrl+f2/f2',function(e){
        stopDefault(e);
        var code_pop=dialog({
            title: '科目目录',
            content: '<div id="code-list"></div>'
        }).showModal();
        $('#code-list').jstree({
            core: {
                themes: {
                    variant: 'large'
                },
                data: [
                    {
                        id: '1',
                        text: '资产',
                        children: [ { id: '11','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '2',
                        text: '负债',
                        children: [ { id: '21','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '3',
                        text: '权益',
                        children: [ { id: '31','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '4',
                        text: '成本',
                        children: [ { id: '41','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '5',
                        text: '损益',
                        children: [ { id: '51','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '6',
                        text: '列表6',
                        "icon" : "glyphicon glyphicon-leaf"
                    }
                ]
            }
        });
        $('#code-list').jstree('select_node', '6');
        $('#code-list').on("changed.jstree", function (e, data) {
            console.log(data);
            console.log(data.selected);
            switch(parseInt(data.selected[0])){
                case 1:
                    $.post(server_url,{
                        how: 'query',
                        zth: p_zth,
                        year: p_year,
                        sql: 'select * from code where cclass=\'资产\''
                    },function(d){
                        
                    },'json');
                    var ref=$('#code-list').jstree(true),
                        sel=ref.get_selected();
                    ref.create_node(sel, {"type":"file"});    
                    console.log(ref);    
                    console.log(sel);    
                break;
                case 2:

                break;
            }
            if(data.node.children.length===0){
                code_pop.remove();
            }
        });
    },this,'.input-code1,.input-code2');

    $('.btn-query').on('click',function(){
        var str_year=$('.select-year').val(),
            str_month1=$('.select-month1').val(),
            str_month2=$('.select-month2').val(),
            str_code1=$('.input-code1').val(),
            str_code2=$('.input-code2').val(),
            str_codename=$('.input-codename').val(),
            str_tableformat=$('input[name=tableformat]:checked').val(),
            bool_lastcode=$('.last-code').prop('checked');
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
        $('.yeb-table-wrap .t_amount,.yeb-table-wrap .bt_quantity_foreign,.yeb-table-wrap .t_quantity_foreign,.yeb-table-wrap .t_quantity,.yeb-table-wrap .t_foreign').removeAttr('style');
        switch(str_tableformat){
            case 'table_amount':
                $('.yeb-table-wrap .t_amount').show(0);
            break;
            case 'table_quantity_amount':
                $('.yeb-table-wrap .bt_quantity_foreign,.yeb-table-wrap .t_quantity_foreign,.yeb-table-wrap .t_quantity').show(0);
                $('.yeb-table-wrap .bt_quantity_foreign').each(function(){
                    $(this).attr({
                        colspan: $(this).attr('data-col-1')
                    });
                });
            break;
            case 'table_foreign_amount':
                $('.yeb-table-wrap .bt_quantity_foreign,.yeb-table-wrap .t_quantity_foreign,.yeb-table-wrap .t_foreign').show(0);
                $('.yeb-table-wrap .bt_quantity_foreign').each(function(){
                    $(this).attr({
                        colspan: $(this).attr('data-col-1')
                    });
                });
            break;
            case 'table_quantity_foreign':
                $('.yeb-table-wrap .bt_quantity_foreign,.yeb-table-wrap .t_quantity_foreign,.yeb-table-wrap .t_quantity,.yeb-table-wrap .t_foreign').show(0);
                $('.yeb-table-wrap .bt_quantity_foreign').each(function(){
                    $(this).attr({
                        colspan: $(this).attr('data-col-2')
                    });
                });
            break;
        }
        if(!$('.has-total').prop('checked')) $('.yeb-table-wrap .t_add_up').hide(0);
        $('.fixed-tool').removeClass('show');
        $('.yeb-table-wrap .txt-query-time').html(p_year+'年'+p_month1+'月-'+p_month2+'月');
        $('.yeb-table-wrap .table').hide(0);
        $('.yeb-table-wrap .table').fadeIn(400).find('tbody').html('');
        $('.txt-filldate').html('查询中');
        queryCode(str_code1,str_code2,str_codename,str_tableformat,bool_lastcode);       
    });

    $('.has-total').on('change',function(){
        var bool=$(this).prop('checked'),
            str_tableformat=$('input[name=tableformat]:checked').val();
        $('.fixed-tool').removeClass('show');    
        if(bool){
            switch(str_tableformat){
                case 'table_amount':
                    $('.yeb-table-wrap .t_amount.t_add_up').show(0);
                break;
                case 'table_quantity_amount':
                    $('.yeb-table-wrap .bt_quantity_foreign.t_add_up,.yeb-table-wrap .t_quantity_foreign.t_add_up,.yeb-table-wrap .t_quantity.t_add_up').show(0);
                break;
                case 'table_foreign_amount':
                    $('.yeb-table-wrap .bt_quantity_foreign.t_add_up,.yeb-table-wrap .t_quantity_foreign.t_add_up,.yeb-table-wrap .t_foreign.t_add_up').show(0);
                break;
                case 'table_quantity_foreign':
                    $('.yeb-table-wrap .bt_quantity_foreign.t_add_up,.yeb-table-wrap .t_quantity_foreign.t_add_up,.yeb-table-wrap .t_quantity.t_add_up,.yeb-table-wrap .t_foreign.t_add_up').show(0);
                break;
            }
        }else{
            $('.yeb-table-wrap .t_add_up').hide(0);
        }   
    });

    /*账簿格式模板*/
    var tableTemplate=function(class_table,class_name,obj_data){
        var str_html='',
            str_class_name=class_name?' class="'+class_name+'"':''
            str_display_amount='',str_display_quantity='',str_display_foreign='',
            str_display_quantity_foreign='',
            bool_total=$('.has-total').prop('checked');
        switch(class_table){
            case 'table_amount':
                str_display_amount='display: table-cell;';
            break;
            case 'table_quantity_amount':
                str_display_quantity='display: table-cell;';
                str_display_quantity_foreign='display: table-cell;';
            break;
            case 'table_foreign_amount':
                str_display_foreign='display: table-cell;';
                str_display_quantity_foreign='display: table-cell;';
            break;
            case 'table_quantity_foreign':
                str_display_quantity='display: table-cell;';
                str_display_foreign='display: table-cell;';
                str_display_quantity_foreign='display: table-cell;';
            break;
        }    
        str_html='<tr'+str_class_name+'>'+
                '<td class="text-center">'+obj_data.no+'</td>'+
                '<td class="text-left">'+obj_data.code+'</td>'+
                '<td class="text-left">'+obj_data.code_name+'</td>'+
                /*序号、科目编码、科目名称*/
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.qc.jf)+'</td>'+
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.qc.df)+'</td>'+
                /*期初余额（借方和贷方）*/
                '<td class="text-center t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+((parseInt(Number(obj_data.qc.jf) * 100 + 0.5)-parseInt(Number(obj_data.qc.df) * 100 + 0.5))>0 ? '借' : ((parseInt(Number(obj_data.qc.jf) * 100 + 0.5)-parseInt(Number(obj_data.qc.df) * 100 + 0.5))<0 ? '贷' : '平'))+'</td>'+
                '<td class="text-center t_quantity" style="'+str_display_quantity+'">'+(obj_data.qc.sl!==0?obj_data.qc.sl:'')+'</td>'+
                '<td class="price t_foreign" style="'+str_display_foreign+'">'+current(obj_data.qc.wb)+'</td>'+
                '<td class="price t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+current(Math.abs(obj_data.qc.jf - obj_data.qc.df))+'</td>'+
                /*期初（方向、数量、外币和余额）*/
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.bq.jf)+'</td>'+
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.bq.df)+'</td>'+
                /*本期余额（借方和贷方）*/
                '<td class="text-center t_quantity" style="'+str_display_quantity+'">'+(obj_data.bq.sl_j!==0?obj_data.bq.sl_j:'')+'</td>'+
                '<td class="price t_foreign" style="'+str_display_foreign+'">'+current(obj_data.bq.wb_j)+'</td>'+
                '<td class="price t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+current(obj_data.bq.jf)+'</td>'+
                /*本期借方（数量、外币和余额）*/
                '<td class="text-center t_quantity" style="'+str_display_quantity+'">'+(obj_data.bq.sl_d!==0?obj_data.bq.sl_d:'')+'</td>'+
                '<td class="price t_foreign" style="'+str_display_foreign+'">'+current(obj_data.bq.wb_d)+'</td>'+
                '<td class="price t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+current(obj_data.bq.df)+'</td>'+
                /*本期贷方（数量、外币和余额）*/
                '<td class="price t_add_up t_amount" style="'+(bool_total?str_display_amount:'')+'">'+current(obj_data.total.jf)+'</td>'+
                '<td class="price t_add_up t_amount" style="'+(bool_total?str_display_amount:'')+'">'+current(obj_data.total.df)+'</td>'+
                /*累计余额（借方和贷方）*/
                '<td class="text-center t_add_up t_quantity" style="'+(bool_total?str_display_quantity:'')+'">'+(obj_data.total.sl_j!==0?obj_data.total.sl_j:'')+'</td>'+
                '<td class="price t_add_up t_foreign" style="'+(bool_total?str_display_foreign:'')+'">'+current(obj_data.total.wb_j)+'</td>'+
                '<td class="price t_add_up t_quantity_foreign" style="'+(bool_total?str_display_quantity_foreign:'')+'">'+current(obj_data.total.jf)+'</td>'+
                /*累计借方（数量、外币和余额）*/
                '<td class="text-center t_add_up t_quantity" style="'+(bool_total?str_display_quantity:'')+'">'+(obj_data.total.sl_d!==0?obj_data.total.sl_d:'')+'</td>'+
                '<td class="price t_add_up t_foreign" style="'+(bool_total?str_display_foreign:'')+'">'+current(obj_data.total.wb_d)+'</td>'+
                '<td class="price t_add_up t_quantity_foreign" style="'+(bool_total?str_display_quantity_foreign:'')+'">'+current(obj_data.total.df)+'</td>'+
                /*累计贷方（数量、外币和余额）*/
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.qm.jf)+'</td>'+
                '<td class="price t_amount" style="'+str_display_amount+'">'+current(obj_data.qm.df)+'</td>'+
                /*期末余额（借方和贷方）*/
                '<td class="text-center t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+((parseInt(Number(obj_data.qm.jf) * 100 + 0.5)-parseInt(Number(obj_data.qm.df) * 100 + 0.5))>0 ? '借' : ((parseInt(Number(obj_data.qm.jf) * 100 + 0.5)-parseInt(Number(obj_data.qm.df) * 100 + 0.5))<0 ? '贷' : '平'))+'</td>'+
                '<td class="text-center t_quantity" style="'+str_display_quantity+'">'+(obj_data.qm.sl!==0?obj_data.qm.sl:'')+'</td>'+
                '<td class="price t_foreign" style="'+str_display_foreign+'">'+current(obj_data.qm.wb)+'</td>'+
                '<td class="price t_quantity_foreign" style="'+str_display_quantity_foreign+'">'+current(Math.abs(obj_data.qm.jf - obj_data.qm.df))+'</td>'+
                /*期末（方向、数量、外币和余额）*/
            '</tr>';    
        return str_html;
    }

    /*余额表查询*/
    var yebFun=function(code,month1,month2,year,zth){
        var str_sql_nojz='';
        if(!p_bool_nojz) str_sql_nojz=' and ibook=1';

        /*获取期初*/
        var qcFun=function(callback){
            var qc_arr={};
            $.ajax({
                url: server_url,
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    how: 'query',
                    zth: zth,
                    year: year,
                    sql: 'select cbegind_c,sum(mb) as mb,sum(mb_f) as mb_f,sum(nb_s) as nb_s from GL_accsum inner join code on code.ccode=GL_accsum.ccode where code.ccode like \''+code+'%\' and iperiod='+month1+' and code.bend=\'True\' group by cbegind_c'
                },
                success: function(d){
                    //console.log(d);
                    if(d.status===1){
                        var int_count=parseInt(d.count);
                        if(int_count===1){
                            qc_arr=d.data[0];
                        }else if(int_count===2){
                            var diff_mb=0.00,
                                diff_mb_f=0.00,
                                diff_nb_s=0.00;
                            diff_mb=Number(d.data[0].mb)-Number(d.data[1].mb);
                            diff_mb_f=Number(d.data[0].mb_f)-Number(d.data[1].mb_f);
                            diff_nb_s=Number(d.data[0].nb_s)-Number(d.data[1].nb_s);
                            qc_arr={
                                mb: Math.abs(diff_mb),
                                mb_f: Math.abs(diff_mb_f),
                                nb_s: Math.abs(diff_nb_s)
                            };
                            if(d.data[0].cbegind_c==='借'){
                                if(diff_mb>0){
                                    qc_arr.cbegind_c='借';
                                }else if(diff_mb<0){
                                    qc_arr.cbegind_c='贷';
                                }else{
                                    qc_arr.cbegind_c='平';
                                    qc_arr.mb='';
                                    qc_arr.mb_f='';
                                    qc_arr.nb_s='';
                                }
                            }else if(d.data[0].cbegind_c==='贷'){
                                if(diff_mb>0){
                                    qc_arr.cbegind_c='贷';
                                }else if(diff_mb<0){
                                    qc_arr.cbegind_c='借';
                                }else{
                                    qc_arr.cbegind_c='平';
                                    qc_arr.mb='';
                                    qc_arr.mb_f='';
                                    qc_arr.nb_s='';
                                }
                            }
                        }
                    }
                }
            });
            return qc_arr;
        }

        /*获取本期*/
        var bqFun=function(callback){
            var bq_arr={};
            $.ajax({
                url: server_url,
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    how: 'query',
                    zth: zth,
                    year: year,
                    sql: 'select sum(md) as md,sum(mc) as mc,sum(md_f) as md_f,sum(mc_f) as mc_f,sum(nd_s) as nd_s,sum(nc_s) as nc_s from GL_accvouch where ccode like \'' + code + '%\' and (iperiod between ' + month1 + ' and ' + month2 + ')' + str_sql_nojz
                },
                success: function(d){
                    //console.log(d);
                    if(d.status===1){
                        if(d.count!=='0'){
                            bq_arr=d.data[0];
                        }
                    }
                }
            });
            return bq_arr;
        }

        /*获取累计*/
        var totalFun=function(callback){
            var total_arr={};
            $.ajax({
                url: server_url,
                async: false,
                type: 'post',
                dataType: 'json',
                data: {
                    how: 'query',
                    zth: zth,
                    year: year,
                    sql: 'select sum(md) as md,sum(mc) as mc,sum(md_f) as md_f,sum(mc_f) as mc_f,sum(nd_s) as nd_s,sum(nc_s) as nc_s from GL_accvouch where ccode like \'' + code + '%\' and (iperiod between 1 and ' + month2 + ')' + str_sql_nojz
                },
                success: function(d){
                    //console.log(d);
                    if(d.status===1){
                        if(d.count!=='0'){
                            total_arr=d.data[0];
                        }
                    }
                }
            });
            return total_arr;
        }

        /*计算期末*/
        var qc_arr=qcFun(),
            bq_arr=bqFun(),
            total_arr=totalFun(),
            qc_fx=qc_arr?qc_arr.cbegind_c:0,
            qc_mb=qc_arr?Number(qc_arr.mb):0,
            bq_md=Number(bq_arr.md),
            bq_mc=Number(bq_arr.mc),
            qm_price=0.00,
            yeb_obj={};
            yeb_obj.qc={};yeb_obj.bq={};yeb_obj.qm={};yeb_obj.total={};
        bq_md=bq_md!==0?bq_md:''; 
        bq_mc=bq_mc!==0?bq_mc:''; 
        if(qc_fx==='借'){
            yeb_obj.qc.jf=qc_mb;
            yeb_obj.qc.df='';
            yeb_obj.bq.jf=bq_md;
            yeb_obj.bq.df=bq_mc;
            qm_price=qc_mb+bq_md-bq_mc;
        }else if(qc_fx==='贷'){
            yeb_obj.qc.jf='';
            yeb_obj.qc.df=qc_mb;
            yeb_obj.bq.jf=bq_md;
            yeb_obj.bq.df=bq_mc;
            qm_price=-qc_mb+bq_md-bq_mc;
        }else{
            yeb_obj.qc.jf='';
            yeb_obj.qc.df='';
            yeb_obj.bq.jf=bq_md;
            yeb_obj.bq.df=bq_mc;
            qm_price=bq_md-bq_mc;
        }
        qm_price=Number(qm_price.toFixed(2));
        if(qm_price>0){
            yeb_obj.qm.jf=qm_price;
            yeb_obj.qm.df='';
        }else if(qm_price<0){
            yeb_obj.qm.jf='';
            yeb_obj.qm.df=qm_price*-1;
        }else{
            yeb_obj.qm.jf='';
            yeb_obj.qm.df='';
        }

        yeb_obj.total.jf=Number(total_arr.md);
        yeb_obj.total.df=Number(total_arr.mc);

        /*数量*/
        var qc_nb=qc_arr.nb_s?Number(qc_arr.nb_s):0;
        yeb_obj.qc.sl=qc_nb;
        yeb_obj.bq.sl_j=Number(bq_arr.nd_s);
        yeb_obj.bq.sl_d=Number(bq_arr.nc_s);
        yeb_obj.qm.sl=qc_nb+Number(bq_arr.nd_s)-Number(bq_arr.nc_s);
        yeb_obj.total.sl_j=Number(total_arr.nd_s);
        yeb_obj.total.sl_d=Number(total_arr.nc_s);

        /*外币*/
        var qc_mb=qc_arr.mb_f?Number(qc_arr.mb_f):0;
        yeb_obj.qc.wb=qc_mb;
        yeb_obj.bq.wb_j=Number(bq_arr.md_f);
        yeb_obj.bq.wb_d=Number(bq_arr.mc_f);
        yeb_obj.qm.wb=Math.abs((qc_arr.cbegind_c==='借'>0?qc_mb:(qc_mb*-1))+Number(bq_arr.md_f)-Number(bq_arr.mc_f));
        yeb_obj.total.wb_j=Number(total_arr.md_f);
        yeb_obj.total.wb_d=Number(total_arr.mc_f);

        return yeb_obj;
    }

    var isEmptyObject=function(obj){
        var bool=true;
        //console.log(arr);
        for(var i in obj){
            if(typeof(obj[i])=='object'){
                for(var j in obj[i]){
                    if(obj[i][j]!=='' && Number(obj[i][j])!==0){
                        bool=false;
                        break;
                    }
                }
            }else{
                if(obj[i]!=='' && Number(obj[i])!==0){
                    bool=false;
                    break;
                }
            }
        }
        return bool;
    }

    var codeYebFun=function(class_table){
        var count=code_arr.length,
            $tbody=$('.yeb-table-wrap .table tbody'),
            yeb_obj={},obj_data={};    
        if(num<count){
            yeb_obj=yebFun(code_arr[num].ccode,p_month1,p_month2,p_year,p_zth);
            if(!isEmptyObject(yeb_obj)){
                obj_data={
                    no: index++,
                    code: '<a href="明细账.html?zth='+p_zth+'&month1='+p_month1+'&month2='+p_month2+'&year='+p_year+'&code='+code_arr[num].ccode+'&how=query" target="_blank" title="查明细">'+code_arr[num].ccode+'</a>',
                    code_name: code_arr[num].ccode_name,
                    qc: yeb_obj.qc,
                    bq: yeb_obj.bq,
                    qm: yeb_obj.qm,
                    total: yeb_obj.total
                };
                console.log(yeb_obj);
                $tbody.append(tableTemplate(
                    class_table,
                    '',
                    obj_data
                ));

                if(code_arr[num].bend==='True'){
                    obj_sum.qc.jf+=parseFloat(yeb_obj.qc.jf?yeb_obj.qc.jf:0);
                    obj_sum.qc.df+=parseFloat(yeb_obj.qc.df?yeb_obj.qc.df:0);
                    obj_sum.bq.jf+=parseFloat(yeb_obj.bq.jf?yeb_obj.bq.jf:0);
                    obj_sum.bq.df+=parseFloat(yeb_obj.bq.df?yeb_obj.bq.df:0);
                    obj_sum.qm.jf+=parseFloat(yeb_obj.qm.jf?yeb_obj.qm.jf:0);
                    obj_sum.qm.df+=parseFloat(yeb_obj.qm.df?yeb_obj.qm.df:0);
                    obj_sum.total.jf+=parseFloat(yeb_obj.total.jf?yeb_obj.total.jf:0);
                    obj_sum.total.df+=parseFloat(yeb_obj.total.df?yeb_obj.total.df:0);
                    obj_allsum.qc.jf+=parseFloat(yeb_obj.qc.jf?yeb_obj.qc.jf:0);
                    obj_allsum.qc.df+=parseFloat(yeb_obj.qc.df?yeb_obj.qc.df:0);
                    obj_allsum.bq.jf+=parseFloat(yeb_obj.bq.jf?yeb_obj.bq.jf:0);
                    obj_allsum.bq.df+=parseFloat(yeb_obj.bq.df?yeb_obj.bq.df:0);
                    obj_allsum.qm.jf+=parseFloat(yeb_obj.qm.jf?yeb_obj.qm.jf:0);
                    obj_allsum.qm.df+=parseFloat(yeb_obj.qm.df?yeb_obj.qm.df:0);
                    obj_allsum.total.jf+=parseFloat(yeb_obj.total.jf?yeb_obj.total.jf:0);
                    obj_allsum.total.df+=parseFloat(yeb_obj.total.df?yeb_obj.total.df:0);
                }
            }
            if(num+1<count){
                if(code_arr[num].ccode.slice(0,1)!==code_arr[num+1].ccode.slice(0,1)){
                    obj_data={
                        no: index++,
                        code: code_arr[num].cclass + '小计',
                        code_name: '',
                        qc: obj_sum.qc,
                        bq: obj_sum.bq,
                        qm: obj_sum.qm,
                        total: obj_sum.total
                    };
                    $tbody.append(tableTemplate(
                        class_table,
                        'info',
                        obj_data
                    ));
                    obj_sum={
                        qc: {jf: 0,df: 0,sl: 0,wb: 0},
                        bq: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0},
                        qm: {jf: 0,df: 0,sl: 0,wb: 0},
                        total: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0}
                    };
                }
            }
            num++;
            setTimeout(function(){
                codeYebFun(class_table);
            },50);
        }else{
            if(!$tbody.find('tr:last').hasClass('info')){
                obj_data={
                    no: index++,
                    code: code_arr[num-1].cclass + '小计',
                    code_name: '',
                    qc: obj_sum.qc,
                    bq: obj_sum.bq,
                    qm: obj_sum.qm,
                    total: obj_sum.total
                };
                $tbody.append(tableTemplate(
                    class_table,
                    'info',
                    obj_data
                ));
            }
            console.log('查询完毕');
            obj_data={
                no: index++,
                code: '合计',
                code_name: '',
                qc: obj_allsum.qc,
                bq: obj_allsum.bq,
                qm: obj_allsum.qm,
                total: obj_allsum.total
            };
            $tbody.append(tableTemplate(
                class_table,
                'success',
                obj_data
            ));
            NProgress.done();
            var mydate=new Date(),
                myyear=mydate.getFullYear(),
                mymonth=mydate.getMonth()+1,
                mydate=mydate.getDate();
            mymonth=mymonth>9?mymonth:'0'+mymonth;
            mydate=mydate>9?mydate:'0'+mydate;    
            $('.txt-filldate').html(myyear+'-'+mymonth+'-'+mydate);
        }
        NProgress.set(num/count);
    }

    var num=0,index=1,
        code_arr=[],
        obj_intsum={
            qc: {jf: 0,df: 0,sl: 0,wb: 0},
            bq: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0},
            qm: {jf: 0,df: 0,sl: 0,wb: 0},
            total: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0}
        },
        obj_sum=obj_intsum,
        obj_allsum=obj_intsum;
    function queryCode(code1,code2,str_codename,str_tableformat,bool_lastcode){
        var code1=code1?code1:'1001',
            code2=code2?code2:'9999',
            str_sql_lastcode='',
            str_sql_nojz='';
        num=0;index=1;
        obj_sum={
            qc: {jf: 0,df: 0,sl: 0,wb: 0},
            bq: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0},
            qm: {jf: 0,df: 0,sl: 0,wb: 0},
            total: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0}
        };
        obj_allsum={
            qc: {jf: 0,df: 0,sl: 0,wb: 0},
            bq: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0},
            qm: {jf: 0,df: 0,sl: 0,wb: 0},
            total: {jf: 0,df: 0,sl_j: 0,sl_d: 0,wb_j: 0,wb_d: 0}
        };
        if(bool_lastcode) str_sql_lastcode=' and bend=\'True\'';
        $.ajax({
            url: server_url,
            async: true,
            type: 'post',
            dataType: 'json',
            data: {
                how: 'query',
                zth: p_zth,
                year: p_year,
                sql: 'select cclass,ccode,ccode_name,bend from code where (ccode >= \''+code1+'\' and ccode < \''+code2+'\' or ccode like \'' + code2 + '%\') and ccode_name like \'%'+str_codename+'%\''+ str_sql_lastcode +' order by ccode'
            },
            success: function(d){
                //console.log(d);
                if(d.status===1){
                    if(parseInt(d.count)>0){
                        code_arr=d.data;
                        codeYebFun(str_tableformat);
                        NProgress.start();
                    }else{
                        dialog({
                            title: '查询失败',
                            content: '找不到指定科目'
                        }).width(320).showModal();
                    }
                }else if(d.status===-3){
                    //location.href='index.html';
                }else{
                    dialog({
                        title: '读取失败',
                        content: d.err
                    }).width(320).showModal();
                    
                }
            }
        });
    }

    /*点击打印*/
    $('.btn-print').on('click',function(){
        $('.fixed-tool').removeClass('show');
        window.print();
    });

    /*点击导出XLSX*/
    $('.btn-xlsx').on('click',function(){
        /*dialog({
            title: '提示',
            content: '功能正在开发'
        }).width(120).showModal();*/
        excelExporter.fromTable('yeb-table','余额表'+convertDate()+'.xls',p_year+'年'+p_month1+'月-'+p_month2+'月');
    });
}    

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {
        require('nprogress');
        require('dialog');
        require('common');
        require('jwerty');
        require('jstree');
        require('excelExporter');
        exports.init=yebWFun;
    });
}else{
    yebWFun();
}