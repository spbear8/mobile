var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/wxRequest.js")), e = require("../../plugins/es6-promise.js");

module.exports = {
    getBanner: function(n) {
        return new e(function(e, u) {
            t.default.wxRequest("/banner/getBanners", {
                data: n
            }, e, u);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    },
    getDefaultStore: function(n, u) {
        return new e(function(e, o) {
            t.default.wxRequest("/store/getDefaultStore", {
                data: n,
                method: u
            }, e, o);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    },
    getStores: function(n, u) {
        return new e(function(e, o) {
            t.default.wxRequest("/store/getStores", {
                data: n,
                method: u
            }, e, o);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    },
    getModels: function(n, u) {
        return new e(function(e, o) {
            t.default.wxRequest("/repair/getModels", {
                data: n,
                method: u
            }, e, o);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    },
    getFaults: function(n, u) {
        return new e(function(e, o) {
            t.default.wxRequest("/repair/getFaults", {
                data: n,
                method: u
            }, e, o);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    },
    getSmallModel: function(n, u) {
        return new e(function(e, o) {
            t.default.wxRequest("/repair/getSmallModel", {
                data: n,
                method: u
            }, e, o);
        }).then(function(t) {
            return t.data;
        }).catch(function(t) {
            console.log(t);
        });
    }
};