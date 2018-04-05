import React, {Component} from 'react';
import OtherByName from './ChatSingle/OtherByName';
import Myself from './ChatSingle/Myself';
import Storage from "../../../core/localStorage";

class ChatList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="chat_list_content" className="chat_list_content_list">
                {
                    this.props.chat_list.map(chat => {
                            if (Storage.LocalStorage().getItem("id") === chat.content.user_id+"") {
                                return <Myself chat={chat}></Myself>
                            }else {
                                return <OtherByName chat={chat}></OtherByName>
                            }
                        }
                    )
                }

            </div>
        );
    }
}

export default ChatList;