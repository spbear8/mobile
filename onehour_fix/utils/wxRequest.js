function t(t, e) {
    var o = {};
    for (var n in t) e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    return o;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, o = getApp().data.host;

console.log(o);

var n = "";

module.exports = {
    wxRequest: function(n, a, i, d) {
        var r = e({}, a), c = r.data, s = void 0 === c ? {} : c, l = r.contentType, u = void 0 === l ? "application/json" : l, h = r.method, w = void 0 === h ? "GET" : h;
        t(r, [ "data", "contentType", "method" ]);
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: o + n,
            data: e({}, s),
            method: w,
            header: {
                "content-type": u
            },
            success: function(t) {
                wx.hideLoading(), i(t);
            },
            fail: function(t) {
                wx.hideLoading(), wx.showModal({
                    title: "网络错误",
                    content: "网络出错，请刷新重试",
                    showCancel: !1
                }), d(t);
            }
        });
    },
    wxUserRequest: function(a, i, d, r) {
        "" == n && (n = wx.getStorageSync("userId"), console.log("userId111", n));
        var c = e({}, i), s = c.data, l = void 0 === s ? {} : s, u = c.contentType, h = void 0 === u ? "application/json" : u, w = c.method, p = void 0 === w ? "GET" : w;
        t(c, [ "data", "contentType", "method" ]);
        l.user_id = n, wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: o + a,
            data: e({}, l),
            method: p,
            header: {
                "content-type": h
            },
            success: function(t) {
                wx.hideLoading(), d(t);
            },
            fail: function(t) {
                console.log(t), wx.hideLoading(), wx.showModal({
                    title: "网络错误",
                    content: "网络出错，请刷新重试",
                    showCancel: !1
                }), r(t);
            }
        });
    }
};