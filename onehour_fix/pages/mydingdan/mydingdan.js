getApp();

var n = require("mydingdan-model.js");

Page({
    data: {
        guzhangleixing: "屏幕故障",
        phonenum: "4008520456",
        dingdanhao: [ "20170227001", "20170227002", "20170227003" ],
        jiaqian: [ "300.00", "180.00", "520.00" ]
    },
    onLoad: function(o) {
        var e = this;
        n.getOrders({}, "POST").then(function(n) {
            console.log("订单", n), 0 == n.error_code && e.setData({
                orderlist: n.list
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    dadianhua: function() {
        wx.makePhoneCall({
            phoneNumber: "4006520456",
            success: function() {
                console.log("成功拨打电话");
            }
        });
    }
});