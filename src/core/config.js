/**
 * Created by LaravelChen on 2018/1/24.
 */
export default {
    statics: {
        //api地址
        APIADDRESS: "http://127.0.0.1:9501",
        //盐值
        SALT: "UmVwb3J0U2lnblZhbGlkYXRpb24=",
        //版本号
        CLIENT_VERSION: "v1.0.0",
        //websocket地址
        WEBSOCKET_ADDRESS: "ws://127.0.0.1:9501",
        //聊天
        PUBLIC_CHAT: "PUBLIC",
        PUBLIC_USER_LIST: "PUBLIC_USER_LIST",
        PUBLIC_USER_CLOSE: "PUBLIC_USER_CLOSE",
        ADD_USER_NOTIFICATION: "ADD_USER_NOTIFICATION",
    },
    code: {
        SUCCESS: 200,
        ERROR_TOKEN: 1000,
    }
}