;(function(React,$,window,undefined){
    var Main=React.createClass({
        getInitialState: function(){
            return {
                bool_delay: true,
                zth: [
                    {
                        no: '',
                        name: '读取中，请稍等'
                    }
                ],
                select: [
                    {
                        link: '明细账.html',
                        image: 'images/touxiang.jpg',
                        name: '明细账'
                    },
                    {
                        link: '余额表.html',
                        image: 'images/touxiang.jpg',
                        name: '余额表'
                    }
                ]
            };
        },
        loginClick: function(e){
            var $user=$(this.refs.login_user),
                $pass=$(this.refs.login_pass),
                _this=this;
            if(!$user.val()){
                $user.focus();
                return;
            }
            if(!$pass.val()){
                $pass.focus();
                return;
            }
            $('.load-box').show(0);
            $.post(window.server_url,{
                how: 'login',
                user: $user.val(),
                pass: $pass.val()
            },function(d){
                $('.load-box').hide(0);
                $user.val('');
                $pass.val('');
                if(d.status===2){
                    _this.initZth();
                    $('.wrapper-login').animate({
                        left: '-30%',
                        opacity: '0'
                    },400,function(){
                        $('.wrapper-function').css({
                            'left': '100%',
                            'opacity': '0',
                        }).animate({
                            'left': '30%',
                            opacity: '1'
                        },600);
                    });
                }else{
                    dialog({
                        title: '登录失败',
                        content: d.err
                    }).addEventListener('close',function(){
                        $user.focus().select();
                    }).showModal();
                }
            },'json');
        },
        loginInput: function(e){
            if(e.keyCode===13){
                this.loginClick();
            }
        },
        initZth: function(){
            var _this=this;
            if(this.state.bool_delay){
                this.setState({
                    bool_delay:false
                });
                $.post(window.server_url,{
                    how: 'query',
                    zth: 'system',
                    sql: 'select cAcc_Id,cAcc_Name from UA_Account order by cAcc_Id'
                },function(d){
                    if(d.status===1){
                        var arr=[];
                        $.map(d.data,function(obj){
                            arr.push({
                                no: obj.cAcc_Id,
                                name: '【'+obj.cAcc_Id+'】'+obj.cAcc_Name
                            });
                        });
                        console.log(arr);
                        _this.setState({
                            zth: arr
                        });
                    }else{
                        dialog({
                            title: '读取帐套失败',
                            content: d.err,
                            width: 400
                        }).showModal();
                        _this.setState({
                            zth:[{no:'',name:'读取失败，请重试'}]
                        });
                    }
                    _this.setState({
                        bool_delay:true
                    });
                },'json');
            }
        },
        exitClick: function(e){
            $.post(window.server_url,{
                how: 'outlogin'
            },function(d){
                if(d.status===0){
                    $('.wrapper-function').animate({
                        left: '100%',
                        opacity: '0'
                    },400,function(){
                        $('.wrapper-login').css({
                            'left': '-30%',
                            'opacity': '0',
                        }).animate({
                            'left': '30%',
                            opacity: '1'
                        },600);
                    });
                }else{
                    dialog({
                        title: '退出失败',
                        content: d.err,
                        width: 400
                    }).showModal();
                }
            },'json');
        },
        linkClick: function(e){
            var $this=$(e.currentTarget),
                zth=$(this.refs.zth).val(),
                url=$this.attr('data-url');   
            if(zth){
                window.open(url+'?zth='+zth);
            }else{
                dialog({
                    title: '打开失败',
                    content: '请选择帐套',
                    width: 400
                }).showModal();
            }
        },
        componentDidMount: function(){
            var _this=this;
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                },
                error: function(r) {
                    console.log(r);
                    $('.load-box').hide(0);
                    dialog({
                        title: '处理异常',
                        content: '服务器未开启，或者接收异常'
                    }).showModal();
                }
            });
            $.post(window.server_url,{
                how: 'islogin'
            },function(d){
                if(d.status===2){
                    _this.initZth();
                    $('.wrapper-login').animate({
                        left: '-30%',
                        opacity: '0'
                    },400,function(){
                        $('.wrapper-function').css({
                            'left': '100%',
                            'opacity': '0',
                        }).animate({
                            'left': '30%',
                            opacity: '1'
                        },600);
                    });
                }else{
                    _this.refs.login_user.focus();
                }
            },'json');
        },
        render: function(){
            var _this=this;
            return (
                <section id="main">
                    <div className="wrapper-login">
                        <div className="title">财务系统</div>
                        <form className="form-horizontal" action="javascript:;">
                            <div className="form-group">
                                <label className="col-sm-3 col-xs-3 control-label">用户名</label>
                                <div className="col-sm-9 col-xs-9">
                                    <input type="tel" className="form-control" placeholder="请输入用户名" ref="login_user" onKeyPress={this.loginInput} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 col-xs-3 control-label">密码</label>
                                <div className="col-sm-9 col-xs-9">
                                    <input type="password" className="form-control" placeholder="请输入密码" ref="login_pass" />
                                </div>
                            </div>
                            <button className="btn btn-default btn-block" onClick={this.loginClick}>登录</button>
                        </form>
                    </div>
                    <div className="wrapper-function">
                        <select className="form-control" ref="zth">
                            {this.state.zth.map(function(obj){
                                return (
                                    <option value={obj.no}>{obj.name}</option>
                                );
                            })}
                        </select>
                        <ul className="select">
                            {this.state.select.map(function(obj){
                                return (
                                    <li onClick={_this.linkClick} data-url={obj.link}>
                                        <a href="javascript:;">
                                        <div className="pic" style={{backgroundImage: "url('"+obj.image+"')"}}></div>
                                        <p className="txt">{obj.name}</p>
                                        </a>
                                    </li>
                                );
                            })}
                            <li className="exit" onClick={this.exitClick}><a href="javascript:;">
                                <div className="pic" style={{backgroundImage: "url('images/touxiang.jpg')"}}></div>
                                <p className="txt">安全退出</p>
                            </a></li>
                        </ul>
                    </div>
                    <div className="bj-box"></div>
                    <div className="load-box"><i></i></div>
                </section>
            );
        }
    });


    React.render(
        <Main />,
        document.getElementsByTagName('body')[0]
    );
})(React,jQuery,window);