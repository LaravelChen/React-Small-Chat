/**
 * Created by LaravelChen on 2018/1/22.
 */
import types from '../types/Types';
import Call from '../core/call';

//设置全局的websocket
export const setWebMessage = function (data) {
    return {
        type: types.WEB_MESSAGE,
        webMessage: data,
    }
}

//登录
export const Login = function (data) {
    var api = '/UserCenter/UserCenterController/Login';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//注册
export const Register = function (data) {
    var api = '/UserCenter/UserCenterController/Register';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//发送验证码
export const SendCode = function (data) {
    var api = '/UserCenter/UserCenterController/SendCode';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//退出登录
export const Logout = function (data) {
    var api = '/UserCenter/UserCenterController/Logout';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//群聊的记录
export const ChatList = function (data) {
    var api = '/UserCenter/UserChatController/ChatList';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}
//发送添加好友信息
export const sendAddUserNotification = function (data) {
    var api = '/UserCenter/NotificationController/sendNotification';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//获取通知数
export const getNotificationCount = function (data) {
    var api = '/UserCenter/NotificationController/getNotificationCount';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}