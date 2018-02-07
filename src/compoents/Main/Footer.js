/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
class Footer extends Component {
    render() {
        return (
            <section className="section">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="column is-2 is-offset-4">
                            <p className="title is-6">QQ群</p>
                            <img className="image-150" src="https://photo.laravelchen.cn/qqqqqun.png" alt="qq"/>
                        </div>
                        <div className="column is-2 is-offset-1">
                            <p className="title is-6">微信公众号</p>
                            <img className="image-150" src="https://photo.laravelchen.cn/weixin.jpg"
                                 alt="weixin"/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Footer;