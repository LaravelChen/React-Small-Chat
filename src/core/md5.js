module.exports = {
    constructor: function() {
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad  = "";/* base-64 pad character. "=" for strict RFC compliance   */
        this.chrsz   = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
    },
    hex_md5:function(s){
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad  = "";/* base-64 pad character. "=" for strict RFC compliance   */
        this.chrsz   = 8;
        var me = this;
        return me.binl2hex(me.core_md5(me.str2binl(s), s.length * me.chrsz));
    },
    b64_md5:function(s){
        var me = this;
        return me.binl2b64(me.core_md5(me.str2binl(s), s.length * me.chrsz));
    },
    str_md5:function (s){
        alert(s)
        var me = this;
        var r = me.binl2str(me.core_md5(me.str2binl(s), s.length * me.chrsz))
        alert("sss="+r)
        return r;
    },
    hex_hmac_md5:function (key, data) {
        var me = this;
        return me.binl2hex(me.core_hmac_md5(key, data));
    },
    b64_hmac_md5:function (key, data) {
        var me = this;
        return me.binl2b64(me.core_hmac_md5(key, data));
    },
    str_hmac_md5:function (key, data) {
        var me = this;
        return me.binl2str(me.core_hmac_md5(key, data));
    },

    core_md5:function (x, len){
        var me = this;
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = me.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = me.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = me.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = me.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = me.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = me.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = me.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = me.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = me.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = me.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = me.md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = me.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = me.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = me.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = me.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = me.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = me.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = me.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = me.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = me.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = me.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = me.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = me.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = me.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = me.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = me.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = me.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = me.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = me.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = me.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = me.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = me.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = me.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = me.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = me.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = me.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = me.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = me.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = me.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = me.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = me.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = me.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = me.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = me.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = me.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = me.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = me.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = me.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = me.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = me.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = me.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = me.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = me.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = me.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = me.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = me.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = me.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = me.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = me.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = me.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = me.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = me.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = me.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = me.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = me.safe_add(a, olda);
            b = me.safe_add(b, oldb);
            c = me.safe_add(c, oldc);
            d = me.safe_add(d, oldd);
        }
        return Array(a, b, c, d);

    },

    md5_cmn:function(q, a, b, x, s, t){
        var me = this;
        return me.safe_add(me.bit_rol(me.safe_add(me.safe_add(a, q), me.safe_add(x, t)), s),b);
    },
    md5_ff:function (a, b, c, d, x, s, t)
    {
        var me = this;
        return me.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    },
    md5_gg:function (a, b, c, d, x, s, t)
    {
        var me = this;
        return me.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    },
    md5_hh:function (a, b, c, d, x, s, t)
    {
        var me = this;
        return me.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    },
    md5_ii:function (a, b, c, d, x, s, t)
    {
        var me = this;
        return me.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    },

    core_hmac_md5:function (key, data)
    {
        var me = this;
        var bkey = me.str2binl(key);
        if(bkey.length > 16) bkey = me.core_md5(bkey, key.length * me.chrsz);

        var ipad = Array(16), opad = Array(16);
        for(var i = 0; i < 16; i++)
        {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = me.core_md5(ipad.concat(me.str2binl(data)), 512 + data.length * me.chrsz);
        return me.core_md5(opad.concat(hash), 512 + 128);
    },

    safe_add:function (x, y)
    {
        // var me = this;
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    },

    bit_rol:function (num, cnt)
    {
        // var me = this;
        return (num << cnt) | (num >>> (32 - cnt));
    },

    str2binl:function (str)
    {
        var me = this;
        var bin = Array();
        var mask = (1 << me.chrsz) - 1;
        for(var i = 0; i < str.length * me.chrsz; i += me.chrsz)
            bin[i>>5] |= (str.charCodeAt(i / me.chrsz) & mask) << (i%32);
        return bin;
    },

    binl2str:function (bin)
    {
        var me = this;
        var str = "";
        var mask = (1 << me.chrsz) - 1;
        for(var i = 0; i < bin.length * 32; i += me.chrsz)
            str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
        return str;
    },

    binl2hex:function (binarray)
    {
        var me = this;
        var hex_tab = me.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++)
        {
            str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
        }
        return str;
    },

    binl2b64:function (binarray)
    {
        var me = this;
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i += 3)
        {
            var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
            for(var j = 0; j < 4; j++)
            {
                if(i * 8 + j * 6 > binarray.length * 32) str += me.b64pad;
                else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
            }
        }
        return str;
    }
}