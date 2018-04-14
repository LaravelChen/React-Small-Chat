/**
 * Created by LaravelChen on 2018/1/22.
 */
import $ from 'jquery'
import Config from '../core/config';
import Md5 from '../core/md5';
import Storage from '../core/localStorage';
import {message} from 'antd';
import {browserHistory} from 'react-router';

const Call = {
    callApi: function (api, data, token = "") {
        let apiInfo = Config.statics.APIADDRESS + api;

        //获取token
        let new_token = Storage.LocalStorage().getItem("token");
        token = new_token === null ? "" : new_token;
        let callData = this.getCallData(api, data, token);

        //发送ajax请求
        return $.ajax({
            url: apiInfo,
            method: 'POST',
            data: callData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
        }).then(function (response) {
            if (response.code !== Config.code.SUCCESS) {
                if (response.code === Config.code.ERROR_TOKEN) {
                    browserHistory.push("/login");
                    Storage.LocalStorage().clear();
                    message.error("登录状态失效,请重新登录!");
                    return false;
                } else {
                    message.error(response.message);
                    console.log(response);
                    return false;
                }
            }
            return response;
        }).catch(function (error) {
            message.error("请求错误!");
            console.log(error);
            return false;
        })
    },
    uploadImage: function (api, data, token = "") {
        //获取token
        let new_token = Storage.LocalStorage().getItem("token");
        token = new_token === null ? "" : new_token;

        let apiInfo = Config.statics.APIADDRESS + api;
        let callData = this.getCallData(api, data, token);
        return $.ajax({
            url: apiInfo,
            method: 'POST',
            data: callData,
            contentType: false,
            processData: false,
        }).then(function (response) {
            if (response.code !== Config.code.SUCCESS) {
                if (response.code === Config.code.ERROR_TOKEN) {
                    window.location.href = "/login";
                    message.error("登录状态失效,请重新登录!");
                } else {
                    message.error(response.message);
                    console.log(response);
                    return false;
                }
            }
            return response;
        }).catch(function (error) {
            message.error("请求错误!");
            console.log(error.responseText);
        })
    },
    getCallData: function (apiInfo, data, token) {
        let string = "";
        string += apiInfo;
        string += Config.statics.CLIENT_VERSION;
        string += Config.statics.SALT;

        var hashHandler = Md5;

        // 计算 md5 (api + version + data + salt)
        //var hashCode = hashHandler.hex_md5(encodeURI(string));

        var hashCode = hashHandler.hex_md5(string);
        var resObj = {
            "data": data,
            "token": token,
            "sign": hashCode
        }
        return resObj;
    }
}
export default Call;
