var e = getApp(), a = require("change-model.js");

Page({
    data: {
        shoplist: "",
        latitude: "",
        longitude: "",
        shop: [ {
            address: "105国道大石段259号富丽城购物广场6楼",
            bnumber: "GD00001",
            disc: 20,
            title: "广州大石旗舰店",
            city: "广州市",
            name: "全国寄修中心"
        } ],
        region: [ "广东省", "广州市", "番禺区" ],
        customItem: "全部"
    },
    daohang: function(e) {
        wx.openLocation({
            latitude: e.currentTarget.dataset.latitude - 0,
            longitude: e.currentTarget.dataset.longitude - 0,
            scale: 28,
            name: e.currentTarget.dataset.title,
            address: e.currentTarget.dataset.address
        });
    },
    onLoad: function(t) {
        var o = this, n = wx.getStorageSync("getStores");
        if (console.log(n), !n) return a.getStores({
            lat: e.data.latitude,
            lng: e.data.longitude
        }).then(function(e) {
            if (0 != e.error_code) return wx.showToast({
                title: e.error_msg,
                icon: "none",
                duration: 2e3
            }), !1;
            var a = !0, t = !1, n = void 0;
            try {
                for (var r, i = e.list[Symbol.iterator](); !(a = (r = i.next()).done); a = !0) {
                    var l = r.value;
                    console.log(l.service_range), -1 != l.service_range.indexOf(1) ? l.hasToStore = !0 : l.hasToStore = !1;
                }
            } catch (e) {
                t = !0, n = e;
            } finally {
                try {
                    !a && i.return && i.return();
                } finally {
                    if (t) throw n;
                }
            }
            o.setData({
                shop: e.list
            });
        }), !1;
        var r = !0, i = !1, l = void 0;
        try {
            for (var d, s = n[Symbol.iterator](); !(r = (d = s.next()).done); r = !0) {
                var c = d.value;
                console.log(c.service_range), -1 != c.service_range.indexOf(1) ? c.hasToStore = !0 : c.hasToStore = !1;
            }
        } catch (e) {
            i = !0, l = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (i) throw l;
            }
        }
        this.setData({
            shop: n
        }), console.log("缓存的商店", this.data.shop);
    },
    bindRegionChange: function(t) {
        var o = this;
        console.log("picker发送选择改变，携带值为", t.detail.value[0]), this.setData({
            region: t.detail.value
        });
        t.detail.value[0];
        var n = "province", r = "province";
        "全部" != t.detail.value[2] ? (n = "area", r = t.detail.value[2]) : "全部" != t.detail.value[1] ? (n = "city", 
        r = t.detail.value[1]) : (t.detail.value[0], n = "province", r = t.detail.value[0]), 
        console.log("type", n), console.log("region", r), a.linkageStores({
            lat: e.data.latitude,
            lng: e.data.longitude,
            storeType: n,
            parent: r
        }).then(function(e) {
            if (console.log(e), 0 != e.error_code) return wx.showToast({
                title: e.error_msg,
                icon: "none",
                duration: 2e3
            }), !1;
            o.setData({
                shop: e.list
            });
        });
    },
    jiameng: function() {
        wx.navigateTo({
            url: "/onehour_fix/pages/about/about"
        });
    },
    choose_item: function(a) {
        e.data.id = a.currentTarget.dataset.all.id, e.data.name = a.currentTarget.dataset.all.name, 
        e.data.address = a.currentTarget.dataset.all.address, e.data.disctxt = a.currentTarget.dataset.all.disctxt, 
        e.data.serviceRange = a.currentTarget.dataset.all.service_range, wx.navigateBack({});
    },
    call_phone: function(e) {
        console.log(e.currentTarget.dataset.mobile);
        var a = e.currentTarget.dataset.mobile;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    mailShop: function() {
        e.data.id = e.data.mailStore.id, e.data.name = e.data.mailStore.name, e.data.address = e.data.mailStore.address, 
        e.data.disctxt = e.data.mailStore.disctxt, e.data.serviceRange = e.data.mailStore.serviceRange, 
        wx.navigateBack({});
    },
    onReady: function() {},
    onShow: function() {
        e.data.hasToLink = 0, console.log(e.data.hasToLink);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});