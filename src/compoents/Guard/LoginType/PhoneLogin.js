/**
 * Created by LaravelChen on 2018/1/10.
 */
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as IndexAction from '../../../actions/IndexActions';
import Storage from '../../../core/localStorage';

const FormItem = Form.Item;

class PhoneLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: true, count: 60, phone: ''};
    }

    componentDidMount() {

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let form = {"phone": values['phone'], "password": values['password'], "type": "phone"};
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
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form margin-top-25">
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入你的手机号!'}],
                    })(
                        <Input size='large' prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="手机号"/>
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
                    <Button size='large' type="primary" htmlType="submit" className="login-form-button margin-top-15">
                        登录
                    </Button>
                    <Link to="/register" className="login_register" href="">注册账户</Link>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(PhoneLogin);

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(WrappedNormalLoginForm);