var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/wxRequest.js")), t = require("../../plugins/es6-promise.js");

module.exports = {
    getStores: function(n) {
        return new t(function(t, u) {
            e.default.wxRequest("/store/getStores", {
                data: n
            }, t, u);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    },
    linkageStores: function(n) {
        return new t(function(t, u) {
            e.default.wxRequest("/store/linkageStores", {
                data: n
            }, t, u);
        }).then(function(e) {
            return e.data;
        }).catch(function(e) {
            console.log(e);
        });
    }
};