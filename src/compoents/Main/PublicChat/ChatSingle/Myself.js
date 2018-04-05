/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
class Myself extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <article key={this.props.chat.content.fd} className="media media_myself">
                <div className="media-content text-right">
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
                <div className="media-right">
                    <img className="chat_content_avatar"
                         src={this.props.chat.content.avatar}/>
                </div>
            </article>
        );
    }
}

export default Myself;