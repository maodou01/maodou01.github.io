/*读取cookie*/
function getCookie(name){ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]); 
    }else{
        return null;
    }
} 
/*获取登录中手机号*/
if(getCookie('phone')){
    $('.login-box .phone').val(getCookie('phone'));
}
/*登录*/
$('.header,.nav').on('click','.btn-login',function(){
    $('body').children('*').addClass('filter');
    $('.login-box').removeClass('filter').fadeIn(200);
});
$('.login-box').on('click','.close',function(){
    $('.login-box').fadeOut(200);
    $('body').children('*').removeClass('filter');
});
/*点击验证码*/
$('.login-box').on('click','.yzm',function(){
    var $phone=$('.login-box .phone');
    if(!/1[3-8][0-9]{9}/.test($phone.val())){
        alert('请输入正确手机号码');
        $phone.focus().select();
    }else{
        /*验证通过*/
    }
});
/*点击立即登录*/
$('.login-box').on('click','.btn-login',function(){
    var $phone=$('.login-box .phone'),
        $pass=$('.login-box .pass'),
        $code=$('.login-box .code'),
        $remember=$('.login-box .remember');
    if(!$phone.val()){
        alert('输入手机号码不能为空！');
        $phone.focus();
        return;
    }    
    if(!$pass.val()){
        alert('输入密码不能为空！');
        $pass.focus();
        return;
    }else if($pass.val().length<7){
        alert('输入密码不少于6位！');
        $pass.focus().select();
        return;
    }
    if(!$code.val()){
        alert('输入验证码不能为空！');
        $code.focus();
        return;
    }
    /*验证通过*/
    if($remember.prop('checked')){
        /*保存cookie*/
        var ExpireDate = new Date ();
        ExpireDate.setTime(ExpireDate.getTime() + (7 * 24 * 3600 * 1000));
        document.cookie='phone='+$phone.val()+'; expires=' + ExpireDate.toGMTString();
    }else{
        var ExpireDate = new Date ();
        ExpireDate.setTime(ExpireDate.getTime()-1);
        document.cookie='phone='+$phone.val()+'; expires=' + ExpireDate.toGMTString();
    }
});