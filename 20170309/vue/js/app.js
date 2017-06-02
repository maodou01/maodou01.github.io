(function(window,undefined){
    (function reload(){
        document.documentElement.style.fontSize= ((window.innerWidth / 640) * 100) + 'px';
        window.onresize=reload;
    })();
})(window);

Vue.use(VueRouter)

const Home = {
  template: '#home',
  data: function(){
    return {
        bannerImg: ['../images/banner1.jpg','../images/banner2.jpg','../images/banner3.jpg'],
        adsImg: ['../images/index-pic2.jpg','../images/index-pic3.jpg','../images/index-pic4.jpg','../images/index-pic5.jpg','../images/index-pic6.jpg','../images/index-pic7.jpg','../images/index-pic8.jpg','../images/index-pic9.jpg','../images/index-pic10.jpg','../images/index-pic11.jpg','../images/index-pic12.jpg'] 
    }
  }
}

const Parent = {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  template: `
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  `
}

const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/parent', component: Parent,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
        <div class="header weui-flex">
            <div class="btn-fl">
                <i class="fa fa-reorder"></i>
                <span>分类</span>
            </div>
            <div class="search">
                <input type="text" name="" id="" placeholder="搜索店内商品">
                <i class="fa fa-search"></i>
            </div>
        </div>
        <div class="footer weui-flex">
            <a href="index.html" class="weui-flex__item active">
                <i class="icon fa fa-home"></i>
                <span>首页</span>
            </a>
            <a href="commodity.html" class="weui-flex__item">
                <i class="icon fa fa-shopping-basket"></i>
                <span>商品</span>
            </a>
            <a href="cart.html" class="weui-flex__item">
                <i class="icon fa fa-shopping-cart"></i>
                <span>购物车</span>
            </a>
            <a href="user.html" class="weui-flex__item">
                <i class="icon fa fa-user-o"></i>
                <span>个人中心</span>
            </a>
        </div>
        <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
