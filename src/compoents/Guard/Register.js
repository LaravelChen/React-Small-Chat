/**
 * Created by LaravelChen on 2018/1/9.
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as IndexAction from '../../actions/IndexActions';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';


const FormItem = Form.Item;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: true, count: 60};
    }

    componentDidMount() {
    }

    //发送验证码
    sendCode() {
        this.props.form.validateFields(["phone"], (err, values) => {
            if (!err) {
                this.setState({liked: false});
                this.codeTime();
                //发送验证码
                this.props.indexAction.SendCode({
                    "phone": values['phone'],
                    "type": "register"
                }).payload.then((response) => {
                    if (response !== false) {
                        console.log(response);
                    }
                });
            }
        });
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

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let form = {
                    "phone": values['phone'],
                    "password": values['password'],
                    "name": values['name'],
                    "code": values['code'],
                    "email": values['email'],
                };
                this.props.indexAction.Register(form).payload.then((response) => {
                    if (response !== false) {
                        console.log(response);
                        message.success("注册成功，请使用该账号登录!");
                        browserHistory.push("/login");
                    }
                });
            }
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <section className="section padding-section" id="components-form-demo-normal-login">
                <div className="container padding-20">
                    <Form onSubmit={this.handleSubmit} className="login-form margin-top-25 margin_auto">
                        <h1 className="title is-5 font_weight_500 font_grey">注册</h1>
                        <FormItem>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请输入你的用户名!'}],
                            })(
                                <Input size='large' prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{required: true, message: '请输入你的邮箱!'}],
                            })(
                                <Input size='large' prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="邮箱"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入你的密码!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input size="large" type="password" placeholder="密码"
                                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认你的密码!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input size="large" type="password"
                                       prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       onBlur={this.handleConfirmBlur} placeholder="确认密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('phone', {
                                rules: [{required: true, message: '请输入你的手机号!'}],
                            })(
                                <Input size='large' prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="手机号"/>
                            )}
                        </FormItem>
                        <FormItem className="ant-row">
                            <div className="ant-col-16">
                                {getFieldDecorator('code', {
                                    rules: [{required: true, message: '请输入你的验证码!'}],
                                })(
                                    <Input size='large' prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
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
                                注册
                            </Button>
                            <Link to="/login" className="login_register" href="">使用已有账号登录</Link>
                        </FormItem>
                    </Form>
                </div>
            </section>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Register);

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(WrappedNormalLoginForm);