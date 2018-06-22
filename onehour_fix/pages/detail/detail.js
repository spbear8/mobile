getApp();

var e = require("detail-model.js");

Page({
    data: {
        status: 0,
        paystate: 0,
        hasorder: 0,
        orderSn: 0,
        order: [],
        repairPrice: 0,
        discountPrice: 0,
        statusinfo: "用户下单"
    },
    formSubmit: function(t) {
        var r = this;
        e.prePayOrderById({
            order_sn: r.data.orderSn
        }).then(function(o) {
            0 == o.error_code ? wx.requestPayment({
                timeStamp: o.timeStamp,
                nonceStr: o.nonceStr,
                package: o.package,
                signType: o.signType,
                paySign: o.paySign,
                success: function(o) {
                    e.payOrderSeed({
                        form_id: t.detail.formId,
                        order_sn: r.data.orderSn
                    }).then(function(e) {
                        console.log(e);
                    }), wx.showModal({
                        title: "支付提示",
                        content: "支付成功",
                        showCancel: !1,
                        confirmText: "查看结果",
                        success: function(e) {
                            e.confirm && wx.navigateTo({
                                url: "../detail/detail?order_sn=" + r.data.orderSn
                            });
                        }
                    });
                },
                fail: function(e) {
                    wx.showModal({
                        title: "支付提示",
                        content: "支付失败",
                        showCancel: !1,
                        confirmText: "确定",
                        success: function(e) {}
                    });
                }
            }) : wx.showModal({
                title: "请求失败",
                content: "支付失败：" + o.error_msg,
                showCancel: !1,
                confirmText: "确定",
                success: function(e) {}
            });
        });
    },
    orderCancel: function() {
        var t = this;
        wx.showModal({
            title: "操作",
            content: "确定取消该订单？",
            success: function(r) {
                if (r.confirm) console.log(t.data.orderSn), e.OrderCancel({
                    order_sn: t.data.orderSn,
                    cancel_reason: "小程序取消"
                }, "POST").then(function(e) {
                    0 == e.error_code ? (console.log(e.data), wx.showToast({
                        title: "取消成功",
                        icon: "success",
                        duration: 1500
                    }), setTimeout(function() {
                        wx.navigateTo({
                            url: "../detail/detail?order_sn=" + t.data.orderSn
                        });
                    }, 1800)) : wx.showToast({
                        title: "取消失败",
                        icon: "success",
                        duration: 1500
                    });
                }); else if (r.cancel) return !1;
            }
        });
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "订单详情"
        });
        var r = this, o = JSON.parse(t.order_sn);
        e.getOrder({
            order_sn: o
        }, "GET").then(function(e) {
            if (console.log("订单详情", e), 0 == e.error_code) {
                var t = e.data.repair_price, o = e.data.order_actions[0].desc;
                "3" == e.data.status && (o = "订单取消"), r.setData({
                    orderSn: e.data.order_sn,
                    order: e.data,
                    repairPrice: t,
                    discountPrice: 0,
                    statusinfo: o
                });
            }
        });
    }
});