<template>
  <div id="home">
    <mt-swipe :auto="0">
        <mt-swipe-item v-for="urlImg in bannerImg">
            <div class="bannerImg" v-bind:style="{backgroundImage: 'url('+urlImg+')'}"></div>
        </mt-swipe-item>
    </mt-swipe>
    <div class="fl-box">
        <div class="flex-box">
            <a href=""><img src="src/images/dh01.jpg" alt=""></a>
            <a href=""><img src="src/images/dh02.jpg" alt=""></a>
            <a href=""><img src="src/images/dh03.jpg" alt=""></a>
            <a href=""><img src="src/images/dh04.jpg" alt=""></a>
        </div>
        <div class="flex-box">
            <a href=""><img src="src/images/dh05.jpg" alt=""></a>
            <a href=""><img src="src/images/dh06.jpg" alt=""></a>
            <a href=""><img src="src/images/dh07.jpg" alt=""></a>
            <router-link to="/product"><img src="src/images/dh08.jpg" alt=""></router-link>
        </div>
    </div>
    <a href="" class="block-img">
        <img src="src/images/commodity01.jpg" alt="">
    </a>
    <a href="" class="block-img">
        <img src="src/images/commodity02.jpg" alt="">
    </a>
  </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        let arr_img=[];
        // axios.get('php/banner.php',{
        //     responseType: 'json'
        // }).then((d)=>{
        //     let data=d.data.result;
        //     for(let url of data){
        //         arr_img.push(url);
        //     }
        //     console.log(d);
        // }).catch((e)=>{
        //     console.log(e);
        // });
        arr_img=['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491819183006&di=30c0aaf86c3950e3a05f94d6080c929f&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F14%2F25%2F43Y58PICfJB_1024.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491819183005&di=3a5ff60f5daf3da5e3814dcbc4b205e3&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F53%2F94%2F89858PICE3R_1024.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491819183005&di=ddd54731f3cfdb658f81e15abc944a32&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F83%2F48%2F80V58PICtps_1024.jpg'];
        return {
          bannerImg: arr_img
        }
    },
    methods: {
        selected (){
            console.log(this);
        }
    },
    created(){
        let arr_img=[], _this=this;
    }
}
</script>

<style>
#home{
    border-bottom: 55px solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#home .flex-box{
    display: flex;
}
#home .mint-swipe{
    height: 3.5rem;
}
#home .mint-swipe .bannerImg{
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}
#home .mint-swipe-indicator{
    background-color: #fff;
}
#home .mint-swipe-indicator.is-active{
    opacity: 1;
}
#home .fl-box{
    margin: 0.15rem 0;
    padding: 0 0.15rem;
}
#home .fl-box .flex-box:first-child{
    margin-bottom: 0.1rem;
}
#home .fl-box .flex-box{
    min-height: 1.6rem;
    justify-content: space-between;
}
#home .fl-box .flex-box a{
    display: block;
    background-color: #fff;
    height: 100%;
    width: 23.5%;
}
#home .block-img{
    margin: 0.05rem 0;
    display: block;
    background-color: #fff;
    min-height: 4rem;
}
</style>
