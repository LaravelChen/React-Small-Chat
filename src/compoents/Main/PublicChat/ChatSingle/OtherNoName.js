/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import AddUser from './../AddUser';
class OtherNoName extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article key={this.props.chat.content.fd} className="media">
                <div className="media-left">
                    <img  className="chat_content_avatar"
                         src={this.props.chat.content.avatar}/>
                </div>
                <div className="media-content">
                    <div className="content">
                        <div className="realtive">
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

export default OtherNoName;