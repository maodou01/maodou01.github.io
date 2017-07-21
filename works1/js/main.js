/*页头-弹微信图*/
if($('.header .dropdown-toggle').length){
    var $img_wx=$('.header .dropdown-menu.wx');
    var $img_app=$('.header .dropdown-menu.app'),
        is_over=false;
    $('.header .dropdown-toggle.wx').hover(function(){
        $img_app.fadeOut(400);
        $img_wx.fadeIn(400);
    },function(){
        $img_wx.fadeOut(400);
    });
    $('.header .dropdown-toggle.app').on({
        click:function(){
            $img_app.fadeToggle(400);
        },
        mouseover:function(){
            $img_app.fadeIn(400);
        }
    });
    $('body').on('click',function(){
        if($img_app.css('display')=='block'){
            $img_app.fadeOut(400);
        }
    });
}

/*首页登录-注册*/
$(function(){
    if($('.banner-box').length){
        /*tab切换*/
        $('.status-box').on('click','.tab-nav li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var data_calss=$(this).attr('data-class');
            $('.status-box .register,.status-box .login-box').css({
                'display': 'none'
            });
            $('.status-box').find('.'+data_calss).css({
                'display': 'block'
            });
        });
        /*文本框处理*/
        $('.status-box').on('focus','input.gray',function(){
            var is_pass=$(this).hasClass('pass'),
                data_value=$(this).attr('data-value');
            $(this).removeClass('gray').val('');
            if(is_pass){
                var $parent=$(this).parent(),
                    html='<input class="pass" type="password" data-value="'+data_value+'" />',
                    $icon=$parent.find('.icon');
                $parent.html(html).append($icon).find('input').focus();
            }
        });
        $('.status-box').on('blur','input',function(){
            var data=$(this).val(),
                prev_data=$(this).attr('data-value'),
                is_pass=$(this).hasClass('pass');
            if(is_pass && !data){
                var $parent=$(this).parent(),
                    $icon=$parent.find('.icon');
                $parent.html('<input class="pass gray" type="text" data-value="'+prev_data+'" value="'+prev_data+'" />').append($icon);
            }else if(!is_pass && !$.trim(data)){
                $(this).addClass('gray').val(prev_data);
            }
        });
        /*发送验证码*/
        $('.status-box').on('click','a.tip',function(){
            if($(this).html().indexOf('秒')>-1) return false;
            var $phone=$('.status-box .register').find('input.phone'),
                phone=$.trim($phone.val()),
                mbTest = /^(13|15|18|14|17)[0-9]{9}$/;;
            if (phone.length > 0 && !$phone.hasClass('gray')) {
                if (!mbTest.test(phone)) {
                    layer.alert('您输入的手机号码长度或格式错误，请检查。',{icon:5,title:"检查有误"},function(index){
                        layer.close(index);
                        $phone.focus().select();
                    });
                }else{
                    $('.status-box .black-bj-add').fadeIn(300,function(){
                        $('.status-box .pops').css('display','block');
                        $(this).css({
                            'filter':'alpha(opacity=50)'
                        });
                        var $input=$('.status-box .pops input'),
                            prev_data=$input.attr('data-value'),
                            $img=$input.next('.img');
                        $input.addClass('gray').val(prev_data);
                        $img.attr('src',$img.attr('data-src')+'?t='+Math.random());
                    });
                }
            }else {
                layer.alert('您输入的手机号码不能为空，请检查。',{icon:5,title:"检查有误"},function(index){
                    layer.close(index);
                    $phone.focus().select();
                });
            }
        });
        $('.status-box').on('click','.black-bj-add',function(){
            $('.status-box .pops').css('display','none');
            $('.status-box .black-bj-add').fadeOut(400);
        });
        $('.status-box').on('keyup','.pops input',function(){
            var $phone=$('.status-box .register').find('input.phone'),
                $vpcode=$('.status-box .register').find('input.vpcode'),
                $this=$(this),
                data=$.trim($this.val()),
                prev_data=$this.attr('data-value');
            if(data.length==4){
                $('.status-box .pops').css('display','none');
                $('.status-box .black-bj-add').fadeOut(400);
                var indexLoad=layer.load(2);
                $.post('/union/sendphonecodex',{
                    phone: $.trim($phone.val()),
                    vcode: data,
                    type: 41
                },function(d){
                    layer.close(indexLoad);
                    if (d.status == 1) {
                        layer.alert("短信验证码已发送您的手机，请注意查收。",{icon:6,title:'发送成功'},function(index){
                            layer.close(index);
                            $vpcode.val('').focus();
                            smsTime();
                        });
                    }else if (d.status == 2) {
                        layer.alert("此手机号已绑定账号",{icon:5,title:'抱歉'},function(index){
                            layer.close(index);
                            $phone.focus().select();
                        });
                    }else {
                        var msg = d.message || '短信验证码发送失败';
                        layer.alert(msg,{icon:5,title:'错误'});
                    }
                },'json');
            }else if(data.length>4){
                $(this).val(data.replace(data.slice(4),''));
            }
        });
        /*必须同意协议*/
        $('.status-box').on('click','.isread input',function(){
            var $this=$(this),
                is_checked=$(this).is(':checked');
            if(!is_checked){
                layer.alert("请务必同意《金融桥使用协议》。系统自动视为已勾选！",{icon:5,title:'提示'},function(index){
                    layer.close(index);
                    $this.prop('checked','true');
                });
            }
        });
        /*立即注册*/
        $('.status-box .register').on('click','a.link',function(){
            var $phone=$('.status-box .register').find('input.phone'),
                $vpcode=$('.status-box .register').find('input.vpcode'),
                $pass=$('.status-box .register').find('input.pass'),
                boolpass=true;
            if(!$.trim($vpcode.val()) || $vpcode.hasClass('gray')){
                layer.alert("输入短信验证码不能为空。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $vpcode.focus().select();
                });
                boolpass=false;
            }
            if(!$pass.val() || $pass.hasClass('gray')){
                layer.alert("输入设置密码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $pass.focus().select();
                });
                boolpass=false;
            }
            if(!$phone.val() || $phone.hasClass('gray')){
                layer.alert("输入手机号码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $phone.focus().select();
                });
                boolpass=false;
            }

            if(boolpass){
                $.post('/union/wxreg/',{
                    vpcode: $.trim($vpcode.val()),
                    password: $pass.val(),
                    repassword: $pass.val()
                },function(d){
                    if(d.status==1){
                        location.reload();
                    }else{
                        layer.confirm(d.message,{icon:5,title:'提交失败',btn:['联系客服','知道了']},function(index){
                            window.open('http://crm2.qq.com/page/portalpage/wpa.php?uin=4008558266&aty=0&a=0&curl=&ty=1', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
                            layer.close(index);
                        },function(index){
                            layer.close(index);
                        });
                    }
                },'json');
            }
        });
        /*快速登录*/
        $('.status-box .login-box').on('click','a.link',function(){
            var $phone=$('.status-box .login-box').find('input.phone'),
                $vcode=$('.status-box .login-box').find('input.vcode'),
                $pass=$('.status-box .login-box').find('input.pass'),
                boolpass=true;
            if(!$.trim($vcode.val()) || $vcode.hasClass('gray')){
                layer.alert("输入图形验证码不能为空。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $vcode.focus().select();
                });
                boolpass=false;
            }
            if(!$pass.val() || $pass.hasClass('gray')){
                layer.alert("输入密码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $pass.focus().select();
                });
                boolpass=false;
            }
            if(!$.trim($phone.val()) || $phone.hasClass('gray')){
                layer.alert("输入用户名不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                    layer.close(index);
                    $phone.focus().select();
                });
                boolpass=false;
            }
            if(boolpass){
                LoginSubmit(this,'/',{
                    "sUserName": $.trim($phone.val()),
                    "sPassword": $.trim($pass.val()),
                    "sVerCode": $.trim($vcode.val())
                },$vcode.next('.img'),$vcode);
            } 
        });
    }
});
/* 发送短信验证码-延迟 */
var index_t=60;
function smsTime(){
    var element='.status-box a.tip';
    $(element).html(index_t+'秒后重发');
    index_t--;
    if(index_t>=0){
        setTimeout('smsTime()',1000);
    }else{
        $(element).html('重发验证码');
        index_t=60;
    }
}

/*固定垂直菜单--投资列表*/
if($('.page .project-list-box .dhfl').length){
    $(window).on('scroll',function(){
        var w_top=$(window).scrollTop(),
            d_top=$('.page .project-list-box').offset().top;  
        if(w_top > d_top){
            $('.page .project-list-box .dhfl').animate({
                top: (w_top-d_top) + 'px'
            },50);
        }else{
            $('.page .project-list-box .dhfl').stop().animate({
                top: '0px'
            },100);
        }
    });
}

/*执行登录*/
function LoginSubmit(ctrl,url,dataObj,$img,$vcode){
    $(ctrl).unbind("click"); 
    var index = layer.load();
    if(!dataObj){
        dataObj={"sUserName": $("#txtUser").val(),"sPassword": $("#password").val(),"sVerCode": $("#txtCode").val(),"Keep": $("#loginstate").val()};
    }
    if(!$img){
        $img=$('#imVcode');
    }
    if(!$vcode){
        $vcode=$('#txtCode');
    }
    $.ajax({
        url: "/member/common/actlogin/",
        data: dataObj,
        timeout: 5000,
        cache: false,
        type: "post",
        dataType: "json",
        success: function (d, s, r) {
            layer.close(index);
            if(d){
                if(d.status==0){
                    if(d.message.indexOf('验证码')>-1){
                        layer.alert(d.message,{icon:2,title:'警告'},function(index){
                            layer.close(index);
                            $vcode.val('').focus();
                        });
                    }else{
                        layer.alert(d.message,{icon:2,title:'警告'});
                    }
                }else{
                    /*登录成功后跳转url*/
                    if(url){
                        location.href=url;
                    }else{
                        location.reload();
                    }
                }
            }
            /*刷新验证码*/
            $img.trigger('click');
        },
        error: function(){
            layer.close(index);
            layer.alert('数据异常，请联系客服，谢谢。',{icon:2});
        }
    });
}

/*文本框处理-注册登录*/
$('.login-page').on('focus','input.gray',function(){
    var is_pass=$(this).hasClass('pass'),
        data_value=$(this).attr('data-value');
    $(this).removeClass('gray').val('');
    if(is_pass){
        var $parent=$(this).parent(),
            html='<input class="input pass" type="password" data-value="'+data_value+'" />',
            $icon=$parent.find('.icon');
        $parent.html(html).append($icon).find('input').focus();
    }
});
$('.login-page').on('blur','.input',function(){
    var data=$(this).val(),
        prev_data=$(this).attr('data-value'),
        is_pass=$(this).hasClass('pass');
    if(is_pass && !data){
        var $parent=$(this).parent(),
            $icon=$parent.find('.icon');
        $parent.html('<input class="input pass gray" type="text" data-value="'+prev_data+'" value="'+prev_data+'" />').append($icon);
    }else if(!is_pass && !$.trim(data)){
        $(this).addClass('gray').val(prev_data);
    }
});

/*注册*/
if($('.login-page .register-box').length){
    var $register=$('.login-page .register-box');
    /*必须同意协议*/
    $register.on('click','.input-checkbox',function(){
        var $this=$(this),
            is_checked=$(this).is(':checked');
        if(!is_checked){
            layer.alert("请务必同意《金融桥使用协议》。系统自动视为已勾选！",{
                icon:5,
                title:'提示',
                end: function(){$this.prop('checked','true');}
            });
        }
    });
    /*图形验证码验证*/
    $register.on('keyup','.input-code',function(){
        var $phone=$register.find('.input-phone'),
            $this=$(this),
            $img=$this.next();
            data=$.trim($this.val()),
            prev_data=$this.attr('data-value');
        if(data.length==4){
            var indexLoad=layer.load(2);
            $.post('/union/sendphonecodex',{
                phone: $.trim($phone.val()),
                vcode: data,
                type: 41
            },function(d){
                layer.close(indexLoad);
                if (d.status == 1) {
                    layer.alert("短信验证码已发送您的手机，请注意查收。",{icon:6,title:'发送成功'},function(index){
                        layer.close(index);
                        $register.find('.input-box.sms').fadeIn('fast');
                    });
                }else if (d.status == 2) {
                    layer.alert("此手机号已绑定账号",{icon:5,title:'抱歉'},function(index){
                        layer.close(index);
                        $phone.focus().select();
                    });
                }else {
                    var msg = d.message || '短信验证码发送失败';
                    layer.alert(msg,{icon:5,title:'错误',end:function(){
                        $img.trigger('click');
                        $this.val('').focus();
                    }});
                }
            },'json').error(function(){
                layer.close(indexLoad);
                layer.msg('系统处理异常，请联系客服。', {icon: 5, end:function(){
                    $img.trigger('click');
                    $this.val('').focus();
                }}); 
            });
        }else if(data.length>4){
            $(this).val(data.replace(data.slice(4),''));
        }
    });
    /*发送短信*/
    $register.on('click','.sms .btn-code',function(){
        var $phone=$register.find('.input-phone');
    });
    /*点击注册*/
    $register.on('click','.btn-finnal',function(){
        var $phone=$register.find('.input-phone'),
            $pass1=$register.find('.input.pass').eq(0),
            $pass2=$register.find('.input.pass').eq(1),
            $code=$register.find('.input-code'),
            $vcode=$register.find('.input-sms'),
            boolpass=true;
        if(!$.trim($vcode.val()) || $vcode.hasClass('gray')){
            layer.alert("输入短信验证码不能为空。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $vcode.focus().select();
            });
            boolpass=false;
        }
        if(!$pass1.val() || $pass1.hasClass('gray')){
            layer.alert("输入设置密码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $pass1.focus().select();
            });
            boolpass=false;
        }
        if($pass2.val()!==$pass1.val()){
            layer.alert("输入设置密码不一致，请检查。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $pass1.focus().select();
            });
            boolpass=false;
        }
        if(!$phone.val() || $phone.hasClass('gray')){
            layer.alert("输入手机号码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $phone.focus().select();
            });
            boolpass=false;
        }
        if(boolpass){
            /*验证通过*/
        }
    });
}

/*登录*/
if($('.login-page .login-box').length){
    var $login=$('.login-page .login-box');
    /*点击登录*/
    $login.on('click','.btn-finnal',function(){
        var $phone=$login.find('.input-phone'),
            $pass=$login.find('.input.pass'),
            $code=$login.find('.input-code'),
            boolpass=true;
        if(!$.trim($code.val()) || $code.hasClass('gray')){
            layer.alert("输入图形验证码不能为空。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $code.focus().select();
            });
            boolpass=false;
        }
        if(!$pass.val() || $pass.hasClass('gray')){
            layer.alert("输入登录密码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $pass.focus().select();
            });
            boolpass=false;
        }
        if(!$phone.val() || $phone.hasClass('gray')){
            layer.alert("输入手机号码不能为空，请检查。",{icon:5,title:'抱歉'},function(index){
                layer.close(index);
                $phone.focus().select();
            });
            boolpass=false;
        }
        if(boolpass){
            /*验证通过*/
        }
    });
}