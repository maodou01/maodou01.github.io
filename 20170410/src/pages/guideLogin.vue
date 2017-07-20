<template>
    <div id="guideLogin">
        <router-link to="/loginGuide" class="btn-close"></router-link>
        <div class="logo"><img src="src/images/logo_txt.jpg" alt=""></div>
        <div class="form">
            <div class="input-box">
                <input type="tel" class="" placeholder="手机号码/用户名" v-model="input_luser">
            </div>
            <div class="input-box">
                <input type="password" placeholder="请输入密码" v-model="input_lpass" v-show="isShow===false">
                <input type="text" placeholder="请输入密码" v-model="input_lpass" v-show="isShow===true">
                <div class="icon-eye" :class="{show:isShow}" @click="isShow=!isShow"></div>
            </div>
            <div class="input-box">
                &nbsp;
                <a class="r-link">忘记密码</a>
            </div>
        </div>
        <div class="btn-login" @click="handleLogin">登录</div>
    </div>
</template>

<script>
export default {
    name: 'guideLogin',
    data () {
        return {
            input_luser: '',
            input_lpass: '',
            isShow: false
        }
    },
    methods: {
        handleLogin(){
            if(this.input_luser!='' && this.input_lpass!=''){

            }else{
                MintUI.MessageBox({
                    title: '验证失败',
                    message: '输入用户名和密码不能为空！'
                });
            }
        }
    },
    created() {
        
    },
    watch: {
        
    }
}
</script>

<style>
#guideLogin{
    height: 100%;
    background-color: #FFFFFF;
    overflow-y: auto;
}
</style>
