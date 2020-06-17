<template>
    <div id="my-cart">
        <mt-header fixed title="我的购物车">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <a slot="right" v-on:click="handleEdit">
                <mt-button>编辑</mt-button>
            </a>
        </mt-header>
        <ul class="cart-list">
            <li class="flex-box" v-for="(obj,index) in arr_cart">
                <input class="input-select" type="checkbox" :value="obj.id" v-model="cart_select" v-on:change="curSelect">
                <span class="fa fa-trash-o" v-on:click="handleDel(obj.id, index)" v-if="isDelbox"></span>
                <div class="pic" v-bind:style="{backgroundImage: 'url('+obj.picUrl+')'}"></div>
                <div class="txt">
                    <div class="title">{{obj.name}}</div>
                    <div class="tip">{{obj.fenlei}}</div>
                    <div class="price">￥ {{obj.price}} x {{obj.tel_num}}</div>
                </div>
                <div class="num-box flex-box" v-if="isNumbox">
                    <div class="btn-add" v-on:click="handleNum('add',index)">+</div>
                    <input type="tel" v-model="obj.tel_num">
                    <div class="btn-minus" v-on:click="handleNum('minus',index)">-</div>
                </div>
            </li>
        </ul>
        <div class="fix-bottom">
            <div class="total-box">
                <label>
                    <input type="checkbox" name="" v-model="cart_selectAll" v-on:click="allSelect"> 全选
                </label>
                <div class="right">
                    <div class="price">订单合计：<span>￥{{totalPrice}}元</span></div>
                    <div class="tip">共计{{selectNum}}件商品</div>
                </div>
            </div>
            <div class="btn-wrap">
                <div class="btn-accounts" v-bind:class="{ active: isActive }" v-on:click="handleAccount">立即结算</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-cart',
    data () {
        return {
            arr_cart: [],
            cart_select: [],
            cart_selectAll: false,
            totalPrice: 0.00,
            selectNum: 0,
            isActive: false,
            isDelbox: false,
            isNumbox: false
        }
    },
    methods: {
        handleNum(name,index) {
            let int_num=this.arr_cart[index].tel_num,
                arr_range=this.arr_cart[index].range;
            if(name==='add'){
                if(arr_range[1] > int_num) int_num+=1;
            }else{
                if(arr_range[0] < int_num) int_num-=1;
            }
            this.arr_cart[index].tel_num = int_num;
            this.curSelect();
        },
        handleDel(id,index) {
            MintUI.MessageBox.confirm("是否确认删除此商品？", "删除").then(action=>{
                MintUI.Indicator.open('处理中...');
                setTimeout(()=>{
                    MintUI.Indicator.close();
                    this.arr_cart.splice(index,1);
                    MintUI.Toast({
                        message: '操作成功',
                        iconClass: 'mintui mintui-success'
                    });
                },3000);
            });
        },
        curSelect(){
            let _this = this, int_num=0, float_total=0.00;
            _this.cart_select.forEach((id, i)=>{
                _this.arr_cart.forEach((obj, index)=>{
                    if(obj.id===id){
                        int_num += obj.tel_num;
                        float_total += (Number(obj.price) * obj.tel_num);
                    }
                });
            });
            _this.selectNum = int_num;
            _this.totalPrice = Math.round(float_total*100) / 100;
            if(_this.cart_select.length===_this.arr_cart.length)
                _this.cart_selectAll=true;
            else
                _this.cart_selectAll=false;
            if(_this.cart_select.length>0)
                _this.isActive=true;
            else
                _this.isActive=false;
        },
        allSelect(){
            let _this = this;
            _this.cart_selectAll=!_this.cart_selectAll;
            if (!_this.cart_selectAll) {
                _this.cart_select = [];
            } else { //实现全选
                _this.cart_select = [];
                _this.arr_cart.forEach(function(item, i) {
                    _this.cart_select.push(item.id);
                });
            }
        },
        handleEdit(){
            let _element=event.currentTarget;
            if(_element.text==='编辑'){
                _element.text='完成';
                this.isDelbox=true;
                this.isNumbox=true;
            }else{
                _element.text='编辑';
                this.isDelbox=false;
                this.isNumbox=false;
            }
        },
        handleAccount(){
            if(this.isActive) window.location.href='#/sureOrder';
        }
    },
    created() {
        this.arr_cart = [
            {id: 1, picUrl: 'src/images/cart-pic01.jpg', name: 'D7100套机(16-85mmVR防抖)',price: 1230.12, fenlei: '颜色分类：黑色', tel_num: 1, range: [1,10]},
            {id: 2, picUrl: 'src/images/cart-pic01.jpg', name: 'D7100套机(16-85mmVR防抖)',price: 1230.12, fenlei: '颜色分类：黑色', tel_num: 1, range: [1,10]}
        ];
    },
    watch: {
        cart_select(){
            this.curSelect();
        }
    }
}
</script>

<style>
#my-cart{
    border-top: 0.8rem solid transparent;
    border-bottom: 1.8rem solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#my-cart .fix-bottom{
    height: 1.8rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
#my-cart .fix-bottom .total-box{
    height: 0.8rem;
    position: relative;
    font-size: 0.26rem;
    color: #333;
    padding: 0 0.2rem;
}
#my-cart .fix-bottom .total-box label{
    float: left;
    line-height: 0.8rem;
}
#my-cart .fix-bottom .total-box label input{
    top: 0.16rem;
}
#my-cart .fix-bottom .total-box .right{
    float: right;
    text-align: right;
}
#my-cart .fix-bottom .total-box .right .price{
    margin-top: 0.06rem;
}
#my-cart .fix-bottom .total-box .right .price span{
    color: #F63C01;
}
#my-cart .fix-bottom .total-box .right .tip{
    font-size: 0.24rem;
    color: #aaa;
}
#my-cart .fix-bottom .btn-wrap{
    height: 1rem;
    padding: 0 0.2rem;
}
#my-cart .fix-bottom .btn-wrap .btn-accounts{
    height: 0.8rem;
    margin: 0.1rem auto;
    background-color: #bbb;
    color: #fff;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    transition: all 0.2s;
}
#my-cart .fix-bottom .btn-wrap .btn-accounts.active{
    background-color: #F63C01;
}
#my-cart .flex-box{
    display: flex;
}
#my-cart input[type=checkbox]{
    -webkit-appearance: none;
    width: 0.4rem;
    height: 0.4rem;
    border: 1px solid #d4d4d4;
    border-radius: 100%;
    outline: none;
    position: relative;
}
#my-cart input[type=checkbox]:checked{
    border-color: #F63C01;
    background-color: #F63C01;
}
#my-cart input[type=checkbox]:checked::before{
    content: "";
    position: absolute;
    width: 0.2rem;
    height: 0.1rem;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    left: 0.05rem;
    top: 0.1rem;
    transform: rotate(-45deg);
}
#my-cart .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#my-cart .mint-header .mint-button-icon{
    color: #ccc;
}
#my-cart .cart-list li{
    background-color: #fff;
    padding: 0.15rem 0;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
}
#my-cart .cart-list .pic{
    width: 1rem;
    height: 1rem;
    background-size: contain;
    margin-left: 0.8rem;
    margin-right: 0.12rem;
    background-position: center center;
}
#my-cart .cart-list .txt{
    width: 50%;
    font-size: 0.26rem;
    color: #333;
    line-height: 0.36rem;
}
#my-cart .cart-list .txt .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#my-cart .cart-list .txt .tip{
    font-size: 0.22rem;
    color: #999;
}
#my-cart .cart-list .txt .price{
    color: #F63C01;
    font-size: 0.24rem;
}
#my-cart .cart-list .input-select{
    position: absolute;
    top: 0.4rem;
    left: 0.2rem;
}
#my-cart .cart-list .fa{
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    color: #bbb;
    font-size: 0.3rem;
}
#my-cart .cart-list .num-box{
    position: absolute;
    width: 1.6rem;
    height: 0.45rem;
    overflow: hidden;
    border: 1px solid #EDEDED;
    border-radius: 0.05rem;
    right: 0.2rem;
    top: 0.55rem;
}
#my-cart .cart-list .num-box input{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-width: 0;
    text-align: center;
    background-color: #fff;
    color: #999;
    outline: none;
}
#my-cart .cart-list .num-box div{
    padding: 0 0.15rem;
    background-color: #FBFBFB;
    color: #a8a8a8;
}
#my-cart .cart-list .num-box .btn-add{
    border-right: 1px solid #ededed;
}
#my-cart .cart-list .num-box .btn-minus{
    border-left: 1px solid #ededed;
}
</style>
