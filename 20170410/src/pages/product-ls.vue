<template>
    <div id="product">
        <mt-header fixed title="产品列表">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="dh-box">
            <ul>
                <li v-for="obj in arr_dh" v-bind:class="{ active: obj.isActive }" v-on:click="dhClick(obj.id)">{{obj.name}}</li>
            </ul>
        </div>
        <ul class="commodity-list flex-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="obj in productList">
                <router-link :to="{path: '/product/'+obj.id}"></router-link>
                <div class="pic" v-bind:style="{backgroundImage: 'url('+obj.picUrl+')'}"></div>
                <div class="title">{{obj.title}}</div>
                <div class="price"><small>￥</small>{{obj.price}}</div>
            </li>
            <li class="loading"><i class="fa fa-spinner fa-pulse"></i>加载中</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'product',
    data () {
        return {
          productList: [
              {id: 1, picUrl: "src/images/product01.jpg", title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯", price: "6,000"},
              {id: 2, picUrl: "src/images/product02.jpg", title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯", price: "6,000"},
              {id: 3, picUrl: "src/images/product03.jpg", title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯", price: "6,000"},
              {id: 4, picUrl: "src/images/product04.jpg", title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯", price: "6,000"},
              {id: 5, picUrl: "src/images/product04.jpg", title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯", price: "6,000"}
          ],
          arr_dh: [
              {id: 1, isActive: true, name: "雅之润"},
              {id: 2, isActive: false, name: "健之润"},
              {id: 3, isActive: false, name: "健之润"},
              {id: 4, isActive: false, name: "健之润"},
              {id: 5, isActive: false, name: "健之润"},
              {id: 6, isActive: false, name: "健之润"},
              {id: 7, isActive: false, name: "健之润"}
          ]
        }
    },
    methods: {
        loadMore (){
            this.loading = true;
            setTimeout(() => {
                let last = this.productList[this.productList.length - 1];
                for (let i = 1; i <= 10; i++) {
                    this.productList.push({
                        id: last + i,
                        picUrl: "./src/images/product04.jpg",
                        title: "黑茶湖南安化安化黑茶茯砖茶熙牧源金花手筑茯",
                        price: "1,000"
                    });
                }
                this.loading = false;
            }, 2500);
        },
        dhClick (id){
            let int_id=parseInt(id);
            for(let obj of this.arr_dh){
                if(obj.id===int_id && obj.isActive===false){
                    obj.isActive=true;
                    let int_len=this.productList.length;
                    this.productList=this.productList.slice(0,parseInt(Math.random()*int_len)+1);
                }else if(obj.id!==int_id && obj.isActive===true){
                    obj.isActive=false;
                }
            }
        }
    }
}
</script>

<style>
#product{
    border-top: 0.8rem solid transparent;
    height: 100%;
}
#product .flex-box{
    display: flex;
}
#product .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#product .mint-header .mint-button-icon{
    color: #ccc;
}
#product .dh-box{
    background-color: #fff;
    overflow-x: auto;
    padding: 0 0.2rem;
    height: 0.8rem;
}
#product .dh-box::-webkit-scrollbar{
    display: none;
}
#product .dh-box ul{
    white-space: nowrap;
}
#product .dh-box ul li{
    padding: 0 0.2rem;
    line-height: 0.8rem;
    display: inline-block;
    color: #666;
    text-decoration: none;
}
#product .dh-box ul li.active{
    color: #f00;
}
#product .commodity-list{
    background-color: #fff;
    padding: 0 0.25rem 0.25rem;
    border-top: 0.25rem solid #fff;
    justify-content: space-between;
    margin: 0.2rem 0;
    flex-wrap: wrap;
    position: absolute;
    top: 1.6rem;
    left: 0;
    height: calc(100% - 1.6rem);
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#product .commodity-list li{
    width: 48%;
    margin: 0 0 0.2rem;
    position: relative;
}
#product .commodity-list li a{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
}
#product .commodity-list li .pic{
    height: 2.8rem;
    background-size: cover;
}
#product .commodity-list li .title{
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #777;
    font-size: 0.26rem;
    line-height: 0.38rem;
}
#product .commodity-list li .price{
    color: #f00;
    margin: 0.2rem 0 0;
    font-size: 0.3rem;
}
#product .commodity-list li .price small{
    font-size: 0.24rem;
}
#product .commodity-list li.loading{
    text-align: center;
    color: #999;
    width: 100%;
    margin: 0.2rem 0;
    font-size: 0.28rem;
}
#product .commodity-list li.loading .fa{
    font-size: 0.34rem;
    margin-right: 0.2rem;
    vertical-align: middle;
}
</style>
