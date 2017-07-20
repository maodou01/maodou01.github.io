<template>
    <div id="order-detail">
        <mt-header fixed title="订单详情">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-cell class="status-box" style="margin-top: 0.2rem;">
            <div slot="title">订单状态：<span class="red">待付款</span></div>
        </mt-cell>
        <mt-cell class="status-box">
            <div slot="title">联系电话：13588387886</div>
        </mt-cell>
        <mt-cell class="status-box">
            <div slot="title">收货姓名：覃业军</div>
            <div class="tip" slot="title">湖南省长沙市岳麓区麓谷广场B7幢2单元5C</div>
        </mt-cell>
        <mt-cell class="status-box" title="支付方式:" is-link style="margin-top: 0.2rem;">
            <span><i class="fa fa-weixin"></i> 微信支付</span>
        </mt-cell>
        <mt-cell class="status-box" title="配送方式:" value="顺丰快递" is-link></mt-cell>
        <div class="commodity-box">
            <div class="title">订单编号：15151506516516</div>
            <ul class="list">
                <li>
                    <div class="pic"><img src="" alt=""></div>
                    <div class="txt">
                        <div class="name">无线路由器450M穿墙网阿萨德房价凯伦基兰</div>
                        <div class="tip">颜色分类：宝蓝色</div>
                        <div class="price">￥68 x 1</div>
                    </div>
                </li>
            </ul>
            <div class="total-box">
                <div class="title">共1件商品 合计：<span>￥99.00</span>(含运费<span>￥0.00</span>)</div>
                <div class="time">下单时间：2016-04-21 16:13:08</div>
            </div>
            <div class="btn-group">
                <div class="btn-cancel">取消订单</div>
                <div class="btn-sure">确认付款</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order-detail',
    data () {
        return {
            price: 0,
            tel_num: 1,
            arr_range: [1,10]
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
#order-detail{
    border-top: 0.8rem solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#order-detail .flex-box{
    display: flex;
}
#order-detail .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#order-detail .mint-header .mint-button-icon{
    color: #ccc;
}
#order-detail .status-box{
    min-height: 45px;
}
#order-detail .status-box .mint-cell-wrapper{
    font-size: 0.28rem;
    color: #555;
}
#order-detail .status-box .red{
    color: #F63C01;
}
#order-detail .status-box .tip{
    font-size: 0.24rem;
    color: #999;
    margin-top: 0.05rem;
    width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#order-detail .commodity-box{
    background-color: #fff;
    padding: 0 0.2rem;
    margin: 0.2rem 0;
    border-bottom: 1px solid #d9d9d9;
}
#order-detail .commodity-box>.title{
    padding: 0.2rem 0;
    color: #555;
    border-bottom: 1px solid #d9d9d9;
}
#order-detail .commodity-box .list>li{
    padding: 0.2rem 0;
    font-size: 0.26rem;
    border-bottom: 1px solid #d9d9d9;
}
#order-detail .commodity-box .list>li .pic{
    float: left;
    width: 1rem;
    height: 1rem;
    background-color: #ccc;
    margin-right: 0.15rem;
}
#order-detail .commodity-box .list>li .pic img{
    height: 100%;
}
#order-detail .commodity-box .list>li .name{
    color: #555;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
#order-detail .commodity-box .list>li .tip{
    color: #999;
}
#order-detail .commodity-box .total-box span,
#order-detail .commodity-box .list>li .price{
    color: #F63C01;
}
#order-detail .commodity-box .total-box{
    text-align: right;
    font-size: 0.24rem;
    color: #999;
    padding: 0.2rem 0;
    line-height: 0.36rem;
}
#order-detail .commodity-box .btn-group{
    padding: 0.2rem 0;
    text-align: right;
}
#order-detail .commodity-box .btn-group div{
    display: inline-block;
    padding: 0.14rem 0.32rem;
    border: 1px solid transparent;
    border-radius: 0.06rem;
    margin-left: 0.2rem;
}
#order-detail .commodity-box .btn-group .btn-cancel{
    color: #999;
    border-color: #ccc;
}
#order-detail .commodity-box .btn-group .btn-sure{
    color: #fff;
    border-color: #F63C01;
    background-color: #F63C01;
}
</style>
