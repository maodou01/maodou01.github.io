<template>
    <div id="guideRegister">
        <router-link to="/loginGuide" class="btn-close"></router-link>
        <div class="logo"><img src="src/images/logo_txt.jpg" alt=""></div>
        <div class="form">
            <div class="input-box">
                <input type="tel" placeholder="手机号码" v-model="input_rphone">
            </div>
            <div class="input-box">
                <input type="password" placeholder="请输入密码" v-model="input_rpass" v-show="isShow===false">
                <input type="text" placeholder="请输入密码" v-model="input_rpass" v-show="isShow===true">
                <div class="icon-eye" :class="{show:isShow}" @click="isShow=!isShow"></div>
            </div>
            <div class="input-box">
                <input type="password" placeholder="请输入验证码" v-model="input_rcode">
                <div class="btn-code" @click="handleCode">{{str_newcode}}</div>
            </div>
            <div class="input-box">
                <label>
                    <input type="checkbox" name="" checked="checked" disabled="disabled">
                    同意<a>《用户使用协议》</a>
                </label>
            </div>
        </div>
        <div class="btn-register" @click="handleRegister">注册</div>
    </div>
</template>

<script>
export default {
    name: 'guideRegister',
    data () {
        return {
            input_rphone: '',
            input_rpass: '',
            input_rcode: '',
            isShow: false,
            arr_newcode: [60,true],
            str_newcode: '获取验证码'
        }
    },
    methods: {
        handleRegister(){
            let isPass=true,str_err='';
            if(this.input_rcode===''){
                isPass=false;
                str_err='输入验证码不能为空！';
            }
            if(this.input_rpass===''){
                isPass=false;
                str_err='输入密码不能为空！';
            }
            if(this.input_rphone==='' || !/1[3-9]\d{9}/.test(this.input_rphone)){
                isPass=false;
                str_err='输入正确手机号！';
            }
            if(isPass){
                // 验证通过
            }else{
                MintUI.MessageBox({
                    title: '验证失败',
                    message: str_err
                });
            }
        },
        handleCode(){
            if(this.arr_newcode[1]){
                this.arr_newcode[1]=false;
                MintUI.Toast('验证码已发送到旧手机，注意查收');
                let _this=this;
                _this.arr_newcode[0]=60;
                let inter_new=setInterval(()=>{
                    if(_this.arr_newcode[0]>=0){
                        _this.arr_newcode[0]--;
                        _this.str_newcode='还剩'+_this.arr_newcode[0]+'s';
                    }else{
                        _this.str_newcode='重发验证码';
                        this.arr_newcode[1]=true;
                        clearInterval(inter_new);
                    }
                },1000);
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
#guideRegister{
    height: 100%;
    background-color: #FFFFFF;
    overflow-y: auto;
}
</style>
