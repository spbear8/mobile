var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), t = require("../../plugins/es6-promise.js");

module.exports = {
    getOrders: function(r) {
        return new t(function(t, u) {
            e.default.wxUserRequest("/order/getOrders", {
                data: r
            }, t, u);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};