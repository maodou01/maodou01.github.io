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
                }else{
                    str_html+='<option value="'+obj.iYear+'">'+obj.iYear+'</option>';
                }
            });
            $('.select-year').html(str_html);
            if(getQueryString('query')==='yes') $('.btn-query').trigger('click');
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

    /*F2键弹出科目*/
    jwerty.key('ctrl+f2/f2',function(e){
        console.log(e);
        stopDefault(e);
        console.log('ok');
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
                        text: '列表1',
                        children: [ { id: '11','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '2',
                        text: '列表2',
                        children: [ { id: '21','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '3',
                        text: '列表3',
                        children: [ { id: '31','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '4',
                        text: '列表4',
                        children: [ { id: '41','text' : 'Child 1' }, 'Child 2']
                    },
                    {
                        id: '5',
                        text: '列表5',
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
        $('#code-list').jstree('select_node', '11');
        $('#code-list').on("changed.jstree", function (e, data) {
            console.log(data.selected);
            code_pop.remove();
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
        $('.fixed-tool').removeClass('show');
        $('.yeb-table-wrap .txt-query-time').html(p_year+'年'+p_month1+'月-'+p_month2+'月');
        $('.yeb-table-wrap .table').hide(0);
        $('.yeb-table-wrap .'+str_tableformat).fadeIn(400).find('tbody').html('');
        $('.txt-filldate').html('查询中');
        queryCode(str_code1,str_code2,str_codename,str_tableformat,bool_lastcode);       
    });

    $('.has-total').on('change',function(){
        var bool=$(this).prop('checked');
        if(bool){
            $('.table').addClass('has_add_up');
        }else{
            $('.table').removeClass('has_add_up');
        }    
    });

    /*账簿格式模板*/
    var tableTemplate=function(class_table,class_name){
        var str_html='',
            str_class_name=class_name?' class="'+class_name+'"':''
            arg=arguments;
        var no=arg[2],
            obj_code=arg[3];    
        switch(class_table){
            case 'table_amount':/*金额*/
                var arr_data=arg[4],
                    col2=obj_code.ccode,
                    col3=obj_code.ccode_name;
                if(arg.length===6){
                    var str_total=arg[5];
                    col3='';
                    if(str_total==='小计'){
                        col2=obj_code.cclass+'小计';
                    }else if(str_total==='合计'){
                        col2='合&nbsp;&nbsp;&nbsp;&nbsp;计';
                    }
                }    
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+no+'</td>'+
                    '<td class="text-left">'+col2+'</td>'+
                    '<td class="text-left">'+col3+'</td>'+
                    '<td class="price">'+(arr_data[0]!==0?current(arr_data[0]):'')+'</td>'+
                    '<td class="price">'+(arr_data[1]!==0?current(arr_data[1]):'')+'</td>'+
                    '<td class="price">'+(arr_data[2]!==0?current(arr_data[2]):'')+'</td>'+
                    '<td class="price">'+(arr_data[3]!==0?current(arr_data[3]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[6]!==0?current(arr_data[6]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[7]!==0?current(arr_data[7]):'')+'</td>'+
                    '<td class="price">'+(arr_data[4]!==0?current(arr_data[4]):'')+'</td>'+
                    '<td class="price">'+(arr_data[5]!==0?current(arr_data[5]):'')+'</td>'+
                '</tr>';
            break;
            case 'table_quantity_amount':/*数量金额*/
                var arr_data=arg[4],
                    col2=obj_code.ccode,
                    col3=obj_code.ccode_name,
                    col4='平',col6=0.00,
                    col15='平',col16=0,col17=0.00;
                if(arg.length===6){
                    var str_total=arg[5];
                    col3='';
                    if(str_total==='小计'){
                        col2=obj_code.cclass+'小计';
                    }else if(str_total==='合计'){
                        col2='合&nbsp;&nbsp;&nbsp;&nbsp;计';
                    }
                }
                if(Number(arr_data[0])!==0){
                    col4='借';
                    col6=arr_data[0];
                }else if(Number(arr_data[1])!==0){
                    col4='贷';
                    col6=arr_data[1];
                }
                if(Number(arr_data[4])!==0){
                    col15='借';
                    col17=arr_data[4];
                }else if(Number(arr_data[5])!==0){
                    col15='贷';
                    col17=arr_data[5];
                }
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+no+'</td>'+
                    '<td>'+col2+'</td>'+
                    '<td>'+col3+'</td>'+
                    '<td class="text-center">'+col4+'</td>'+
                    '<td class="text-center">'+(arr_data[8]!==0?arr_data[8]:'')+'</td>'+
                    '<td class="price">'+(col6!==0?current(col6):'')+'</td>'+
                    '<td class="text-center">'+(arr_data[9]!==0?arr_data[9]:'')+'</td>'+
                    '<td class="price">'+(arr_data[2]!==0?current(arr_data[2]):'')+'</td>'+
                    '<td class="text-center">'+(arr_data[10]!==0?arr_data[10]:'')+'</td>'+
                    '<td class="price">'+(arr_data[3]!==0?current(arr_data[3]):'')+'</td>'+
                    '<td class="text-center t_add_up">'+(arr_data[12]!==0?arr_data[12]:'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[6]!==0?current(arr_data[6]):'')+'</td>'+
                    '<td class="text-center t_add_up">'+(arr_data[13]!==0?arr_data[13]:'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[7]!==0?current(arr_data[7]):'')+'</td>'+
                    '<td class="text-center">'+col15+'</td>'+
                    '<td class="text-center">'+(arr_data[11]!==0?arr_data[11]:'')+'</td>'+
                    '<td class="price">'+(col17!==0?current(col17):'')+'</td>'+
                '</tr>';
            break;
            case 'table_foreign_amount':/*外币金额*/
                var arr_data=arg[4],
                    col2=obj_code.ccode,
                    col3=obj_code.ccode_name,
                    col4='平',col6=0.00,
                    col15='平',col16=0,col17=0.00;
                if(arg.length===6){
                    var str_total=arg[5];
                    col3='';
                    if(str_total==='小计'){
                        col2=obj_code.cclass+'小计';
                    }else if(str_total==='合计'){
                        col2='合&nbsp;&nbsp;&nbsp;&nbsp;计';
                    }
                }
                if(Number(arr_data[0])!==0){
                    col4='借';
                    col6=arr_data[0];
                }else if(Number(arr_data[1])!==0){
                    col4='贷';
                    col6=arr_data[1];
                }
                if(Number(arr_data[4])!==0){
                    col15='借';
                    col17=arr_data[4];
                }else if(Number(arr_data[5])!==0){
                    col15='贷';
                    col17=arr_data[5];
                }
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+no+'</td>'+
                    '<td>'+col2+'</td>'+
                    '<td>'+col3+'</td>'+
                    '<td class="text-center">'+col4+'</td>'+
                    '<td class="price">'+(arr_data[14]!==0?current(arr_data[14]):'')+'</td>'+
                    '<td class="price">'+(col6!==0?current(col6):'')+'</td>'+
                    '<td class="price">'+(arr_data[15]!==0?current(arr_data[15]):'')+'</td>'+
                    '<td class="price">'+(arr_data[2]!==0?current(arr_data[2]):'')+'</td>'+
                    '<td class="price">'+(arr_data[16]!==0?current(arr_data[16]):'')+'</td>'+
                    '<td class="price">'+(arr_data[3]!==0?current(arr_data[3]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[18]!==0?current(arr_data[18]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[6]!==0?current(arr_data[6]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[19]!==0?current(arr_data[19]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[7]!==0?current(arr_data[7]):'')+'</td>'+
                    '<td class="text-center">'+col15+'</td>'+
                    '<td class="price">'+(arr_data[17]!==0?current(arr_data[17]):'')+'</td>'+
                    '<td class="price">'+(col17!==0?current(col17):'')+'</td>'+
                '</tr>';
            break;
            case 'table_quantity_foreign':/*数量外币*/
                var arr_data=arg[4],
                    col2=obj_code.ccode,
                    col3=obj_code.ccode_name,
                    col4='平',col6=0.00,
                    col15='平',col16=0,col17=0.00;
                if(arg.length===6){
                    var str_total=arg[5];
                    col3='';
                    if(str_total==='小计'){
                        col2=obj_code.cclass+'小计';
                    }else if(str_total==='合计'){
                        col2='合&nbsp;&nbsp;&nbsp;&nbsp;计';
                    }
                }
                if(Number(arr_data[0])!==0){
                    col4='借';
                    col6=arr_data[0];
                }else if(Number(arr_data[1])!==0){
                    col4='贷';
                    col6=arr_data[1];
                }
                if(Number(arr_data[4])!==0){
                    col15='借';
                    col17=arr_data[4];
                }else if(Number(arr_data[5])!==0){
                    col15='贷';
                    col17=arr_data[5];
                }
                str_html='<tr'+str_class_name+'>'+
                    '<td class="text-center">'+no+'</td>'+
                    '<td>'+col2+'</td>'+
                    '<td>'+col3+'</td>'+
                    '<td class="text-center">'+col4+'</td>'+
                    '<td class="text-center">'+(arr_data[8]!==0?arr_data[8]:'')+'</td>'+
                    '<td class="price">'+(arr_data[14]!==0?current(arr_data[14]):'')+'</td>'+
                    '<td class="price">'+(col6!==0?current(col6):'')+'</td>'+
                    '<td class="text-center">'+(arr_data[9]!==0?arr_data[9]:'')+'</td>'+
                    '<td class="price">'+(arr_data[15]!==0?current(arr_data[15]):'')+'</td>'+
                    '<td class="price">'+(arr_data[2]!==0?current(arr_data[2]):'')+'</td>'+
                    '<td class="text-center">'+(arr_data[10]!==0?arr_data[10]:'')+'</td>'+
                    '<td class="price">'+(arr_data[16]!==0?current(arr_data[16]):'')+'</td>'+
                    '<td class="price">'+(arr_data[3]!==0?current(arr_data[3]):'')+'</td>'+
                    '<td class="text-center t_add_up">'+(arr_data[12]!==0?arr_data[12]:'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[18]!==0?current(arr_data[18]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[6]!==0?current(arr_data[6]):'')+'</td>'+
                    '<td class="text-center t_add_up">'+(arr_data[13]!==0?arr_data[13]:'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[19]!==0?current(arr_data[19]):'')+'</td>'+
                    '<td class="price t_add_up">'+(arr_data[7]!==0?current(arr_data[7]):'')+'</td>'+
                    '<td class="text-center">'+col15+'</td>'+
                    '<td class="text-center">'+(arr_data[11]!==0?arr_data[11]:'')+'</td>'+
                    '<td class="price">'+(arr_data[17]!==0?current(arr_data[17]):'')+'</td>'+
                    '<td class="price">'+(col17!==0?current(col17):'')+'</td>'+
                '</tr>';
            break;
        }
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
            yeb_arr=[];
        bq_md=bq_md!==0?bq_md:''; 
        bq_mc=bq_mc!==0?bq_mc:''; 
        if(qc_fx==='借'){
            yeb_arr=[qc_mb,'',bq_md,bq_mc];
            qm_price=qc_mb+bq_md-bq_mc;
        }else if(qc_fx==='贷'){
            yeb_arr=['',qc_mb,bq_md,bq_mc];
            qm_price=-qc_mb+bq_md-bq_mc;
        }else{
            yeb_arr=['','',bq_md,bq_mc];
            qm_price=bq_md-bq_mc;
        }
        qm_price=Number(qm_price.toFixed(2));
        if(qm_price>0){
            yeb_arr.push(qm_price);
            yeb_arr.push('');
        }else if(qm_price<0){
            yeb_arr.push('');
            yeb_arr.push(qm_price*-1);
        }else{
            yeb_arr.push('');
            yeb_arr.push('');
        }

        yeb_arr.push(Number(total_arr.md));
        yeb_arr.push(Number(total_arr.mc));

        /*数量*/
        var qc_nb=qc_arr.nb_s?Number(qc_arr.nb_s):0;
        yeb_arr.push(qc_nb);
        yeb_arr.push(Number(bq_arr.nd_s));
        yeb_arr.push(Number(bq_arr.nc_s));
        yeb_arr.push(qc_nb+Number(bq_arr.nd_s)-Number(bq_arr.nc_s));
        yeb_arr.push(Number(total_arr.nd_s));
        yeb_arr.push(Number(total_arr.nc_s));

        /*外币*/
        var qc_mb=qc_arr.mb_f?Number(qc_arr.mb_f):0;
        yeb_arr.push(qc_mb);
        yeb_arr.push(Number(bq_arr.md_f));
        yeb_arr.push(Number(bq_arr.mc_f));
        yeb_arr.push(Math.abs((qc_arr.cbegind_c==='借'>0?qc_mb:(qc_mb*-1))+Number(bq_arr.md_f)-Number(bq_arr.mc_f)));
        yeb_arr.push(Number(total_arr.md_f));
        yeb_arr.push(Number(total_arr.mc_f));

        return yeb_arr;
    }

    var isEmptyArray=function(arr){
        var bool=true;
        console.log(arr);
        for(var i in arr){
            if(arr[i]!=='' && Number(arr[i])!==0){
                bool=false;
                break;
            }
        }
        return bool;
    }

    var codeYebFun=function(class_table){
        var count=code_arr.length,
            $tbody=$('.yeb-table-wrap .'+class_table+' tbody'),
            yeb_arr=[];    
        if(num<count){
            yeb_arr=yebFun(code_arr[num].ccode,p_month1,p_month2,p_year,p_zth);
            if(!isEmptyArray(yeb_arr)){
                $tbody.append(tableTemplate(
                    class_table,
                    '',
                    index++,
                    code_arr[num],
                    yeb_arr
                ));

                if(code_arr[num].bend==='True'){
                    for(var i=0; i<20; i++){
                        p_total[i]+=parseFloat(yeb_arr[i]?yeb_arr[i]:0);
                        p_alltotal[i]+=parseFloat(yeb_arr[i]?yeb_arr[i]:0);
                    }
                }
            }

            if(num+1<count){
                if(code_arr[num].ccode.slice(0,1)!==code_arr[num+1].ccode.slice(0,1)){
                    $tbody.append(tableTemplate(
                        class_table,
                        'info',
                        index++,
                        code_arr[num],
                        p_total,
                        '小计'
                    ));
                    p_total=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
                }
            }
            num++;
            setTimeout(function(){
                codeYebFun(class_table);
            },50);
        }else{
            if(!$tbody.find('tr:last').hasClass('info')){
                $tbody.append(tableTemplate(
                    class_table,
                    'info',
                    index++,
                    code_arr[num-1],
                    p_total,
                    '小计'
                ));
            }
            console.log('查询完毕');
            $tbody.append(tableTemplate(
                class_table,
                'success',
                index++,
                {},
                p_alltotal,
                '合计'
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
        p_total=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],
        p_alltotal=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
    function queryCode(code1,code2,str_codename,str_tableformat,bool_lastcode){
        var code1=code1?code1:'1001',
            code2=code2?code2:'9999',
            str_sql_lastcode='',
            str_sql_nojz='';
        num=0;index=1;
        p_total=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
        p_alltotal=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00];
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
                console.log(d);
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
        dialog({
            title: '提示',
            content: '功能正在开发'
        }).width(120).showModal();
        //excelExporter.fromTable('output-table','余额表'+convertDate()+'.xls',convertDate('date'));
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