/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import * as IndexAction from "../../actions/IndexActions";
import {connect} from "react-redux";
import Storage from '../../core/localStorage';
import Config from "../../core/config";
import $ from "jquery";
import ChatListPrivate from "./PublicChat/ChatListPrivate";

const webSocket = new WebSocket(Config.statics.WEBSOCKET_ADDRESS);

class PrivateChat extends Component {
    constructor(props) {
        super(props);
        this.state = {friendList: [], dataSource: [], to_user_id: "", content: "",};
    }

    componentDidMount() {
        //显示聊天记录哦
        if (Storage.LocalStorage().getItem("to_user_id")) {
            let form1 = {
                "user_id": Storage.LocalStorage().getItem("id") + "",
                "to_user_id": Storage.LocalStorage().getItem("to_user_id") + ""
            };
            this.props.indexAction.PrivateChatList(form1).payload.then((response) => {
                this.setState({dataSource: response.result.data});
            });
        }

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
            let id = Storage.LocalStorage().getItem("id");
            if (data.action === Config.statics.PRIVATE_CHAT) {
                if (id === data.content.to_user_id + "" || id === data.content.user_id + "") {
                    let arr = this.state.dataSource;
                    arr.push(data);
                    this.setState({dataSource: arr}, () => {
                        $("#chat_list_content").scrollTop($("#chat_list_content")[0].scrollHeight);
                    });
                }
            }
        }.bind(this);

        //显示好友列表
        let form = {"user_id": Storage.LocalStorage().getItem("id")};
        this.props.indexAction.FriendList(form).payload.then((response) => {
            this.setState({friendList: response.result});
        });
    }

    //发送私聊消息
    send(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (this.state.content !== "") {
                let data = {
                    "action": Config.statics.PRIVATE_CHAT,
                    "content": {
                        "name": Storage.LocalStorage().getItem("name"),
                        "email": Storage.LocalStorage().getItem("email"),
                        "avatar": Storage.LocalStorage().getItem("avatar"),
                        "user_id": Storage.LocalStorage().getItem("id"),
                        "to_user_id": Storage.LocalStorage().getItem("to_user_id"),
                        "message": this.state.content,
                    }
                };
                data = JSON.stringify(data);
                webSocket.send(data);
                this.setState({content: ""});
            }
        }
    }

    //显示聊天记录
    showChatList(to_user_id) {
        this.setState({to_user_id: to_user_id});
        Storage.LocalStorage().setItem("to_user_id", to_user_id);
        //显示聊天记录哦
        let form1 = {"user_id": Storage.LocalStorage().getItem("id") + "", "to_user_id": to_user_id + ""};
        this.props.indexAction.PrivateChatList(form1).payload.then((response) => {
            this.setState({dataSource: response.result.data});
        });
    }

    //绑定信息
    handleChange(e) {
        this.setState({content: e.target.value});
    }

    render() {
        return (
            <div className="margin-layout">
                <div className="box no-padding">
                    {/*左侧边栏*/}
                    <div className="side_bar_left">
                        <ul>
                            <li className="li_head">
                                好友列表
                            </li>
                            {
                                this.state.friendList.map(friend =>
                                    <li onClick={this.showChatList.bind(this, friend.id)} key={friend.id}>
                                        <img className="head_img_square"
                                             src={friend.avatar}/>
                                        <span>{friend.name}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    {/*聊天记录列表*/}
                    <div className="chat_list">
                        <div className="chat_list_content">
                            <div className="chat_head">
                                <div className="chat_head_title"><h3>私聊室</h3></div>
                            </div>
                            <ChatListPrivate chat_list={this.state.dataSource}></ChatListPrivate>
                        </div>
                        <div className="chat_send">
                            <div className="chat_send_head">
                                <span><i className="fa fa-smile-o padding_left_5 font_15"></i></span>
                                <span><i className="fa fa-folder-open padding_left_10 font_15"></i></span>
                            </div>
                            <div className="chat_send_content">
                                       <textarea
                                           onKeyDown={this.send.bind(this)}
                                           value={this.state.content}
                                           onChange={this.handleChange.bind(this)}
                                           className="my_textarea resize-no"
                                           placeholder="畅言吧..."
                                           rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(PrivateChat);