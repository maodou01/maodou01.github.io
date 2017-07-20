<template>
    <div id="userAddress">
        <mt-header fixed title="管理收货地址">
            <router-link to="/user/safe" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <ul class="list">
            <li v-for="obj in arr_address">
                <div class="title">{{obj.name}}</div>
                <div class="add">{{obj.add}}</div>
                <div class="tel">{{obj.tel}}</div>
                <label class="is-default">
                    <input type="radio" name="default" v-model="indexDefault" :value="obj.id">
                    <span></span>
                    <a class="r-link" @click="handleEdit(obj.id)">编辑</a>
                    <a class="r-link" @click="handleDel(obj.id)">删除</a>
                </label>
            </li>
        </ul>
        <mt-button class="btn-add" size="large" type="primary" v-on:click="addExitBox=true">添加地址</mt-button>
        <mt-popup v-model="addExitBox" position="right" class="add-exit-box" :modal="false">
            <mt-header fixed title="添加新地址">
                <div @click="addExitBox = false" slot="left">
                    <mt-button icon="back"></mt-button>
                </div>
                <div slot="right" v-on:click="handleSave">
                    <mt-button>保存</mt-button>
                </div>
            </mt-header>
            <div class="form">
                <mt-field label="收货人" placeholder="请输入收货人" v-model="input_receiver"></mt-field>
            </div>
            <div class="form">
                <mt-field label="联系电话" placeholder="请输入手机号" type="tel" v-model="input_phone"></mt-field>
                <mt-cell title="所在地区" is-link>
                    <div @click="selectAreaPopup=true">{{selectArea_value}}</div>
                </mt-cell>
                <mt-field placeholder="请填写详细地址，不少于5个字" type="textarea" rows="4" v-model="input_detailadd"></mt-field>
            </div>
            <div class="form">
                <mt-cell title="设置默认">
                    <mt-switch v-model="isDefault"></mt-switch>
                </mt-cell>
            </div>
            <mt-popup v-model="selectAreaPopup" position="bottom" class="selectArea-box">
                <mt-picker :slots="dateSlots" @change="onCityChange" :visible-item-count="5" :show-toolbar="false"></mt-picker>
            </mt-popup>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'userAddress',
    data () {
        return {
            arr_address: [],
            indexDefault: 1,
            addExitBox: false,
            selectAreaPopup: false,
            selectArea_value: '点击选择地区',
            dateSlots: [
                {
                    flex: 1,
                    values: ['湖南省', '浙江省', '上海市', '江苏省', '山西省', '湖北省'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: [],
                    className: 'slot5',
                    textAlign: 'left'
                }
            ],
            input_receiver: '',
            input_phone: '',
            input_detailadd: '',
            isDefault: true
        }
    },
    methods: {
        handleEdit(id){
            // 编辑
            this.addExitBox=true;
        },
        handleDel(id){
            // 删除
            this.arr_address.forEach((obj,i)=>{
                if(obj.id===id){
                    MintUI.MessageBox.confirm('是否确认删除？','删除提示').then(action => {
                        this.arr_address=this.arr_address.splice(i,this.arr_address.length-1);
                    });
                }
            });
        },
        handleSave(){
            let isPass=true, str_err='';
            if(this.input_detailadd===''){
                str_err='输入详细地址不能为空';
                isPass=false;
            }
            if(this.input_phone==='' || !/1[3-9]\d{9}/.test(this.input_phone)){
                str_err='输入正确手机号码';
                isPass=false;
            }
            if(this.input_receiver===''){
                str_err='输入收件人不能为空';
                isPass=false;
            }
            if(isPass){
                // 验证通过
            }else{
                MintUI.MessageBox({
                    title: '验证失败',
                    message: str_err
                });
            }
        },
        onCityChange(picker, values) {
            let obj_city={
                '湖南省': {
                    '长沙市': ['芙蓉区','天心区','岳麓区','开福区','雨花区','望城区','长沙县'],
                    '株洲市': ['天元区','荷塘区'],
                    '湘潭市': ['雨湖区']
                },
                '浙江省': {
                    '杭州市': ['上城区','下城区','西湖区','拱墅区','滨江区','余杭区','江干区','富阳区','萧山区','桐庐县'],
                    '嘉兴市': ['南湖区','秀洲区','海宁市','嘉善县','平湖市','海盐县','桐乡市'],
                    '湖州市': ['']
                },
                '上海市': {
                    '浦东区': ['']
                }
            };
            let _this=this;
            for(let name in obj_city){
                if(name===values[0]){
                    let arr_city2=[];
                    for(let name2 in obj_city[name]){
                        arr_city2.push(name2);
                    }
                    _this.dateSlots[2].values=arr_city2;
                    break;
                }else{
                    _this.dateSlots[2].values=[];
                }
            }
            for(let name in obj_city[values[0]]){
                if(name===values[1]){
                    let arr_city3=[];
                    arr_city3=obj_city[values[0]][name];
                    _this.dateSlots[4].values=arr_city3;
                    break;
                }else{
                    _this.dateSlots[4].values=[];
                }
            }
            if(values.join(''))
                _this.selectArea_value=values.join('');
        }
    },
    created() {
        this.arr_address=[
            {id: 1, name: '覃业军', add: '湖南省长沙市岳麓区麓谷企业广场B7幢2单元5c', tel: '13588387886'},
            {id: 2, name: '覃业军', add: '湖南省长沙市岳麓区麓谷企业广场B7幢2单元5c', tel: '13588387886'}
        ];
    },
    watch: {
        
    }
}
</script>

<style>
#userAddress{
    padding-top: 0.8rem;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
#userAddress .flex-box{
    display: flex;
}
#userAddress .mint-header{
    background-color: #fff;
    color: #555;
    border-bottom: 1px solid #F2F2F2;
    height: 0.8rem;
}
#userAddress .mint-header .mint-button-icon{
    color: #ccc;
}
#userAddress .list{
    padding: 0.2rem 0 0;
    overflow-y: auto;
    height: calc(100% - 1rem);
}
#userAddress .list>li{
    background-color: #fff;
    margin-bottom: 0.2rem;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem;
    position: relative;
}
#userAddress .list>li .title{
    color: #555;
}
#userAddress .list>li .add{
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
#userAddress .list>li .tel{
    position: absolute;
    color: #555;
    right: 0.2rem;
    top: 0.2rem;
}
#userAddress .list>li .is-default{
    color: #cecece;
    font-size: 0.24rem;
}
#userAddress .list>li .is-default input{
    outline: none;
    -webkit-appearance: none;
    font: normal normal normal 14px/1 FontAwesome;
    display: inline-block;
    color: inherit;
    font-size: 0.3rem;
    margin-left: 0;
}
#userAddress .list>li .is-default input::before{
    content: '\f058'
}
#userAddress .list>li .is-default span::before{
    content: '选择地址';
}
#userAddress .list>li .is-default input:checked{
    color: #FCA304;
}
#userAddress .list>li .is-default input:checked+span{
    color: #FCA304;
}
#userAddress .list>li .is-default input:checked+span::before{
    content: '默认地址';
}
#userAddress .list>li .is-default .r-link{
    display: inline-block;
    margin-left: 0.3rem;
    color: #333;
    float: right;
    margin-top: 0.1rem;
}
#userAddress .btn-add{
    height: 0.8rem;
    border-radius: 0;
    background-color: #D0021B;
}
#userAddress .btn-add label{
    font-size: 0.3rem;
    letter-spacing: 1px;
}
#userAddress .add-exit-box{
    width: 100%;
    height: 100%;
    background-color: #E5E8ED;
    padding-top: 0.8rem;
    box-sizing: border-box;
}
#userAddress .add-exit-box .form{
    margin: 0.2rem 0;
}
#userAddress .add-exit-box .form .mint-cell{
    min-height: 0.8rem;
}
#userAddress .add-exit-box .form .mint-cell-text{
    font-size: 0.28rem;
    color: #555;
}
#userAddress .add-exit-box .form .mint-cell-value,
#userAddress .add-exit-box .form textarea,
#userAddress .add-exit-box .form input{
    font-size: 0.28rem;
    color: #999;
    resize: none;
}
#userAddress .selectArea-box{
    width: 100%;
}
#userAddress .selectArea-box .picker-slot,
#userAddress .selectArea-box .picker-items{
    font-size: 0.28rem;
}
</style>
