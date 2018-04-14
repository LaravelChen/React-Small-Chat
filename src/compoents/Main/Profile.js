/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as IndexAction from "../../actions/IndexActions";
import {Collapse} from 'antd';

const Panel = Collapse.Panel;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {avatar: "", file: ""};
    }

    render() {
        return (
            <div className="margin-layout">
                <div className="box no-padding padding-20-important">
                    <h1>个人信息</h1>
                    <div className="chat_list" style={{width:"100%"}}>
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
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(Profile);