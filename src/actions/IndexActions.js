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

//上传图片
export const Avatar = function (data) {
    var api = '/UserCenter/UserCenterController/ShowPostFile';
    return {
        type: types.REQUEST_WAY,
        payload: Call.uploadImage(api, data)
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

//获取好友列表
export const FriendList = function (data) {
    var api = '/UserCenter/FriendController/getFriendList';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//获取好友详细信息
export const FriendInfo = function (data) {
    var api = '/UserCenter/FriendController/getFriendInfo';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//获取私聊的列表记录
export const PrivateChatList = function (data) {
    var api = '/UserCenter/FriendController/getPrivateChatList';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//获取私聊的列表记录
export const getNotificationList = function (data) {
    var api = '/UserCenter/NotificationController/getNotificationList';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//接受加好友请求
export const receivce = function (data) {
    var api = '/UserCenter/FriendController/receivce';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}

//拒绝加好友请求
export const refuse = function (data) {
    var api = '/UserCenter/FriendController/refuse';
    return {
        type: types.REQUEST_WAY,
        payload: Call.callApi(api, data)
    }
}
