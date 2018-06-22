var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), n = require("../../plugins/es6-promise.js");

module.exports = {
    addJoinIn: function(t) {
        return new n(function(n, u) {
            e.default.wxUserRequest("/message/addJoinIn", {
                data: t
            }, n, u);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};