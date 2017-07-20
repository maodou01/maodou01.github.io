<template>
    <div id="userLoginPass">
        <mt-header fixed title="修改密码">
            <router-link to="/user/safe" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="form">
            <mt-field label="原密码" placeholder="请输入历史密码" type="password" v-model="input_oldpass"></mt-field>
            <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="input_newpass"></mt-field>
            <p class="tip">密码由6-20位英文字母、数字或符号组成</p>
        </div>
        <div class="btn-group">
            <mt-button class="btn-edit" size="large" type="primary" @click="handleSure">确认修改</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userLoginPass',
    data () {
        return {
            input_oldpass: '',
            input_newpass: ''
        }
    },
    methods: {
        handleSure(){
            if(this.input_oldpass===''){
                MintUI.MessageBox({
                    title: '验证失败',
                    message: '请输入旧密码'
                });
                return;
            }
            if(this.input_newpass===''){
                MintUI.MessageBox({
                    title: '验证失败',
                    message: '请输入新密码'
                });
                return;
            }
            if(this.input_oldpass!='' && this.input_newpass!=''){
                // 验证通过
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
#userLoginPass{
    padding-top: 0.8rem;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#userLoginPass .flex-box{
    display: flex;
}
#userLoginPass .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#userLoginPass .mint-header .mint-button-icon{
    color: #ccc;
}
#userLoginPass .btn-group{
    width: 94%;
    margin: 0.4rem auto 0.2rem;
}
#userLoginPass .btn-edit{
    height: 0.8rem;
    background-color: #D0021B;
}
#userLoginPass .btn-edit label{
    font-size: 0.3rem;
    letter-spacing: 1px;
}
#userLoginPass{
    width: 100%;
    height: 100%;
    background-color: #E5E8ED;
    padding-top: 0.8rem;
    box-sizing: border-box;
}
#userLoginPass .form{
    margin: 0.2rem 0;
}
#userLoginPass .form p.tip{
    color: #aaa;
    font-size: 0.24rem;
    margin: 0.2rem;
}
#userLoginPass .form .mint-cell{
    min-height: 0.8rem;
}
#userLoginPass .form .mint-cell-text{
    font-size: 0.28rem;
    color: #555;
}
#userLoginPass .form input{
    font-size: 0.28rem;
    color: #999;
    resize: none;
}
</style>
