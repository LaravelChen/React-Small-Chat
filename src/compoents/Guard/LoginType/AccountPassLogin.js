/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {Link} from 'react-router';
import Storage from "../../../core/localStorage";
import {connect} from "react-redux";
import * as IndexAction from "../../../actions/IndexActions";
import {bindActionCreators} from "redux";

const FormItem = Form.Item;

class AccountPassLogin extends Component {

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let form = {"email": values['email'], "password": values['password'], "type": "account"};
                this.props.indexAction.Login(form).payload.then((response) => {
                    Storage.LocalStorage().setItem("token", response.result.token);
                    Storage.LocalStorage().setItem("name", response.result.name);
                    Storage.LocalStorage().setItem("id", response.result.id);
                    Storage.LocalStorage().setItem("email", response.result.email);
                    Storage.LocalStorage().setItem("phone", response.result.phone);
                    Storage.LocalStorage().setItem("avatar",response.result.avatar);
                    Storage.LocalStorage().setItem("isLogin", true);
                    window.location.href="/";
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form margin-top-25">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入你的邮箱!'}],
                    })(
                        <Input size='large' prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="Email"/>
                    )}
                </FormItem>
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>自动登录</Checkbox>
                    )}
                    <Link to="/resetPass" className="login-form-forgot">忘记密码</Link>
                    <Button size='large' type="primary" htmlType="submit" className="margin-top-15 login-form-button">
                        登录
                    </Button>
                    <Link to="/register" className="login_register" href="">注册账户</Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(AccountPassLogin);

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(WrappedNormalLoginForm);