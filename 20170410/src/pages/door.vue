<template>
    <div id="door">
        <mt-header fixed title="门店列表">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <a slot="right" v-on:click="handleMap">
                <mt-button>地图</mt-button>
            </a>
        </mt-header>
        <div class="flex-box top-select">
            <div v-on:click="popusCity=true">{{str_city}}<div class="icon"></div></div>
            <div v-bind:class="{active: isSortList}">
                <div class="name" v-on:click="isSortList=!isSortList">智能排序<div class="icon"></div></div>
                <div class="h-box">
                    <ul class="h-list">
                        <li :class="{active: indexSort===0}" @click="handleSortList(0)">距离我最近</li>
                        <li :class="{active: indexSort===1}" @click="handleSortList(1)">开店时间最长</li>
                        <li :class="{active: indexSort===2}" @click="handleSortList(2)">最新加盟</li>
                        <li class="ft">400-8888-8888<br />湖南万润农业科技有限公司版权所有</li>
                    </ul>
                    <div class="black-bj" @click="isSortList=false"></div>
                </div>
            </div>
        </div>
        <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="obj in arr_list">
                <router-link to="/product"></router-link>
                <div class="flex-box">
                    <div class="pic"><img :src="obj.pic" alt=""></div>
                    <div class="txt">
                        <h2 class="name">{{obj.name}}</h2>
                        <p class="tip">联系人：{{obj.contact}}</p>
                        <p class="tip">联系电话：{{obj.phone}}</p>
                        <p class="tip">代理等级：{{obj.grade}}</p>
                    </div>
                </div>
                <p class="f-txt"><i class="icon icon1"></i> 门店地址：{{obj.add}}<p>
                <p class="f-txt"><i class="icon icon2"></i> 距离我有：{{obj.distance}}</p>
            </li>
            <li class="loading"><i class="fa fa-spinner fa-pulse"></i>加载中</li>
        </ul>
        <mt-popup v-model="popusCity" position="right" class="popus-city" :modal="false">
            <mt-header fixed title="切换城市">
                <a v-on:click="popusCity=false" slot="left">
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
            <p class="title">当前定位城市</p>
            <div class="c-box">
                <span class="curr-city"><span style="margin-right: 0.2rem;" @click="selectCity">长沙市</span>GPS定位</span>
            </div>
            <p class="title">最近访问城市</p>
            <div class="c-box">
                <span class="select-city" @click="selectCity">长沙市</span>
                <span class="select-city" @click="selectCity">长沙市</span>
                <span class="select-city" @click="selectCity">长沙市</span>
                <span class="select-city" @click="selectCity">长沙市</span>
                <span class="select-city" @click="selectCity">长沙市</span>
            </div>
            <p class="title">所有城市列表</p>
            <div class="c-box index-list">
                <mt-index-list style="height: 250px;">
                    <mt-index-section v-for="item in alphabet" :index="item.initial">
                    <mt-cell v-for="cell in item.cells"><div slot="title" @click="selectCity">{{cell}}</div></mt-cell>
                    </mt-index-section>
                </mt-index-list>
            </div>
        </mt-popup>
    </div>
</template>

<script>
const NAMES = ['北京市','上海市', '长沙市', '广州市', '杭州市', '福州市', '厦门市', '宁波市', '南京市', '沈阳市', '嘉兴市', '重庆市', '天津市'];
export default {
    name: 'door',
    data () {
        return {
            indexSort: 0,
            isSortList: false,
            arr_list: [],
            popusCity: false,
            alphabet: [],
            str_city: '定位中'
        }
    },
    methods: {
        handleMap(){

        },
        handleSortList(index){
            this.indexSort=index;
            //this.isSortList=false;
        },
        loadMore(){
            this.loading = true;
            setTimeout(()=>{
                let obj_data=this.arr_list[0];
                for(let i=0;i<5;i++)
                    this.arr_list.push(obj_data);
                this.loading = false;
            },3000);
        },
        selectCity(){
            let str_city=event.currentTarget.innerHTML;
            this.str_city=str_city;
            this.popusCity=false;
        }
    },
    created() {
        this.arr_list=[
            {id: 1, pic: 'src/images/product04.jpg', name: '万润茶叶海宁店', contact: '张先生', phone: '13588888888', grade: '县区级代理', add: '浙江省嘉兴市海宁市海州街道111号', distance: '180公里'},
            {id: 2, pic: 'src/images/product04.jpg', name: '万润茶叶海宁店', contact: '张先生', phone: '13588888888', grade: '县区级代理', add: '浙江省嘉兴市海宁市海州街道111号', distance: '180公里'},
            {id: 2, pic: 'src/images/product04.jpg', name: '万润茶叶海宁店', contact: '张先生', phone: '13588888888', grade: '县区级代理', add: '浙江省嘉兴市海宁市海州街道111号', distance: '180公里'}
        ];
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
            let cells = NAMES.filter(name => {
                if(initial === pinyinUtil.getFirstLetter(name[0])){
                    return true;
                }
            });
            if(cells.length>0)
                this.alphabet.push({initial, cells});
        });
    },
    watch: {
        
    }
}
</script>

<style>
#door{
    border-top: 0.8rem solid transparent;
    border-bottom: 60px solid transparent;
}
#door .flex-box{
    display: flex;
}
#door .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#door .mint-header .mint-button-icon{
    color: #ccc;
}
#door .top-select{
    background-color: #fff;
    height: 0.8rem;
    text-align: center;
    color: #555;
    border-bottom: 1px solid #dedede;
}
#door .top-select>div:first-child{
    border-right: 1px solid #dedede;
}
#door .top-select>div{
    flex: 1;
    line-height: 0.8rem;
}
#door .top-select>div .icon{
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background-image: url('../images/door_dropdown.png');
    background-size: contain;
    vertical-align: middle;
    margin-left: 0.15rem;
}
#door .top-select>div .h-box{
    position: absolute;
    width: 100%;
    height: calc(100% - 1.62rem);
    top: 1.62rem;
    left: 0;
    z-index: 2;
    visibility: hidden;
    transition: visibility .4s;
}
#door .top-select>div.active{
    background-color: #F8F8F8;
}
#door .top-select>div.active .h-box{
    visibility: visible;
}
#door .top-select>div .h-box .black-bj{
    opacity: 0;
    transition: opacity 0.6s;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
}
#door .top-select>div .h-box::before{
    content: '';
    position: absolute;
    width: 50%;
    top: -1px;
    height: 1px;
    background-color: #F8F8F8;
}
#door .top-select>div.active .h-box .black-bj{
    opacity: 0.64;
}
#door .top-select>div .h-box .h-list{
    max-height: 0px;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1;
    text-align: left;
    background-color: #F8F8F8;
}
#door .top-select>div.active .h-box .h-list{
    max-height: 100%;
    transition: max-height 1s;
}
#door .top-select>div .h-box .h-list>li{
    margin-left: 0.2rem;
    border-bottom: 1px solid #dedede;
    position: relative;
}
#door .top-select>div .h-box .h-list>li.active::before{
    content: '';
    float: right;
    width: 0.35rem;
    height: 0.35rem;
    background-size: contain;
    background-image: url('../images/door_ok.png');
    margin: 0.2rem 0.2rem 0 0;
}
#door .top-select>div .h-box .h-list>li.ft{
    border-width: 0;
    background-color: #fff;
    padding: 0.24rem 0;
    line-height: 0.3rem;
    font-size: 0.24rem;
    color: #dedede;
    text-align: center;
    margin: 0;
}
#door .list{
    overflow-y: auto;
    height: calc(100% - 55px - 1.6rem);
    position: absolute;
    top: 1.6rem;
    left: 0;
}
#door .list>li{
    background-color: #fff;
    padding: 0.2rem;
    margin: 0.2rem 0;
    font-size: 0.25rem;
    position: relative;
}
#door .list>li>a{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
}
#door .list>li .flex-box{
    margin-bottom: 0.3rem;
    height: 2rem;
}
#door .list>li .flex-box>div{
    flex: 1;
    height: 2rem;
    overflow: hidden;
}
#door .list>li .flex-box>div.pic{
    margin-right: 0.2rem;
    flex: 0.8;
}
#door .list>li .pic img{
    height: 100%;
}
#door .list>li .txt{
    color: #555;
}
#door .list>li .txt .name{
    font-size: 0.3rem;
    font-weight: 400;
    margin: 0.05rem 0 0.2rem;
}
#door .list>li .txt p{
    margin: 0.08rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#door .list>li .f-txt{
    color: #777;
    margin: 0.1rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#door .list>li .f-txt .icon{
    display: inline-block;
    width: 0.36rem;
    height: 0.36rem;
    background-image: url('../images/door_shop_address.png');
    background-size: contain;
    background-position: center center;
    vertical-align: top;
}
#door .list>li .f-txt .icon.icon2{
    background-image: url('../images/door_shop_map.png');
}
#door .list>li.loading{
    text-align: center;
    color: #999;
    background-color: transparent;
    font-size: 0.28rem;
}
#door .list>li.loading .fa{
    font-size: 0.34rem;
    margin-right: 0.2rem;
    vertical-align: middle;
}
#door .popus-city{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    padding-top: 0.8rem;
    box-sizing: border-box;
    overflow-y: auto;
}
#door .popus-city>.title{
    padding: 0.2rem;
    margin: 0;
    color: #999;
    font-size: 0.26rem;
}
#door .popus-city .c-box{
    background-color: #fff;
    padding: 0.2rem;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
}
#door .popus-city .c-box .curr-city{
    font-size: 0.27rem;
    color: #777;
}
#door .popus-city .c-box .select-city{
    padding: 0.1rem 0.4rem;
    color: #555;
    display: inline-block;
    border: 1px solid #B7C1C2;
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
}
#door .popus-city .c-box.index-list{
    padding: 0;
}
#door .popus-city .mint-indexlist-content{
    height: 100% !important;
}
#door .popus-city .c-box.index-list p.mint-indexsection-index{
    display: none;
}
#door .popus-city .c-box.index-list .mint-cell:last-child{
    background-image: none;
}
#door .popus-city .c-box.index-list .mint-cell-wrapper{
    border-bottom: 1px solid #d9d9d9;
    background-image: none;
    font-size: 0.26rem;
}
#door .popus-city .c-box.index-list .mint-indexlist-navitem{
    padding: 0;
    font-size: 0.24rem;
}
#door .popus-city .c-box.index-list .mint-cell{
    min-height: 0.8rem;
}
#door .popus-city .c-box.index-list .mint-indexlist-nav{
    border-left: 0;
}
</style>
