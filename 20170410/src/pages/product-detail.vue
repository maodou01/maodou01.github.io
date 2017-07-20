<template>
    <div id="product-detail">
        <div class="banner">
            <mt-button icon="back"><router-link to="/product"></router-link></mt-button>
            <mt-button icon="more"></mt-button>
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="urlImg in bannerImg">
                    <div class="bannerImg" v-bind:style="{backgroundImage: 'url('+urlImg+')'}"></div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="title-box">
            <div class="sale-box">
                <div class="share"><div class="fa fa-share-alt"></div>分享</div>
                <div class="title">党诗火山石提梁壶电陶炉套装电热静音煮茶炉煮茶器过滤烧水煮茶壶</div>
                <div class="price">￥<big>68</big></div>
                <div class="flex-box amount">
                    <div class="all-price">价格：￥268</div>
                    <div>快递：0.00</div>
                    <div>月销：0.00</div>
                </div>
                <div class="baozhang">
                    <div class="txt">
                        <span><i class="fa fa-check-circle-o"></i>官方正品</span>
                        <span><i class="fa fa-check-circle-o"></i>物流保障</span>
                        <span><i class="fa fa-check-circle-o"></i>急速退款</span>
                        <span><i class="fa fa-check-circle-o"></i>七天退换</span>
                    </div>
                </div>
                <div class="jifen">
                    <div class="txt">
                        <span class="tip">积分</span>购买可赠送1000积分
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">产品详情</mt-tab-item>
                <mt-tab-item id="2">产品参数</mt-tab-item>
                <mt-tab-item id="3">产品评价</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <img src="src/images/commodity01.jpg" alt="">
                    <img src="src/images/commodity02.jpg" alt="">
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell title="品牌" value="说明文字"></mt-cell>
                    <mt-cell title="型号" value="说明文字"></mt-cell>
                    <mt-cell title="尺寸" value="说明文字"></mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <ul class="evaluate">
                        <li>
                            <div class="head-title"><span class="icon" style="background-image: url('src/images/info_avatar.png');"></span>i****2 <i class="fa fa-heart" v-for="n in 2"></i></div>
                            <div class="descript">自助购物，卖家发货很快，快速挺及时，包装也仔细，纸盒内是泡沫盒装的酒，实物与店内图片样，未使用，不知效果如何</div>
                        </li>
                        <li>
                            <div class="head-title"><span class="icon" style="background-image: url('src/images/info_avatar.png');"></span>i****2 <i class="fa fa-heart" v-for="n in 4"></i></div>
                            <div class="descript">自助购物，卖家发货很快，快速挺及时，包装也仔细，纸盒内是泡沫盒装的酒，实物与店内图片样，未使用，不知效果如何</div>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <mt-tabbar class="b-btn-group" fixed>
            <div class="add" v-on:click="bBtn('add')">加入购物车</div>
            <div class="buy" v-on:click="bBtn('buy')">立即购买</div>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name: 'product-detail',
    data () {
        return {
          bannerImg: ['http://p4.so.qhimgs1.com/t0191b8686f423a67a4.jpg','http://p2.so.qhimgs1.com/t01956d6a5f26823fa2.jpg','http://p1.so.qhimgs1.com/t01df4af95f85baf2cd.jpg'],
          selected: '1'
        }
    },
    methods: {
        bBtn(name){
            if(name==='add'){
                MintUI.Toast('已加入购物车');
            }else{
                MintUI.Indicator.open({ spinnerType: 'fading-circle' });
                setTimeout(()=>{
                    MintUI.Indicator.close();
                    location.href='#/sureOrder';
                },3000);
            }
        }
    }
}
</script>

<style>
#product-detail{
    border-bottom: 0.9rem solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#product-detail .b-btn-group{
    height: 0.9rem;
    color: #fff;
    display: flex;
    justify-content: center;
    line-height: 0.9rem;
    font-size: 0.3rem;
}
#product-detail .b-btn-group div{
    flex: 1;
}
#product-detail .b-btn-group .add{
    background-color: #FE9402;
}
#product-detail .b-btn-group .buy{
    background-color: #FF5001;
}
#product-detail .banner{
    position: relative;
}
#product-detail .banner .mint-button:first-child{
    left: 0;
}
#product-detail .banner .mint-button{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    background-color: transparent;
    box-shadow: none;
    color: #fff;
}
#product-detail .banner .mint-button a{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#product-detail .flex-box{
    display: flex;
}
#product-detail .mint-swipe{
    height: 7rem;
}
#product-detail .mint-swipe .bannerImg{
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
#product-detail .mint-swipe-indicator{
    background-color: #fff;
}
#product-detail .mint-swipe-indicator.is-active{
    opacity: 1;
}
#product-detail .title-box .sale-box{
    background-color: #fff;
    position: relative;
}
#product-detail .title-box .sale-box .share{
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.2rem 0.2rem;
    text-align: center;
    font-size: 0.24rem;
    color: #444;
}
#product-detail .title-box .sale-box .share .fa{
    display: block;
    margin-bottom: 0.1rem;
    font-size: 0.36rem;
}
#product-detail .title-box .sale-box .title{
    padding: 0.15rem 1.2rem 0.15rem 0.2rem;
}
#product-detail .title-box .sale-box .price{
    padding: 0 0.15rem 0.2rem;
    color: #F33C00;
}
#product-detail .title-box .sale-box .price big{
    font-size: 0.5rem;
    margin-left: 0.1rem;
    line-height: 0.5rem;
}
#product-detail .title-box .sale-box .amount{
    justify-content: space-between;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    color: #bbb;
}
#product-detail .title-box .sale-box .amount .all-price{
    text-decoration: line-through;
}
#product-detail .title-box .jifen,
#product-detail .title-box .baozhang{
    background-color: #FAFAFA;
    padding: 0 0.2rem;
    font-size: 0.22rem;
    color: #bbb;
}
#product-detail .title-box .jifen .txt,
#product-detail .title-box .baozhang .txt{
    padding: 0.2rem 0;
    border-bottom:1px solid #DCDCDC;
}
#product-detail .title-box .baozhang .txt span{
    margin-right: 0.2rem;
}
#product-detail .title-box .baozhang .txt .fa{
    color: #F33C00;
    font-size: 0.28rem;
    margin-right: 0.08rem;
    vertical-align: middle;
}
#product-detail .title-box .jifen .txt span{
    padding: 0 0.1rem;
    border: 1px solid #F33C00;
    color: #F33C00;
    border-radius: 0.05rem;
    margin-right: 0.15rem;
}
#product-detail .content{
    margin: 0.2rem 0;
}
#product-detail .mint-navbar .mint-tab-item{
    color: #555;
}
#product-detail .mint-navbar .mint-tab-item .mint-tab-item-label{
    font-size: 0.28rem;
}
#product-detail .mint-navbar .mint-tab-item.is-selected{
    border-bottom-width: 0;
    position: relative;
    color: #F93A03;
}
#product-detail .mint-navbar .mint-tab-item.is-selected::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    left: 0;
    bottom: 3px;
    background-color: #F93A03;
}
#product-detail .mint-tab-container{
    border-top: 1px solid #D2D2D2;
}
#product-detail .content .mint-cell{
    min-height: initial;
    height: 0.7rem;
}
#product-detail .content .mint-cell-wrapper{
    height: 100%;
    font-size: 0.26rem;
}
#product-detail .mint-tab-container-item .mint-cell:first-child .mint-cell-wrapper{
    background-image: none;
}
#product-detail .evaluate{
    background-color: #fff;
    padding: 0 0.24rem;
}
#product-detail .evaluate>li{
    border-bottom: 1px solid #efefef;
    padding: 0.2rem 0;
}
#product-detail .evaluate .head-title{
    margin-bottom: 0.1rem;
    color: #666;
}
#product-detail .evaluate .head-title .icon{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 100%;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 0.2rem;
    background-size: contain;
}
#product-detail .evaluate .head-title .fa{
    color: #FBAA1A;
    margin-left: 0.1rem;
}
#product-detail .evaluate .descript{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.26rem;
    color: #888;
}
</style>
