getApp();

var n, e, t = require("fankui-model.js");

Page({
    data: {
        textLength: "0"
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    content: function(e) {
        n = e.detail.value, this.setData({
            textLength: n.length
        });
    },
    mobile: function(n) {
        e = n.detail.value;
    },
    formSubmit: function(o) {
        console.log(o);
        o.detail.formId;
        if ("" == n || null == n || null == e || "" == e) return wx.showModal({
            content: "请补充完整你的联系方式和建议",
            showCancel: !1,
            success: function(n) {
                return !1;
            }
        }), !1;
        t.addFeedback({
            phone: e,
            message: n
        }, "POST").then(function(n) {
            0 == n.error_code && wx.showToast({
                title: "反馈成功",
                icon: "success",
                duration: 2e3,
                success: function() {
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/onehour_fix/pages/index/index"
                        });
                    }, 2e3);
                }
            });
        });
    }
});