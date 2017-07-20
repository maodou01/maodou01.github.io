import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);
Vue.use(VueRouter);
window.axios=axios;
window.MintUI=MintUI;

//过滤器
Vue.filter('currency', (value)=>{
	var value = parseFloat(value), _currency='', decimals=2;
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '￥';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + _float;
});

const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: require(`./App.vue`) },
    { path: '/product', component: require(`./pages/product-ls.vue`) },
    { path: '/product/:id', component: require(`./pages/product-detail.vue`) },
    { path: '/cart', component: require(`./pages/my-cart.vue`) },
    { path: '/sureOrder', component: require(`./pages/sure-order.vue`) },
    { path: '/orderDetail', component: require(`./pages/order-detail.vue`) },
    { path: '/find', name: 'find', component: require(`./pages/find.vue`) },
    { path: '/user', name: 'user', component: require(`./pages/user.vue`), children: [
			{path: 'safe', name: 'userSafe', component: require(`./pages/userSafe.vue`), children: [
				{path: 'address', name: 'userAddress', component: require(`./pages/userAddress.vue`)},
				{path: 'phone', name: 'userPhone', component: require(`./pages/userPhone.vue`)},
				{path: 'loginPass', name: 'userLoginPass', component: require(`./pages/userLoginPass.vue`)}
			]}
		]},
    { path: '/door', name: 'door', component: require(`./pages/door.vue`) },
	{ path: '/loginGuide', name: 'loginGuide', component: require(`./pages/loginGuide.vue`), children:[
		{path: 'login', name: 'guideLogin', component: require(`./pages/guideLogin.vue`)},
		{path: 'register', name: 'guideRegister', component: require(`./pages/guideRegister.vue`)}
	]}
  ]
});

new Vue({
  router,
  data() {
    return {
      transitionName: 'slide-left',
	  foot_name: '',
	  isShow: true
    }
  },
  created() {
	this.footHandle(this.$route.name);
  },
  watch: {
    '$route' (to, from) {
		const toDepth = to.path.split('/').length;
		const fromDepth = from.path.split('/').length;
		this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
		this.footHandle(to.name);
    }
  },
  methods: {
	footHandle(name){
		let _this=this;
		_this.isShow=true;
		switch(name){
			case 'home':
				_this.foot_name='商城';
				break;
			case 'door':
				_this.foot_name='门店';
				break;
			case 'find':
				_this.foot_name='发现';
				break;
			case 'user':
				_this.foot_name='我的';
				break;
			default:
				_this.isShow=false;
		}
	}
  },
  template: `
		<div id="app">
			<transition name="fade" mode="out-in">
				<router-view class="view"></router-view>
			</transition>
			<mt-tabbar class="footer" :value="foot_name" fixed v-bind:class="{show: isShow}">
				<mt-tab-item id="商城" href="#/">
					<div slot="icon" class="icon icon1"></div>
					商城
				</mt-tab-item>
				<mt-tab-item id="门店" href="#/door">
					<div slot="icon" class="icon icon2"></div>
					门店
				</mt-tab-item>
				<mt-tab-item id="购物车" href="#/cart">
					<div slot="icon" class="icon icon3"></div>
					购物车
				</mt-tab-item>
				<mt-tab-item id="发现" href="#/find">
					<div slot="icon" class="icon icon4"></div>
					发现
				</mt-tab-item>
				<mt-tab-item id="我的" href="#/user">
					<div slot="icon" class="icon icon5"></div>
					我的
				</mt-tab-item>
			</mt-tabbar>
		</div>
  `
}).$mount('#app');

(function(window,undefined){
    (function reload(){
        document.documentElement.style.fontSize= ((window.innerWidth / 640) * 100) + 'px';
        window.onresize=reload;
    })();
})(window);

