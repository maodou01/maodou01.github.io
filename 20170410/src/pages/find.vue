<template>
    <div id="find">
        <mt-header fixed title="发现">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-cell class="find-list" title="商城公告" style="margin-top: 0.2rem;" is-link>
            <img slot="icon" src="src/images/see_notice.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="find-list" title="商城新闻" is-link>
            <img slot="icon" src="src/images/see_news.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="find-list" title="帮助中心" is-link>
            <img slot="icon" src="src/images/see_help.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="find-list" title="公司介绍" is-link>
            <img slot="icon" src="src/images/see_about.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="find-list" title="联系我们" is-link>
            <img slot="icon" src="src/images/see_call.png" width="24" height="24">
        </mt-cell>
        <mt-cell class="find-list" title="版权所有" is-link>
            <img slot="icon" src="src/images/see_copyright.png" width="24" height="24">
        </mt-cell>
    </div>
</template>

<script>
export default {
    name: 'find',
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
#find{
    border-top: 0.8rem solid transparent;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#find .btn-order{
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
#find .flex-box{
    display: flex;
}
#find .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#find .mint-header .mint-button-icon{
    color: #ccc;
}
#find .find-list{
    color: #555;
    min-height: 0.9rem;
}
#find .find-list img{
    display: initial;
    width: initial;
    margin-right: 0.1rem;
}
#find .find-list .mint-cell-title{
    font-size: 0.28rem;
}
#find .find-list .mint-cell-wrapper{
    background-image: -webkit-linear-gradient(top, #e8e8e8, #e8e8e8 50%, transparent 50%);
    background-image: linear-gradient(180deg, #e8e8e8, #e8e8e8 50%, transparent 50%);
}
</style>
