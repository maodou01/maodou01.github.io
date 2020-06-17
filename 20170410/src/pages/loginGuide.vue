<template>
    <div id="loginGuide">
        <div class="btn-group">
            <router-link to="/loginGuide/login" class="btn-login">会员登录</router-link>
            <router-link to="/loginGuide/register" class="btn-register">注册账号</router-link>
        </div>
        <transition name="fade" mode="out-in">
        <router-view class="wrap-view" style="z-index: 101;"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'loginGuide',
    data () {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    },
    watch: {
        
    }
}
</script>

<style>
#loginGuide{
    height: 100%;
    position: relative;
    overflow: hidden;
    background-image: url('http://img3.91.com/uploads/allimg/140331/32-140331164952.jpg');
    background-size: cover;
    background-position: center center;
}
#loginGuide .btn-group{
    position: absolute;
    width: 100%;
    height: 4rem;
    left: 0;
    bottom: 0;
}
#loginGuide .btn-group>a{
    width: 60%;
    display: block;
    height: 0.8rem;
    line-height: 0.8rem;
    border: 1px solid #733818;
    font-size: 0.3rem;
    margin: 0.4rem auto;
    border-radius: 0.8rem;
    text-align: center;
    text-decoration: none;
}
#loginGuide .btn-group>a.btn-login{
    color: #fff;
    background-color: #733818;
}
#loginGuide .btn-group>a.btn-register{
    color: #733818;
}
#loginGuide .input-box{
    width: 75%;
    margin: 0.3rem auto;
    position: relative;
}
#loginGuide .input-box .btn-code{
    position: absolute;
    right: 0.3rem;
    top: 0.25rem;
    color: #555;
    font-size: 0.25rem;
}
#loginGuide .input-box .icon-eye{
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    right: 0.3rem;
    top: 0.15rem;
    background-size: contain;
    background-image: url('../images/login_pwd_hide.png');
}
#loginGuide .input-box .icon-eye.show{
    background-image: url('../images/login_pwd_show.png');
}
#loginGuide .input-box .r-link{
    float: right;
    font-size: 0.24rem;
    color: #888;
}
#loginGuide .input-box>input{
    display: block;
    width: 100%;
    padding: 0.25rem 0.3rem;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
    border-radius: 0.6rem;
    font-size: 0.25rem;
    color: #555;
    outline: none;
}
#loginGuide .input-box>input::-webkit-input-placeholder{
    color: #bcbcbc;
}
#loginGuide .input-box>label{
    font-size: 0.24rem;
    color: #888;
}
#loginGuide .input-box>label input{
    vertical-align: top;
    -webkit-appearance: none;
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 100%;
    border: 1px solid #888;
    outline: none;
}
#loginGuide .input-box>label input:checked{
    border-width: 0;
    background-size: contain;
    background-image: url('/src/images/login_agree.png');
}
#loginGuide .wrap-view .btn-close{
    position: absolute;
    width: 0.45rem;
    height: 0.45rem;
    background-size: contain;
    background-image: url('/src/images/com_close.png');
    top: 0.4rem;
    left: 0.4rem;
    filter: opacity(0.8);
}
#loginGuide .wrap-view .logo{
    width: 1.8rem;
    margin: 0.4rem auto 0.6rem;
}
#loginGuide .wrap-view .btn-login,
#loginGuide .wrap-view .btn-register{
    width: 75%;
    padding: 0.22rem 0;
    border-radius: 0.44rem;
    color: #fff;
    background-color: #9C756C;
    font-size: 0.32rem;
    margin: 0.8rem auto 0.2rem;
    text-align: center;
    letter-spacing: 4px;
}
</style>
