import React, {Component} from 'react';

class LeftBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="side_bar_left">
                <ul>
                    <li className="li_head">
                        在线用户
                    </li>
                    {
                        this.props.chat_user_list.map(chat =>
                            < li key={chat.content.email}>
                                <img className="head_img_square"
                                     src={chat.content.avatar}/>
                                <span>{chat.content.name}</span>
                            </li>
                        )
                    }

                </ul>
            </div>
        );
    }
}

export default LeftBar;