/**
 * Created by LaravelChen on 2018/1/9.
 */
import React, {Component} from 'react';
import {Tabs} from 'antd';
import AccountPassLogin from './LoginType/AccountPassLogin';
import PhoneLogin from './LoginType/PhoneLogin';

const TabPane = Tabs.TabPane;

class Login extends Component {
    callback(key) {
        console.log(key);
    }

    render() {
        return (
            <section className="section padding-section" id="components-form-demo-normal-login">
                <div className="container has-text-centered padding-20">
                    <Tabs animated={false} defaultActiveKey="1" size='large' onChange={this.callback.bind(this)}>
                        <TabPane tab="账号密码登录" key="1">
                            <div className="width-368">
                                <AccountPassLogin></AccountPassLogin>
                            </div>
                        </TabPane>
                        <TabPane tab="手机登录" key="2">
                            <div className="width-368">
                                <PhoneLogin></PhoneLogin>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </section>
        );
    }
}

export default Login;