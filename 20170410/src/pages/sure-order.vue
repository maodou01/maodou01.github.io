<template>
    <div id="sure-order">
        <mt-header fixed title="确认订单">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-cell class="delivery-box" is-link>
            <div v-on:click="handleReceipt" style="position: absolute; width: 100%; height: 100%; z-index:1; top: 0; left: 0;"></div>
            <div class="fa fa-map-o"></div>
            <div class="title">
                <div class="add">收货地址：湖南省石门县太平镇楠木古村古村古村</div>
                <div class="tip">覃业军 13588387886</div>
            </div>
        </mt-cell>
        <ul class="commodity-list">
            <li class="item">
                <div class="pic"><img src="" alt=""></div>
                <div class="descrip">
                    <div class="title">无线路由器450M穿墙网阿萨德房价</div>
                    <div class="tip">颜色分类：宝蓝色</div>
                    <div class="price">￥{{price}} x {{tel_num}}</div>
                </div>
            </li>
            <li class="result">
                商品数量：{{tel_num}}件 订单合计金额：<span class="price">{{price* tel_num | currency}}</span>元
            </li>
        </ul>
        <mt-cell class="cus-list" title="购买数量">
            <div class="num-box flex-box">
                <div class="btn-minus" v-on:click="handleNum('minus')">-</div>
                <input type="tel" v-model="tel_num">
                <div class="btn-add" v-on:click="handleNum('add')">+</div>
            </div>
        </mt-cell>
        <mt-cell class="cus-list" title="配送方式" value="快递(免运费)"></mt-cell>
        <mt-cell class="cus-list" title="使用积分" is-link></mt-cell>
        <mt-field class="textarea-liuyan" placeholder="留言" type="textarea" rows="4"></mt-field>
        <div class="btn-order" @click="handleSure">立即支付</div>
        <mt-popup v-model="receiptBox" position="right" class="receipt-box" :modal="false">
            <mt-header fixed title="选择收货地址">
                <div @click="receiptBox = false" slot="left">
                    <mt-button icon="back"></mt-button>
                </div>
                <div slot="right" v-on:click="">
                    <mt-button>管理</mt-button>
                </div>
            </mt-header>
            <ul class="list">
                <li v-for="n in 2">
                    <div class="title">覃业军</div>
                    <div class="add">湖南省长沙市岳麓区麓谷企业广场B7幢2单元5c</div>
                    <div class="tel">13588387886</div>
                    <label class="is-default">
                        <input type="radio" name="default" v-model="indexDefault" :value="n">
                        <span></span>
                    </label>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'sure-order',
    data () {
        return {
            price: 0,
            tel_num: 1,
            arr_range: [1,10],
            receiptBox: false,
            indexDefault: 1
        }
    },
    methods: {
        handleNum(name) {
            let arr_range=this.arr_range,
                int_num=this.tel_num;
            if(name==='add'){
                if(arr_range[1] > int_num) int_num+=1;
            }else{
                if(arr_range[0] < int_num) int_num-=1;
            }
            this.tel_num = int_num;
        },
        handleReceipt(){
            this.receiptBox=true;
        },
        handleSure(){
            window.location.href='#/orderDetail'
        }
    },
    created() {
        this.price=123;
    },
    watch: {
        
    }
}
</script>

<style>
#sure-order{
    border-top: 0.8rem solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#sure-order .btn-order{
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #F63C01;
    color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
}
#sure-order .flex-box{
    display: flex;
}
#sure-order .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#sure-order .mint-header .mint-button-icon{
    color: #ccc;
}
#sure-order .delivery-box{
    padding: 0.15rem 0.2rem;
}
#sure-order .delivery-box .mint-cell-wrapper{
    background-image: none;
}
#sure-order .delivery-box .fa{
    font-size: 0.28rem;
    position: relative;
    top: -0.14rem;
}
#sure-order .delivery-box .title{
    font-size: 0.26rem;
    color: #555;
    margin-left: 0.2rem;
}
#sure-order .delivery-box .title .add{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 5rem;
}
#sure-order .delivery-box .title .tip{
    color: #999;
    font-size: 0.24rem;
    margin-top: 0.1rem;
}
#sure-order .commodity-list{
    background-color: #fff;
    margin: 0.2rem 0;
    font-size: 0.25rem;
    color: #888;
}
#sure-order .commodity-list li{
    padding: 0.2rem 0;
    margin: 0 0.2rem;
}
#sure-order .commodity-list li .price{
    color: #f00;
}
#sure-order .commodity-list li.item{
    border-bottom: 1px solid #f0f0f0;
    line-height: 0.36rem;
}
#sure-order .commodity-list li.item .pic{
    float: left;
    width: 1rem;
    height: 1rem;
    background: #999;
    margin-right: 0.2rem;
}
#sure-order .commodity-list li.item .pic img{
    width: 100%;
    height: 100%;
}
#sure-order .commodity-list li.item .title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#sure-order .cus-list{
    position: relative;
}
#sure-order .cus-list .mint-cell-text{
    color: #555;
    font-size: 0.28rem;
}
#sure-order .cus-list .mint-cell-value{
    font-size: 0.28rem;
}
#sure-order .cus-list .num-box{
    position: absolute;
    width: 1.6rem;
    height: 0.45rem;
    line-height: 0.45rem;
    overflow: hidden;
    border: 1px solid #EDEDED;
    border-radius: 0.05rem;
    right: 0.2rem;
    top: 0.3rem;
    z-index: 1;
}
#sure-order .cus-list .num-box input{
    width: 100%;
    top: 0;
    left: 0;
    border-width: 0;
    text-align: center;
    background-color: #fff;
    color: #999;
    outline: none;
}
#sure-order .cus-list .num-box div{
    padding: 0 0.15rem;
    background-color: #FBFBFB;
    color: #a8a8a8;
}
#sure-order .cus-list .num-box .btn-add{
    border-right: 1px solid #ededed;
}
#sure-order .cus-list .num-box .btn-minus{
    border-left: 1px solid #ededed;
}
#sure-order .textarea-liuyan{
    margin: 0.2rem 0;
}
#sure-order .textarea-liuyan textarea{
    font-size: 0.28rem;
    color: #333;
    resize: none;
}
#sure-order .receipt-box{
    width: 100%;
    height: 100%;
    background-color: #E5E8ED;
    padding-top: 0.8rem;
    box-sizing: border-box;
}
#sure-order .receipt-box .list{
    padding: 0.2rem 0 0;
    overflow-y: auto;
    height: calc(100% - 0.2rem);
}
#sure-order .receipt-box .list>li{
    background-color: #fff;
    margin-bottom: 0.2rem;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem;
    position: relative;
}
#sure-order .receipt-box .list>li .title{
    color: #555;
}
#sure-order .receipt-box .list>li .add{
    font-size: 0.24rem;
    color: #999;
    margin: 0.1rem 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 0 0.12rem;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 0.1rem;
}
#sure-order .receipt-box .list>li .tel{
    position: absolute;
    color: #555;
    right: 0.2rem;
    top: 0.2rem;
}
#sure-order .receipt-box .list>li .is-default{
    color: #cecece;
    font-size: 0.24rem;
}
#sure-order .receipt-box .list>li .is-default input{
    outline: none;
    -webkit-appearance: none;
    font: normal normal normal 14px/1 FontAwesome;
    display: inline-block;
    color: inherit;
    font-size: 0.3rem;
    margin-left: 0;
}
#sure-order .receipt-box .list>li .is-default input::before{
    content: '\f058'
}
#sure-order .receipt-box .list>li .is-default span::before{
    content: '选择地址';
}
#sure-order .receipt-box .list>li .is-default input:checked{
    color: #FCA304;
}
#sure-order .receipt-box .list>li .is-default input:checked+span{
    color: #FCA304;
}
#sure-order .receipt-box .list>li .is-default input:checked+span::before{
    content: '默认地址';
}
</style>
