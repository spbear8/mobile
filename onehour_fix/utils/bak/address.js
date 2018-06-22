function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Address = void 0;

var n = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = require("base.js"), i = (require("config.js"), function(i) {
    function s() {
        return e(this, s), t(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
    }
    return r(s, o.Base), n(s, [ {
        key: "getAddress",
        value: function(e) {
            var t = this, r = {
                url: "entry/wxapp/address",
                data: {
                    op: "getUserAddress"
                },
                sCallback: function(r) {
                    r && (r.totalDetail = t.setAddressInfo(r), e && e(r));
                }
            };
            this.request(r);
        }
    }, {
        key: "_setUpAddress",
        value: function(e, t) {
            return {
                name: e.userName,
                province: e.provinceName,
                city: e.cityName,
                country: e.countyName,
                mobile: e.telNumber,
                detail: e.detailInfo
            };
        }
    }, {
        key: "submitAddress",
        value: function(e, t) {
            (e = this._setUpAddress(e)).op = "createOrUpdateAddress";
            var r = {
                url: "entry/wxapp/address",
                type: "post",
                data: e,
                sCallback: function(e) {
                    t && t(!0, e);
                },
                eCallback: function(e) {
                    t && t(!1, e);
                }
            };
            this.request(r);
        }
    }, {
        key: "isCenterCity",
        value: function(e) {
            return [ "北京市", "天津市", "上海市", "重庆市" ].indexOf(e) >= 0;
        }
    }, {
        key: "setAddressInfo",
        value: function(e) {
            var t = e.provinceName || e.province, r = (e.cityName || e.city) + (e.countyName || e.country) + (e.detailInfo || e.detail);
            return this.isCenterCity(t) || (r = t + r), r;
        }
    } ]), s;
}());

exports.Address = i;