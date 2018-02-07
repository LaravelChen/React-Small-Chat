/**
 * Created by LaravelChen on 2018/1/11.
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {Link} from 'react-router';
const FormItem = Form.Item;
class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: true, count: 60};
    }

    componentDidMount() {

    }

    //发送验证码
    sendCode() {
        this.setState({liked: false});
        this.codeTime();
    }

    //发送验证码的倒计时
    codeTime() {
        this.timer = setInterval(() => {
            let count = this.state.count;
            if (--count < 1) {
                this.setState({
                    liked: true
                });
                count = 60;
                clearInterval(this.timer);
            }
            this.setState({
                count: count
            });
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <section className="section padding-section" id="components-form-demo-normal-login">
                <div className="container padding-20">
                    <Form onSubmit={this.handleSubmit} className="login-form margin-top-25 margin_auto">
                        <h1 className="title is-5 font_weight_500 font_grey">重置密码</h1>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入你的密码!'}],
                                })(
                                    <Input size='large' prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder="Password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: '请输入你的手机号!'}],
                                })(
                                    <Input size='large'
                                           prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="手机号"/>
                                )}
                            </FormItem>
                            <FormItem className="ant-row">
                                <div className="ant-col-16">
                                    {getFieldDecorator('eamil', {
                                        rules: [{required: true, message: '请输入你的验证码!'}],
                                    })(
                                        <Input size='large'
                                               prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="验证码"/>
                                    )}
                                </div>
                                <div className="ant-col-8 padding-4">
                                    <Button className="width-100" disabled={!this.state.liked}
                                            onClick={this.sendCode.bind(this)}
                                            size="large"
                                            type="default">
                                        {this.state.liked ? '获取验证码' : this.state.count + ' s'}
                                    </Button>
                                </div>


                            </FormItem>
                            <FormItem>
                                <Button size='large' type="primary" htmlType="submit"
                                        className="login-form-button margin-top-15">
                                    重置密码
                                </Button>
                                <Link to="/login" className="login_register" href="">使用已有账户登录</Link>
                            </FormItem>
                    </Form>
                </div>
            </section>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(ResetPass);
export default WrappedNormalLoginForm;