function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Base = void 0;

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var a = r[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(r, t, a) {
        return t && e(r.prototype, t), a && e(r, a), r;
    };
}(), t = require("config.js"), a = (require("token.js"), getApp()), o = function() {
    function o() {
        e(this, o), this.baseRequestUrl = t.Config.restUrl;
    }
    return r(o, [ {
        key: "request",
        value: function(e) {
            var r = e.url, t = this;
            a.util.request({
                url: r,
                data: e.data,
                method: e.type,
                showLoading: !1,
                header: e.header,
                success: function(t) {
                    0 == t.data.errno ? 1 == t.data.data.errcode ? (a.util.message("注意:" + t.data.data.msg, "", "error"), 
                    console.log(r), console.log(t)) : e.sCallback && e.sCallback(t.data.data) : (a.util.message("系统错误:" + t.data, "", "error"), 
                    console.log("ddw:" + t));
                },
                fail: function(e) {
                    t._processError("报错" + e);
                }
            });
        }
    }, {
        key: "_processError",
        value: function(e) {
            console.log(e);
        }
    }, {
        key: "getDataSet",
        value: function(e, r) {
            return e.currentTarget.dataset[r];
        }
    } ]), o;
}();

exports.Base = o;