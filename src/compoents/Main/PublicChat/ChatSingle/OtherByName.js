/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import AddUser from './../AddUser';
class OtherByName extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article key={this.props.chat.content.fd} className="media">
                <div className="media-left">
                    <AddUser
                        user_id={this.props.chat.content.user_id}
                        name={this.props.chat.content.name}
                        email={this.props.chat.content.email}
                        avatar={this.props.chat.content.avatar}></AddUser>
                </div>
                <div className="media-content">
                    <div className="content">
                        <strong className="chat_name">{this.props.chat.content.name}</strong>
                        <div className="realtive margin-top-8">
                            <div className="ant-popover ant-popover-placement-right">
                                <div className="ant-popover-content">
                                    <div className="ant-popover-arrow"></div>
                                    <div className="ant-popover-inner">
                                        <div>
                                            <div className="ant-popover-inner-content">
                                                <div>{this.props.chat.content.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default OtherByName;