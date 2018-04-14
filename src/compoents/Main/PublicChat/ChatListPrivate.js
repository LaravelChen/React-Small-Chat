import React, {Component} from 'react';
import Myself from './ChatSingle/Myself';
import Storage from "../../../core/localStorage";
import OtherNoName from "./ChatSingle/OtherNoName";

class ChatListPrivate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="chat_list_content" className="chat_list_content_list">
                {
                    this.props.chat_list.map(chat => {
                            if (Storage.LocalStorage().getItem("id") === chat.content.user_id+"") {
                                return <Myself key={chat.content.fd}  chat={chat}></Myself>
                            }else {
                                return <OtherNoName key={chat.content.fd} chat={chat}></OtherNoName>
                            }
                        }
                    )
                }

            </div>
        );
    }
}

export default ChatListPrivate;