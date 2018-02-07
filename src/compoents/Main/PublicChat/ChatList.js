import React, {Component} from 'react';

class ChatList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="chat_list_content" className="chat_list_content_list">
                {
                    this.props.chat_list.map(chat =>
                        <article key={chat.content.fd} className="media">
                            <div className="media-left">
                                <img className="chat_content_avatar"
                                     src={chat.content.avatar}/>
                            </div>
                            <div className="media-content">
                                <div className="content">
                                    <strong className="chat_name">{chat.content.name}</strong>
                                    <div className="realtive margin-top-8">
                                        <div className="ant-popover ant-popover-placement-right">
                                            <div className="ant-popover-content">
                                                <div className="ant-popover-arrow"></div>
                                                <div className="ant-popover-inner">
                                                    <div>
                                                        <div className="ant-popover-inner-content">
                                                            <div>{chat.content.message}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )
                }
            </div>
        );
    }
}

export default ChatList;