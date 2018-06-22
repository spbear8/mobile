getApp();

var e = require("about-model.js");

Page({
    data: {
        imagewidth: 0,
        imageheight: 0,
        region: [ "广东省", "广州市", "海珠区" ],
        cityyext: "",
        province: "",
        city: "",
        district: ""
    },
    onLoad: function() {
        console.log("abouy");
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value,
            cityyext: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
            province: e.detail.value[0],
            city: e.detail.value[1],
            district: e.detail.value[2]
        });
    },
    updatefrom: function(i) {
        console.log(i);
        var t = this;
        if ("" == i.detail.value.username || "" == i.detail.value.userphone || "" == i.detail.value.city) return console.log(i.detail.value), 
        wx.showToast({
            title: "请补充完整信息",
            icon: "none",
            duration: 2e3
        }), !1;
        wx.showLoading({}), console.log("开始提交"), e.addJoinIn({
            name: i.detail.value.username,
            phone: i.detail.value.userphone,
            province: t.data.province,
            city: t.data.city,
            area: t.data.district
        }, "POST").then(function(e) {
            if (console.log(e), 0 != e.error_code) return wx.showToast({
                title: e.error_msg,
                icon: "none",
                duration: 2e3
            }), !1;
            wx.showToast({
                title: "提交成功！",
                icon: "success",
                duration: 3e3,
                success: function() {
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/onehour_fix/pages/index/index"
                        });
                    }, 2e3);
                }
            });
        }), console.log("请求完成");
    },
    imageLoad: function(e) {}
});