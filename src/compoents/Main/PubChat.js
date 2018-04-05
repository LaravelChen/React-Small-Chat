/**
 * Created by LaravelChen on 2018/1/9.
 */
import React, {Component} from 'react';
import Config from '../../core/config';
import Storage from '../../core/localStorage';
import {bindActionCreators} from "redux";
import * as IndexAction from "../../actions/IndexActions";
import $ from 'jquery';
import {connect} from "react-redux";
import LeftBar from './PublicChat/LfetBar';
import ChatList from './PublicChat/ChatList';

const webSocket = new WebSocket(Config.statics.WEBSOCKET_ADDRESS);

class PubChat extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: true, count: 60, dataSource: [], content: "", userList: []};
    }

    componentDidMount() {
        //调用群聊的聊天记录
        let form = {"paging": {"page": 1, "limit": 20}};
        this.props.indexAction.ChatList(form).payload.then((response) => {
            this.setState({dataSource: response.result.data}, () => {
                $("#chat_list_content").scrollTop($("#chat_list_content")[0].scrollHeight);
            });
        });

        //webSocket的初始化
        webSocket.onopen = function () {
            this.connectSuccess();
        }.bind(this);
        //接受信息
        webSocket.onmessage = function (evt) {
            let data = JSON.parse(evt.data);
            if (data.action === Config.statics.PUBLIC_CHAT) {
                let arr = this.state.dataSource;
                console.log(data);
                arr.push(data);
                this.setState({dataSource: arr}, () => {
                    $("#chat_list_content").scrollTop($("#chat_list_content")[0].scrollHeight);
                });
            }

            if (data.action === Config.statics.PUBLIC_USER_LIST) {
                this.setState({userList: data.content});
            }
        }.bind(this);
        //关闭连接
        webSocket.onclose = function () {
            console.log("close");
        }.bind(this);
    }

    //连接成功
    connectSuccess() {
        if (Storage.LocalStorage().getItem("email") !== null) {
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
        }
    };

    //发送文本信息
    send(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            if (this.state.content !== "") {
                let data = {
                    "action": Config.statics.PUBLIC_CHAT,
                    "content": {
                        "name": Storage.LocalStorage().getItem("name"),
                        "email": Storage.LocalStorage().getItem("email"),
                        "avatar": Storage.LocalStorage().getItem("avatar"),
                        "user_id": Storage.LocalStorage().getItem("id"),
                        "message": this.state.content,
                    }
                };
                data = JSON.stringify(data);
                webSocket.send(data);
                this.setState({content: ""});
            }
        }
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
                    <LeftBar chat_user_list={this.state.userList}></LeftBar>

                    {/*聊天记录列表*/}
                    <div className="chat_list">
                        <div className="chat_list_content">
                            <div className="chat_head">
                                <div className="chat_head_title"><h3>畅聊室</h3></div>
                            </div>
                            <ChatList chat_list={this.state.dataSource}></ChatList>
                        </div>
                        <div className="chat_send">
                            <div className="chat_send_head">
                                <span><i className="fa fa-smile-o padding_left_5 font_15"></i></span>
                                <span><i className="fa fa-folder-open padding_left_10 font_15"></i></span>
                            </div>
                            <div className="chat_send_content">
                                       <textarea onKeyDown={this.send.bind(this)}
                                                 value={this.state.content}
                                                 className="my_textarea resize-no"
                                                 onChange={this.handleChange.bind(this)}
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
}))(PubChat);