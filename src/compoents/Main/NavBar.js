/**
 * Created by LaravelChen on 2018/1/9.
 */
import React, {Component} from 'react';
import {IndexLink, Link} from 'react-router';
import Storage from '../../core/localStorage';
import * as IndexAction from '../../actions/IndexActions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Config from "../../core/config";
import {notification, Badge} from 'antd';

const webSocket = new WebSocket(Config.statics.WEBSOCKET_ADDRESS);

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: "", notification_count: 0};
    }

    componentDidMount() {
        //获取登录标识
        this.setState({isLogin: Storage.isLogin()});

        //初始化
        webSocket.onopen = function () {
            let data = {
                "action": Config.statics.PUBLIC_USER_LIST,
                "content": {
                    "name": Storage.LocalStorage().getItem("name"),
                    "email": Storage.LocalStorage().getItem("email"),
                    "avatar": Storage.LocalStorage().getItem("avatar"),
                }
            };
            data = JSON.stringify(data);
            webSocket.send(data);
        };

        //接受websocket消息
        webSocket.onmessage = function (evt) {
            let data = JSON.parse(evt.data);
            if (data.action === Config.statics.ADD_USER_NOTIFICATION) {
                notification.open({
                    message: '添加好友通知',
                    description: data.content.message,
                });
                console.log(data.content.count);
                this.setState({notification_count: data.content.count});
            }
        }.bind(this);

        //接收消息
        let form = {"to_user_id": Storage.LocalStorage().getItem("id"), "type": "ADDUSER", "is_read": "NO"};
        this.props.indexAction.getNotificationCount(form).payload.then((response) => {
            if (response !== false) {
                this.setState({notification_count: response.result})
            }
        });
    }

    logout() {
        let form = {"email": Storage.LocalStorage().getItem("email")};
        this.props.indexAction.Logout(form).payload.then((response) => {
            if (response !== false) {
                console.log(response);
                Storage.LocalStorage().clear();
                window.location.href = "/";
            }
        });
    }

    render() {
        let login = null;
        if (this.state.isLogin === false) {
            login = (<div className="navbar-item">
                <div className="field is-grouped">
                    <Link to="/login" className="button is-danger is-outlined is-small is-padding-15">
                        <span>登录</span>
                    </Link>
                    <Link to="/register" style={{marginLeft: 20, marginRight: 30}}
                          className="button is-primary is-small is-padding-15">
                        <span>注册</span>
                    </Link>
                </div>
            </div>);
        } else {
            login = (
                <div>
                    <div className="navbar-item bell">
                        <Link>
                            <Badge count={this.state.notification_count}>
                                <i className="fa fa-bell font-20"></i>
                            </Badge>
                        </Link>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable" style={{marginLeft: 20, marginRight: 30}}>
                        <a className="navbar-link  is-active">
                            <div>
                                <img className="head_img" src="https://photo.laravelchen.cn/avataravatar.jpeg"/>
                            </div>
                        </a>
                        <div className="navbar-dropdown ">
                            <a className="navbar-item" href="#">
                                账户设置</a>
                            <hr style={{margin: 5}}/>
                            <a onClick={this.logout.bind(this)} className="navbar-item " href="#">
                                退出登录</a>
                        </div>
                    </div>
                </div>);
        }

        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <IndexLink to="/" className="navbar-item" style={{paddingLeft: 30}}>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                             alt="Bulma: a modern CSS framework based on Flexbox" width="32" height="28"/>
                        <img style={{paddingLeft: 20}}
                             src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg" width="115"
                             height="20" alt="Bulma"/>
                    </IndexLink>
                    <div className="navbar-burger burger" data-target="navMenuColorprimary-example">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="navMenuColorprimary-example" style={{paddingLeft: 50}} className="navbar-menu">
                    <div className="navbar-start">
                        <IndexLink className="navbar-item" to="/"><i
                            className="fa fa-wechat padding-right-5"></i>畅聊室</IndexLink>
                        <Link className="navbar-item" to="/friend"><i
                            className="fa fa-heart padding-right-5"></i>我的好友</Link>
                        <Link className="navbar-item" to="/single"><i
                            className="fa fa-comment padding-right-5"></i>私聊室</Link>
                    </div>
                    <div className="navbar-end">
                        {login}
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(NavBar);