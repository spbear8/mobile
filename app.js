function e(e) {
    var o;
    for (o in e) return !1;
    return !0;
}

App({
    data: {
        address: "广州市番禺区大石105国道",
        id: "1",
        name: "大石旗舰店",
        brandimg: "",
        lng: "113.317594",
        lat: "23.03319",
        longitude: "113.317594",
        latitude: "23.03319",
        disctxt: "默认门店",
        orderis: 0,
        modelId: "",
        modelName: "",
        modelPath: "",
        modelFaults: [],
        modelColor: "",
        hasToLink: 0,
        serviceRange: "",
        province: "",
        account_id: "5",
        mailStore: {
            address: "105国道大石段259号富丽城购物广场6楼",
            id: 416,
            name: "广州服务总部",
            phone: "4006-520-456",
            lng: "113.317447",
            lat: "23.032317",
            disctxt: "默认邮寄",
            serviceRange: "3"
        },
        host: "https://wap.01hour.com/small",
        user_id: "",
        isLocation: 0
    },
    onLaunch: function() {},
    onShow: function() {
        console.log(this.data);
    },
    onHide: function() {},
    onError: function(e) {
        console.log(e);
    },
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7_wxappdemo/pages/todo/todo",
            iconPath: "/we7/resource/icon/todo.png",
            selectedIconPath: "/we7/resource/icon/todoselect.png",
            text: "ToDo"
        }, {
            pagePath: "/we7_wxappdemo/pages/pay/pay",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "支付"
        }, {
            pagePath: "/rcdonkey_signup/pages/publish/publish",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "报名"
        } ]
    },
    globalData: {
        userInfo: null
    },
    checkSettingStatu: function(o) {
        var t = this;
        wx.getSetting({
            success: function(n) {
                console.log("reszzzz", n);
                var a = n.authSetting;
                e(a) || (a["scope.userInfo"] || wx.showModal({
                    title: "用户未授权",
                    content: "如需正常使用此小程序功能，请您按确定并在设置页面授权用户信息",
                    showCancel: !1,
                    success: function(e) {
                        wx.openSetting({
                            success: function(e) {
                                e.authSetting["scope.userInfo"] ? t.getUserInfo(o) : t.checkSettingStatu(o);
                            }
                        });
                    }
                }), a["scope.Location"] && (console.log("111111", t.data.isLocation), console.log("重新选择授权", this.data)));
            }
        });
    },
    getUserInfo: function(e) {
        var o = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function(t) {
                var n = t.code;
                console.log("code111", n), wx.getUserInfo({
                    success: function(t) {
                        o.globalData.userInfo = t.userInfo, "function" == typeof e && e(o.globalData.userInfo);
                        var a = o.data.account_id, c = encodeURIComponent(t.encryptedData), s = t.iv;
                        console.log("that.data.account_id", o.data.account_id), wx.request({
                            url: o.data.host + "/auth/login",
                            method: "POST",
                            data: {
                                account_id: a,
                                code: n,
                                encryptedData: c,
                                iv: s
                            },
                            success: function(e) {
                                o.data.user_id = e.data.user_id, wx.setStorageSync("userId", e.data.user_id);
                            }
                        });
                    },
                    fail: function() {
                        o.checkSettingStatu();
                    }
                });
            },
            fail: function() {
                console.log("登录时网络失败");
            }
        });
    }
});