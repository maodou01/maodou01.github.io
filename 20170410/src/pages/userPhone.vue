<template>
    <div id="userPhone">
        <mt-header fixed title="修改手机号码">
            <router-link to="/user/safe" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="form">
            <mt-field label="验证码" placeholder="请输入验证码" v-model="input_code">
                <div class="right-code" @click="handleOldcode">{{str_oldcode}}</div>
            </mt-field>
            <mt-field label="手机号" placeholder="请输入新手机号" v-model="input_newphone"></mt-field>
            <p class="tip">没收到？试试<a>语音验证码</a></p>
        </div>
        <div class="btn-group">
            <mt-button class="btn-step1" size="large" type="primary" v-on:click="handleStep">下一步</mt-button>
        </div>
        <mt-popup v-model="step1Box" position="right" class="step-box" :modal="false">
            <mt-header fixed title="修改手机号码">
                <div @click="step1Box = false" slot="left">
                    <mt-button icon="back"></mt-button>
                </div>
            </mt-header>
            <div class="form">
                <mt-field label="验证码" placeholder="输入验证码" v-model="input_newcode">
                    <div class="right-code" @click="handleNewcode">{{str_newcode}}</div>
                </mt-field>
                <p class="tip">没收到？试试<a>语音验证码</a></p>
            </div>
            <div class="btn-group">
                <mt-button class="btn-sure" size="large" type="primary" @click="handleSure">确认修改</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'userPhone',
    data () {
        return {
            step1Box: false,
            input_code: '',
            input_newphone: '',
            input_newcode: '',
            arr_oldcode: [60,true],
            str_oldcode: '获取验证码',
            arr_newcode: [60,true],
            str_newcode: '获取验证码'
        }
    },
    methods: {
        handleStep(){
            if(this.input_code!='' && this.input_newphone!='' && /1[3-9]\d{9}/.test(this.input_newphone)){
                this.step1Box=true;
            }else{
                MintUI.MessageBox({
                    title: '验证失败',
                    message: '请检查！'
                });
            }
        },
        handleSure(){
            if(this.input_newcode!=''){
                // 验证通过
            }else{
                MintUI.MessageBox({
                    title: '验证失败',
                    message: '输入新短信验证码不能为空！'
                });
            }
        },
        handleOldcode(){
            if(this.arr_oldcode[1]){
                this.arr_oldcode[1]=false;
                MintUI.Toast('验证码已发送到旧手机，注意查收');
                let _this=this;
                _this.arr_oldcode[0]=60;
                let inter_old=setInterval(()=>{
                    if(_this.arr_oldcode[0]>=0){
                        _this.arr_oldcode[0]--;
                        _this.str_oldcode='还剩'+_this.arr_oldcode[0]+'s';
                    }else{
                        _this.str_oldcode='重发验证码';
                        this.arr_oldcode[1]=true;
                        clearInterval(inter_old);
                    }
                },1000);
            }
        },
        handleNewcode(){
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
#userPhone{
    padding-top: 0.8rem;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#userPhone .flex-box{
    display: flex;
}
#userPhone .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#userPhone .mint-header .mint-button-icon{
    color: #ccc;
}
#userPhone .btn-group{
    width: 94%;
    margin: 0.4rem auto 0.2rem;
}
#userPhone .btn-step1,
#userPhone .btn-sure{
    height: 0.8rem;
    background-color: #D0021B;
}
#userPhone .btn-step1{
    background-color: #4A90E2;
}
#userPhone .btn-group label{
    font-size: 0.3rem;
    letter-spacing: 1px;
}
#userPhone .step-box{
    width: 100%;
    height: 100%;
    background-color: #E5E8ED;
    padding-top: 0.8rem;
    box-sizing: border-box;
}
#userPhone .form{
    margin: 0.2rem 0;
}
#userPhone .form p.tip{
    color: #aaa;
    font-size: 0.24rem;
    margin: 0.2rem;
}
#userPhone .form p.tip a{
    color: #66A0E4;
}
#userPhone .form .mint-cell{
    min-height: 0.8rem;
}
#userPhone .form .mint-cell .right-code,
#userPhone .form .mint-cell-text{
    font-size: 0.26rem;
    color: #555;
}
#userPhone .form .mint-cell .right-code.gray{
    color: #ccc;
}
#userPhone .form input{
    font-size: 0.28rem;
    color: #999;
    resize: none;
}
</style>
