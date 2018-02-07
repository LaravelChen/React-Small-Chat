const Storage = {
    LocalStorage: function () {
        if (!window.localStorage) {
            alert("浏览器支持localstorage");
            return false;
        } else {
            var storage = window.localStorage;
            return storage;
        }
    },
    isLogin: function () {
        let storage = this.LocalStorage();
        let isLogin = storage.getItem("isLogin");
        return isLogin === null ? false : isLogin;
    }
}

export default Storage;