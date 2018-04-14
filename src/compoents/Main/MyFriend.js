/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import * as IndexAction from "../../actions/IndexActions";
import {connect} from "react-redux";
import Storage from '../../core/localStorage';
import {Collapse} from 'antd';
import { browserHistory } from 'react-router'

const Panel = Collapse.Panel;

class MyFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {friendList: [], user_name: "", user_avatar: "", user_id: "", email: ""};
    }

    componentDidMount() {
        let form = {"user_id": Storage.LocalStorage().getItem("id")};
        this.props.indexAction.FriendList(form).payload.then((response) => {
            this.setState({friendList: response.result});
        });
    }

    //发送消息
    sendInfo() {
        Storage.LocalStorage().setItem("to_user_id",this.state.user_id);
        browserHistory.push('/privateChat');
    }

    //显示用户详细信息
    showUserInfo(userId) {
        let form = {"user_id": userId};
        this.props.indexAction.FriendInfo(form).payload.then((response) => {
            let user = response.result;
            this.setState({user_name: user.name, email: user.email, user_avatar: user.avatar, user_id: user.id});
        });
    }

    //展示默认界面
    showDefault() {
        this.setState({"user_name": ""});
    }

    render() {
        let userInfoShow = null;
        if (this.state.user_name == "") {
            userInfoShow = (
                <div className="chat_list">
                    <div className="chat_list_content">
                        <div className="userInfo_content">
                            <Collapse defaultActiveKey={['1']} accordion>
                                <Panel header="Small Chat简要说明" key="1">
                                    <p>1.注册登录，可以使用第三方登录GitHub!</p>
                                    <p>2.使用Swoole+React搭建的聊天室，拥有强悍的性能!</p>
                                    <p>3.项目放在GitHub上面，有兴趣的可以fork一波!</p>
                                </Panel>
                                <Panel header="作者介绍" key="2">
                                    <p>1.LaravelChen,一个热爱技术的小青年!</p>
                                </Panel>
                                <Panel header="社区介绍 " key="3">
                                    <p>1.微课堂社区，具体地址：https://laravelchen.com/</p>
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                </div>
            );
        } else {
            userInfoShow = (
                <div className="chat_list">
                    <div className="chat_list_content">
                        <div className="userInfo_content">
                            <div className="username_line">
                                <p>
                                    <h1 className="title is-4">{this.state.user_name}</h1>
                                    <h1 className="title is-6 chat_name">Welcome To SamllChat!</h1>
                                </p>
                                <div>
                                    <img className="image-80 head_img_square" src={this.state.user_avatar}/>
                                </div>
                            </div>
                            <hr className="userInfo_hr"/>
                            <div className="userInfo_btn">
                                <a onClick={this.sendInfo.bind(this)}
                                   className="button is-primary my_button">发消息</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="margin-layout">
                <div className="box no-padding">
                    {/*左侧边栏*/}
                    <div className="side_bar_left">
                        <ul>
                            <li onClick={this.showDefault.bind(this)} className="li_head">
                                好友列表
                            </li>
                            {
                                this.state.friendList.map(friend =>
                                    <li onClick={this.showUserInfo.bind(this, friend.id)} key={friend.id}>
                                        <img className="head_img_square"
                                             src={friend.avatar}/>
                                        <span>{friend.name}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    {/*显示好友详情*/}
                    {userInfoShow}
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(MyFriend);