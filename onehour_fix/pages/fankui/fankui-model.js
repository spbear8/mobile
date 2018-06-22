var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), t = require("../../plugins/es6-promise.js");

module.exports = {
    addFeedback: function(n) {
        return new t(function(t, u) {
            e.default.wxUserRequest("/message/addFeedback", {
                data: n
            }, t, u);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    },
    testSeed: function(n, u) {
        return new t(function(t, s) {
            e.default.wxUserRequest("/Message/testSeed", {
                data: n,
                method: u
            }, t, s);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};