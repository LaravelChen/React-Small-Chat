module.exports = {
    positiveInteger:function(num){
        var reg = /^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$/;
        if(reg.test(num)){
            return true
        }else{
            return false
        }
    },
    isRelpace:function(str){
        if(str){
            var reg = /^(\d{4})\d+(\d{4})$/;
            return str.replace(reg, "$1****$2");
        }
    },
    isAndroid:function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid;
    },
    subStr:function(str){
        if(str){
            return str.substr(str.length-4,str);
        }
    },
    isEmpty:function(object){
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;    
    },
    updateTitle:function(t){
        document.title = t;
          var i = document.createElement('iframe');
          i.src = '/assets/images/favicon.ico';
          i.style.display = 'none';
          i.onload = function() {
            setTimeout(function(){
              i.remove();
            }, 9)
          }
        document.body.appendChild(i);
    },
    isNumber:function(num){
        var reg = /^[0-9]*$/;
        if(reg.test(num)){
            return true
        }else{
            return false
        }
    },
    isPhone:function(value){
        var reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        if(reg.test(value)){
            return true
        }else{
            return false
        }
    },
    chinese_char : function(val, field) {
        return /[\u4e00-\u9fa5]/.test(val);
    },
    mobilephone:function(val,field)
    {
        try
        {
            if(/(^0?[1][0-9][0-9]{9}$)/.test(val))
                return true;
            return false;
        }
        catch(e)
        {
            return false;
        }
    },
    toQueryString:function(object,recursive){
        var that = this,
            paramObjects = [],
            params = [],
            i, j, ln, paramObject, value;
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                paramObjects = paramObjects.concat(that.toQueryObjects(i, object[i], recursive));
            }
        }

        for (j = 0, ln = paramObjects.length; j < ln; j++) {
            paramObject = paramObjects[j];
            value = paramObject.value;
            if (that.isEmpty(value)) {
                value = '';
            } else if (value instanceof Date) {
                value = value.toLocaleString();
            }

            params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
        }
        return params.join('&');
    },
    toQueryObjects:function(name, value, recursive){

        var self = this,
            objects = [],
            i, ln;
        if (value instanceof Array) {
            for (i = 0, ln = value.length; i < ln; i++) {
                if (recursive) {
                    objects = objects.concat(self.toQueryObjects(name + '[' + i + ']', value[i], true));
                }
                else {
                    objects.push({
                        name: name,
                        value: value[i]
                    });
                }
            }
        }
        else if (value instanceof Object) {
            for (i in value) {
                if (value.hasOwnProperty(i)) {
                    if (recursive) {
                        objects = objects.concat(self.toQueryObjects(name + '[' + i + ']', value[i], true));
                    }
                    else {
                        objects.push({
                            name: name,
                            value: value[i]
                        });
                    }
                }
            }
        }
        else {
            objects.push({
                name: name,
                value: value
            });
        }

        return objects;
    },
    isArray:function(obj){
        return obj instanceof Array
    },
    isObject:function(obj){
        return obj instanceof Object
    },
    id_card : function(code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            //tip = "身份证号格式错误";
            pass = false;
        }

        else if(!city[code.substr(0,2)]){
            //tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    //tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) {
            return false
        };
        return true;
    },
}