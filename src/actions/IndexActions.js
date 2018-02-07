/**
 * Created by LaravelChen on 2018/1/22.
 */
import types from '../types/Types';
import Call from '../core/call';

export const Login = function (data) {
    var api = '/UserCenter/UserCenterController/Login';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

export const Register = function (data) {
    var api = '/UserCenter/UserCenterController/Register';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

export const SendCode = function (data) {
    var api = '/UserCenter/UserCenterController/SendCode';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

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

export const setIsLogin = function (data) {
    return {
        type: types.IS_LOGIN,
        isLogin: data,
    }
}