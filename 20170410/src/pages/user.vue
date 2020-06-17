<template>
    <div id="user">
        <div class="head">
            <div class="pic"><img src="src/images/info_avatar.png" alt=""></div>
            <div class="name">禅心如月</div>
            <div class="vip"><span>普通会员</span></div>
        </div>
        <mt-cell class="user-list" title="全部订单" is-link>
        </mt-cell>
        <div class="row-list flex-box">
            <div>
                <div class="icon icon1"></div>
                <div class="title">待付款</div>
            </div>
            <div>
                <div class="icon icon2"></div>
                <div class="title">待发货</div>
            </div>
            <div>
                <div class="icon icon3"></div>
                <div class="title">待确认</div>
            </div>
            <div>
                <div class="icon icon4"></div>
                <div class="title">评价</div>
            </div>
            <div>
                <div class="icon icon5"></div>
                <div class="title">售后</div>
            </div>
        </div>
        <mt-cell class="user-list" title="我的收藏" style="margin-top: 0.2rem;" is-link>
            <img slot="icon" src="src/images/member_label_favorite.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="user-list" title="我的咨询" is-link>
            <img slot="icon" src="src/images/member_label_ask.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="user-list" title="我的钱包" is-link>
            <img slot="icon" src="src/images/member_label_wallet.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="user-list" title="分销加盟" is-link>
            <img slot="icon" src="src/images/member_label_union.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="user-list" title="个人资料" is-link>
            <img slot="icon" src="src/images/member_label_user.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="user-list" title="账号安全" is-link to="/user/safe">
            <img slot="icon" src="src/images/member_label_setting.png" width="24" height="24">
        </mt-cell>
        <transition name="fade" mode="out-in">
        <router-view class="wrap-view"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'user',
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
#user{
    border-bottom: 55px solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#user .fade-leave-active,
#user .fade-enter-active{
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
}
#user .flex-box{
    display: flex;
}
#user .user-list{
    color: #555;
    min-height: 0.9rem;
    position: relative;
}
#user .user-list a.a-link{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#user .user-list img{
    display: initial;
    width: initial;
    margin-right: 0.1rem;
}
#user .user-list .mint-cell-title{
    font-size: 0.28rem;
}
#user .user-list .mint-cell-wrapper{
    background-image: -webkit-linear-gradient(top, #e8e8e8, #e8e8e8 50%, transparent 50%);
    background-image: linear-gradient(180deg, #e8e8e8, #e8e8e8 50%, transparent 50%);
}
#user .row-list{
    background-color: #fff;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #d9d9d9;
}
#user .row-list>div{
    flex: 1;
    text-align: center;
    color: #999;
    padding: 0.18rem 0;
    font-size: 0.26rem;
    position: relative;
}
#user .row-list>div>a{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#user .row-list div .icon{
    width: 0.6rem;
    height: 0.6rem;
    margin: 0 auto;
    background-position: center center;
    background-size: contain;
}
#user .row-list div .icon.icon1{
    background-image: url('../images/order_payment.png');
}
#user .row-list div .icon.icon2{
    background-image: url('../images/order_deliver.png');
}
#user .row-list div .icon.icon3{
    background-image: url('../images/order_receipt.png');
}
#user .row-list div .icon.icon4{
    background-image: url('../images/order_evaluate.png');
}
#user .row-list div .icon.icon5{
    background-image: url('../images/order_service.png');
}
#user .head{
    background-color: #BE9C80;
    padding: 0.6rem 0;
    color: #fff;
    text-align: center;
    background-position: center center;
    background-size: cover;
}
#user .head .pic{
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto 0.1rem;
    background-color: #fff;
    border-radius: 100%;
    overflow: hidden;
    border:4px solid #CAB099;
}
#user .head .pic img{
    height: 100%;
}
#user .head .name{
    margin: 0.1rem auto;
    font-size: 0.3rem;
}
#user .head .vip span{
    font-size: 0.23rem;
    color: #BE9C80;
    padding: 0.03rem 0.2rem;
    background-color: #fff;
    border-radius: 0.2rem;
}
</style>
