var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), t = require("../../plugins/es6-promise.js");

module.exports = {
    getOrder: function(n) {
        return new t(function(t, r) {
            e.default.wxUserRequest("/order/getOrder", {
                data: n
            }, t, r);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    },
    OrderCancel: function(n) {
        return new t(function(t, r) {
            e.default.wxUserRequest("/order/OrderCancel", {
                data: n
            }, t, r);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    },
    prePayOrderById: function(n) {
        return new t(function(t, r) {
            e.default.wxUserRequest("/order/wechatJsPay", {
                data: n,
                method: "post"
            }, t, r);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    },
    payOrderSeed: function(n) {
        return new t(function(t, r) {
            e.default.wxUserRequest("/Message/payOrderSeed", {
                data: n,
                method: "post"
            }, t, r);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};