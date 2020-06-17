<template>
    <div id="userSafe">
        <mt-header fixed title="安全中心">
            <router-link to="/user" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-cell class="safe-list" title="会员头像" is-link style="margin-top: 0.2rem;">
            <a class="a-link" href="#/user/safe"></a>
            <div class="right-txt">fantian <img src="src/images/info_avatar.png" alt=""></div>
        </mt-cell>
        <mt-cell class="safe-list" title="收货地址" is-link to="/user/safe/address">
        </mt-cell>
        <mt-cell class="safe-list" title="手机号码" is-link style="margin-top: 0.2rem;" to="/user/safe/phone">
            <div class="right-txt">13588387888</div>
        </mt-cell>
        <mt-cell class="safe-list" title="登录密码" is-link to="/user/safe/loginPass">
            <div class="right-txt">修改</div>
        </mt-cell>
        <div class="btn-group">
            <mt-button class="btn-exit" size="large" type="primary">退出登录</mt-button>
        </div>
        <transition name="fade" mode="out-in">
        <router-view class="wrap-view" style="z-index: 101;"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'userSafe',
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
#userSafe{
    padding-top: 0.8rem;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#userSafe .flex-box{
    display: flex;
}
#userSafe .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#userSafe .mint-header .mint-button-icon{
    color: #ccc;
}
#userSafe .safe-list{
    color: #555;
    min-height: 0.9rem;
    position: relative;
}
#user .safe-list a.a-link{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#user .safe-list .mint-cell-title{
    font-size: 0.28rem;
}
#user .safe-list .mint-cell-wrapper{
    background-image: -webkit-linear-gradient(top, #e8e8e8, #e8e8e8 50%, transparent 50%);
    background-image: linear-gradient(180deg, #e8e8e8, #e8e8e8 50%, transparent 50%);
}
#user .safe-list .right-txt{
    color: #999;
    font-size: 0.26rem;
}
#user .safe-list .right-txt img{
    margin-left: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
    display: inline-block;
    border: 2px solid #E3E3E3;
    border-radius: 100%;
    overflow: hidden;
}
#user .btn-group{
    width: 94%;
    margin: 0.6rem auto 0 0.2rem;
}
#user .btn-group .btn-exit{
    background-color: #4A90E2;
}
#user .btn-group .btn-exit .mint-button-text{
    font-size: 0.3rem;
    letter-spacing: 1px;
}
</style>
