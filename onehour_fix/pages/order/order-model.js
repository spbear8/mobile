var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), r = require("../../plugins/es6-promise.js");

module.exports = {
    addOrder: function(t, u) {
        return new r(function(r, n) {
            e.default.wxUserRequest("/order/addOrder", {
                data: t,
                method: u
            }, r, n);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};