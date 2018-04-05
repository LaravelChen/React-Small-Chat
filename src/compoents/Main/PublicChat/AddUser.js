import React, {Component} from 'react';
import {Modal, Input} from 'antd';
import Storage from '../../../core/localStorage';
import {bindActionCreators} from "redux";
import * as IndexAction from "../../../actions/IndexActions";
import {connect} from "react-redux";
import Config from '../../../core/config';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            add_show: false,
            addUserInfo: "我是" + Storage.LocalStorage().getItem("name") + ",请求加您为好友!"
        };
    }

    showAdd() {
        if (this.props.user_id != Storage.LocalStorage().getItem("id")){
            this.setState({show: !this.state.show});
        }
    }

    sendAdd() {
        this.setState({add_show: true, show: !this.state.show});
    }

    cancle() {
        this.setState({add_show: false});
    }

    //发送邀请请求
    sendAddInfo() {
        this.setState({add_show: false});
        let form = {
            "email": this.props.email,
            "user_id": Storage.LocalStorage().getItem("id"),
            "to_user_id": this.props.user_id,
            "type": 'ADDUSER',
            "message": this.state.addUserInfo,
        };
        this.props.indexAction.sendAddUserNotification(form).payload.then((response) => {
            console.log(response);
        });
    }

    onChangeUserAdd(e) {
        this.setState({addUserInfo: e.target.value});
    }

    render() {
        let addUser = null;
        if (this.state.show === true) {
            addUser = (
                <div className="box user_add">
                    <div className="media padding-left-30">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img className="head_img_square" src={this.props.avatar}
                                     alt="Placeholder image"/>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-5 padding-top-12">{this.props.name}</p>
                        </div>
                    </div>
                    <div className="user_add_font"><i onClick={this.sendAdd.bind(this)} className="fa fa-user-plus"></i>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <img onClick={this.showAdd.bind(this)} className="chat_content_avatar"
                     src={this.props.avatar}/>
                {
                    addUser
                }
                <Modal
                    title="朋友验证"
                    visible={this.state.add_show}
                    onOk={this.sendAddInfo.bind(this)}
                    onCancel={this.cancle.bind(this)}
                >
                    <p className="title is-6">向 <span className="color_orange">{this.props.name}</span> 发送好友请求</p>
                    <Input
                        value={this.state.addUserInfo}
                        onChange={this.onChangeUserAdd.bind(this)}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(AddUser);