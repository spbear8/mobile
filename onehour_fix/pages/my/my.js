var i = getApp();

Page({
    data: {
        hasUserInfo: !1,
        imagewidth: 0,
        imageheight: 0
    },
    onLoad: function() {
        function a() {
            wx.getUserInfo({
                success: function(i) {
                    n.setData({
                        hasUserInfo: !0,
                        userInfo: i.userInfo
                    }), n.update();
                }
            });
        }
        console.log(i.data.latitude);
        var n = this;
        !1 === i.globalData.hasLogin ? wx.login({
            success: a
        }) : a();
    },
    onShow: function() {
        i.data.hasToLink = 1;
    },
    onShareAppMessage: function() {
        return {
            title: "手机维修4S店，就在你身边",
            path: "pages/index/index"
        };
    },
    phonecall: function() {
        wx.makePhoneCall({
            phoneNumber: "4006520456"
        });
    },
    imageLoad: function(i) {
        var a = imageUtil.imageUtil(i);
        this.setData({
            imagewidth: a.imageWidth,
            imageheight: a.imageHeight / 1.2
        });
    },
    dianjishijian1: function(i) {
        wx.navigateTo({
            url: "/onehour_fix/pages/mydingdan/mydingdan"
        });
    },
    dianjishijian2: function(i) {
        wx.navigateTo({
            url: "lianxi/lianxi"
        });
    },
    dianjishijian3: function(i) {
        wx.navigateTo({
            url: "/onehour_fix/pages/fankui/fankui"
        });
    },
    dianjishijian4: function(i) {
        wx.navigateTo({
            url: "/onehour_fix/pages/about/about"
        });
    }
});