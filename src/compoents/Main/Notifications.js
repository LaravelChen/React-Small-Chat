/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {Pagination} from 'antd';
import Storage from '../../core/localStorage';
import * as IndexAction from '../../actions/IndexActions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import $ from 'jquery';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {dataSource: [], total: 1, current: 1};
    }

    componentDidMount() {
        this.setData(1, 6);
    }

    setPage(page) {
        this.setData(page, 6);
    }

    setData(page, limit) {
        let form = {"to_user_id": Storage.LocalStorage().getItem("id"), "paging": {"page": page, "limit": limit}};
        this.props.indexAction.getNotificationList(form).payload.then((response) => {
            if (response !== false) {
                this.setState({
                    dataSource: response.result.data,
                    total: response.result.total,
                    current: response.result.current_page
                });
            }
        });
    }

    //接受
    receive(user_id, id) {
        let form = {"user_id": user_id, "to_user_id": Storage.LocalStorage().getItem("id")};
        $(".li" + id).hide();
        $(".a" + id).html("已接受");
        $(".a" + id).attr("class", "font_grey");
        this.props.indexAction.receivce(form).payload.then((response) => {
            if (response !== false) {
                $(".li" + id).hide();
                $(".a" + id).html("已拒绝");
                $(".a" + id).attr("class", "font-grey");
            }
        });
    }

    //拒绝
    refuse(user_id, id) {
        let form = {"user_id": user_id, "to_user_id": Storage.LocalStorage().getItem("id")};
        this.props.indexAction.refuse(form).payload.then((response) => {
            if (response !== false) {
                $(".li" + id).hide();
                $(".a" + id).html("已拒绝");
                $(".a" + id).attr("class", "font-grey");
            }
        });
    }

    render() {
        return (
            <div className="margin-layout">
                <div className="box no-padding padding-20-important">
                    <div className="ant-list ant-list-split ant-list-bordered">
                        <div className="ant-list-header">
                            <div>消息列表</div>
                        </div>
                        <div>
                            <div className="ant-spin-nested-loading">
                                <div className="ant-spin-container">
                                    {
                                        this.state.dataSource.map(notifiaction =>
                                            <div key={notifiaction.id} className="ant-list-item">
                                                <div className="ant-list-item-meta">
                                                    <div className="ant-list-item-meta-avatar"><span
                                                        className="ant-avatar ant-avatar-circle ant-avatar-image"><img
                                                        src={notifiaction.avatar}/></span>
                                                    </div>
                                                    <div className="ant-list-item-meta-content"><h4
                                                        className="ant-list-item-meta-title"><a
                                                        href="#">{notifiaction.name}</a>
                                                    </h4>
                                                        <div className="ant-list-item-meta-description">
                                                            {notifiaction.message}
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    notifiaction.action === 'DEFAULT' ?
                                                        <ul className="ant-list-item-action">
                                                            <li className={"li" + notifiaction.id}
                                                                onClick={this.receive.bind(this, notifiaction.user_id, notifiaction.id)}>
                                                                <a>接受</a><em
                                                                className='ant-list-item-action-split'></em></li>
                                                            <li onClick={this.refuse.bind(this, notifiaction.user_id, notifiaction.id)}>
                                                                <a className={"a" + notifiaction.id}>拒绝</a></li>
                                                        </ul>
                                                        : <ul className="ant-list-item-action">
                                                            <li><span
                                                                className="font_grey">{notifiaction.action_name}</span></li>
                                                        </ul>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination hideOnSinglePage defaultPageSize={6} onChange={this.setPage.bind(this)}
                                defaultCurrent={1} total={this.state.total}/>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(Notifications);