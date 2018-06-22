function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), o = require("index-model.js");

Page({
    data: (a = {
        lbt_imgs: [ "../../images/pic_lb2.png" ],
        banners: [ "../../images/pic_lb2.png" ],
        position_address: [ "../../images/address.png" ],
        right_jt_blue: [ "../../images/right_jt_blue.png" ],
        latitude: "../../images/phone_default.png",
        storeServer: [],
        store_message: [],
        longitude: ""
    }, t(a, "latitude", ""), t(a, "brandimg", "../../images/phone_default.png"), t(a, "brands", {
        iphone: "苹果",
        htc: "HTC",
        jinli: "金立",
        leeco: "乐视",
        meizu: "魅族",
        oppo: "OPPO",
        vivo: "VIVO",
        xiaomi: "小米",
        huawei: "华为",
        ipad: "iPad",
        devtools: "测试机"
    }), t(a, "phoneSel", []), t(a, "phoneModel", "其他"), t(a, "brandList", []), t(a, "modelList", []), 
    t(a, "value", [ 0, 10 ]), t(a, "childList", []), t(a, "brandId", "1"), t(a, "modelId", "389"), 
    t(a, "fixList", []), t(a, "detail", {
        key: 0,
        child: [],
        title: ""
    }), t(a, "priceList", []), t(a, "nums", 0), t(a, "totalPrice", 0), t(a, "priceInfoStatus", !1), 
    t(a, "phoneStatus", !1), t(a, "totalPrice", ""), t(a, "nums", ""), t(a, "middleModalStatus", !1), 
    t(a, "selected", !1), t(a, "itemSelected", !1), t(a, "choose_default_statu", !1), 
    t(a, "topAnimationData", {}), t(a, "userInfo", {}), t(a, "wxload", !0), a),
    showFixModal: function(t) {
        console.log(t);
        for (var a = 0, e = t.currentTarget.dataset.key, o = t.currentTarget.dataset.child, i = t.currentTarget.dataset.name, s = t.currentTarget.dataset.instruction, l = 0; l < o.length; l++) 1 == o[l].selected && (a = 1);
        0 == a && (o[0].selected = !0), this.setData({
            middleModalStatus: !0,
            detail: {
                key: e,
                child: o,
                name: i,
                instruction: s,
                choose_default_statu: !0
            }
        });
    },
    getBalance: function() {
        o.getBalance().then(function(t) {
            console.log("data");
        });
    },
    itemSelect: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a);
        for (var e = this.data.detail, o = 0; o < e.child.length; o++) e.child[o].selected = o == a && !e.child[o].selected;
        this.setData({
            detail: e
        }), console.log(" detail", e);
    },
    showPicker: function() {
        var t = this.data.value;
        console.log(t);
        var a = this.data.modelList[t[0]];
        this.setData({
            childList: a,
            value: t,
            modelid: a[t[1]].id
        }), this.setData({
            pickerStatus: !0
        });
    },
    bindChange: function(t) {
        var a = this.data.modelList[t.detail.value[0]];
        this.setData({
            value: t.detail.value,
            childList: a
        });
    },
    clickHidePicker: function() {
        var t = this, a = e.data.id, i = this.data.modelList[this.data.value[0]][this.data.value[1]].id, s = this.data.modelList[this.data.value[0]][this.data.value[1]].name, l = this.data.modelList[this.data.value[0]][this.data.value[1]].color;
        e.data.modelId = i, e.data.modelName = s, e.data.modelColor = l, console.log("ppp", this.data.modelList[this.data.value[0]][this.data.value[1]]), 
        console.log(s), this.setData({
            phoneSel: this.data.modelList[this.data.value[0]][this.data.value[1]],
            phoneModel: this.data.modelList[this.data.value[0]][this.data.value[1]].name,
            brandimg: this.data.modelList[this.data.value[0]][this.data.value[1]].logo_path,
            modelId: this.data.modelList[this.data.value[0]][this.data.value[1]].id
        }), e.data.brandimg = this.data.modelList[this.data.value[0]][this.data.value[1]].logo_path, 
        o.getFaults({
            store_id: a,
            model_id: i
        }, "POST").then(function(a) {
            console.log(a.list.length);
            for (var e = 0; e < a.list.length; e++) a.list[e].key = e;
            t.setData({
                fixList: a.list
            }), console.log("故障", a.list);
        }), this.setData({
            pickerStatus: !1,
            priceInfoStatus: !1
        });
    },
    hideMiddleModal: function() {
        this.setData({
            middleModalStatus: !1
        });
    },
    showPriceInfo: function() {
        var t = this.data.fixList, a = this.data.detail, e = [], o = 0;
        t[a.key].child = a.child, console.log(t[a.key].child), console.log("111", t), console.log(t.length);
        for (var i = 0; i < t.length; i++) !function(a) {
            var i = t[a].child;
            console.log("innerList", i);
            for (var s = 0; s < i.length; s++) {
                if (i[s].selected) {
                    t[a].status = !0;
                    var l = {
                        name: i[s].name,
                        price: i[s].price[0].price,
                        key: t[a].key
                    };
                    e.push(l), console.log("temp", l), o += Number(i[s].price[0].price);
                    break;
                }
                s == i.length - 1 && (t[a].status = !1, e.find(function(e, i, s) {
                    if (e.key == t[a].key) return s.splice(e.key, 1), o -= Number(t[a].price[0].price), 
                    !0;
                }));
            }
        }(i);
        this.setData({
            fixList: t,
            priceList: e,
            totalPrice: o,
            nums: e.length,
            middleModalStatus: !1
        }), e.length > 0 ? this.setData({
            priceInfoStatus: !0
        }) : this.setData({
            priceInfoStatus: !1
        });
    },
    showPricePanel: function() {
        this.setData({
            footModalStatus: !0,
            phoneStatus: !0
        });
        var t = this;
        setTimeout(function() {
            t.animation1.top("-106rpx").step(), t.setData({
                topAnimationData: t.animation1.export()
            });
        }, 100);
    },
    hideFooterModal: function() {
        console.log(this.data.fixList), this.setData({
            footModalStatus: !1
        });
        var t = this;
        setTimeout(function() {
            t.animation1.top(0).step(), t.setData({
                topAnimationData: t.animation1.export(),
                phoneStatus: !1
            });
        }, 100);
    },
    removeItem: function(t) {
        var a = t.currentTarget.dataset.key, e = this.data.totalPrice, o = this.data.nums, i = this.data.fixList;
        i[a].status = !1;
        for (var s = i[a].child, l = 0; l < s.length; l++) i[a].child[l].selected = !1;
        for (var n = this.data.priceList, d = 0; d < n.length; d++) if (n[d].key == a) {
            e -= Number(n[d].price), o--, n.splice(d, 1);
            break;
        }
        n.length > 0 ? this.setData({
            priceList: n,
            fixList: i,
            totalPrice: e,
            nums: o
        }) : (this.setData({
            priceList: n,
            fixList: i,
            priceInfoStatus: !1,
            totalPrice: e,
            nums: o
        }), this.hideFooterModal());
    },
    tip_choose: function() {
        0 == this.data.choose_default_statu && this.checkInfo("请选择故障");
    },
    checkInfo: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            image: "../../resource/images/warn-red.png",
            duration: 2e3
        });
    },
    linkTo: function() {
        var t = "0", a = "0", o = [], i = this.data.fixList;
        console.log(i);
        for (var s = 0; s < i.length; s++) if (i[s].status) {
            t += "," + i[s].id;
            for (var l = i[s].child, n = 0; n < l.length; n++) l[n].selected && (o.push(l[n]), 
            console.log("modelFaults", o), e.data.modelFaults = o, a += "," + l[n].id);
        }
        console.log("parentIds", t, "childIds", a);
        var d = this.data.totalPrice;
        console.log("totalPrice", d), wx.navigateTo({
            url: "../order/order?price=" + d + "&fault_str=" + a
        });
    },
    linkToDetail: function() {
        wx.navigateTo({
            url: "../my/my"
        });
    },
    change_door: function() {
        wx.navigateTo({
            url: "../change/change"
        });
    },
    onLaunch: function() {},
    onReady: function() {},
    onLoad: function() {
        var t = this;
        console.log("lohi111load1111");
        var a = this;
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                console.log(t), a.data.longitude = t.longitude, a.data.latitude = t.latitude, console.log(a.data.longitude), 
                console.log(a.data.latitude), e.data.longitude = t.longitude, e.data.latitude = t.latitude, 
                o.getStores({
                    lat: a.data.latitude,
                    lng: a.data.longitude
                }, "POST").then(function(t) {
                    console.log("定位最近门店", t), 0 == t.error_code && (a.setData({
                        store_message: t.list[0]
                    }), wx.setStorageSync("getStores", t.list), e.data.lng = t.list[0].lng, e.data.lat = t.list[0].lat, 
                    e.data.id = t.list[0].id, e.data.name = t.list[0].name, e.data.disctxt = t.list[0].disctxt, 
                    e.data.address = t.list[0].address, e.data.serviceRange = t.list[0].service_range), 
                    console.log("app.data.id111", e.data.id), console.log("app.data.modelId1111", e.data.modelId), 
                    console.log("115478", e.data.id, e.data.modelId);
                    var i = e.data.id, s = e.data.modelId;
                    "" != i && "" != s && o.getFaults({
                        store_id: i,
                        model_id: s
                    }, "POST").then(function(t) {
                        console.log(t.list.length);
                        for (var e = 0; e < t.list.length; e++) t.list[e].key = e;
                        a.setData({
                            fixList: t.list
                        }), console.log("故障", a.data.fixList);
                    });
                });
            },
            fail: function() {
                console.log("拒绝授权定位"), wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userLocation"] || wx.showModal({
                            title: "温馨提醒",
                            content: "检测您未授权地理位置，请点击确认后在设置里打开我的地理位置",
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        t.authSetting["scope.userLocation"] && a.onLoad();
                                    },
                                    fail: function(t) {}
                                });
                            }
                        });
                    }
                });
                var t = wx.getStorageSync("getDefaultStore");
                if (console.log("getFaultsDatas", t), t) {
                    a.setData({
                        store_message: t
                    }), e.data.id = t.id, e.data.name = t.name, e.data.address = t.address, e.data.lng = t.lng, 
                    e.data.lat = t.lat, e.data.disctxt = t.disctxt, e.data.serviceRange = t.service_range;
                    var i = e.data.id, s = e.data.modelId;
                    "" != i && "" != s && o.getFaults({
                        store_id: i,
                        model_id: s
                    }, "POST").then(function(t) {
                        console.log("data.list11111111", t.list);
                        for (var e = 0; e < t.list.length; e++) t.list[e].key = e;
                        a.setData({
                            fixList: t.list
                        }), console.log("故障", a.data.fixList);
                    });
                }
            }
        }), e.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        }), wx.getStorageSync("banners") || o.getBanner().then(function(a) {
            if (0 == a.error_code) {
                for (var e = [], o = 0; o < a.list.length; o++) e.push(a.list[o].url);
                t.setData({
                    banners: e
                }), wx.setStorageSync("banners", t.data.banners);
            }
        }), wx.getStorageSync("getDefaultStore") || o.getDefaultStore().then(function(t) {
            if (console.log("111111默认门店", t), 0 == t.error_code) {
                e.data.id = t.id, e.data.name = t.name, e.data.address = t.address, e.data.lng = t.lng, 
                e.data.lat = t.lat, e.data.disctxt = t.disctxt, e.data.serviceRange = t.service_range, 
                a.setData({
                    store_message: t.data
                }), wx.setStorageSync("getDefaultStore", t.data);
                var i = e.data.id, s = e.data.modelId;
                "" != i && "" != s && o.getFaults({
                    store_id: i,
                    model_id: s
                }, "POST").then(function(t) {
                    console.log("data.list11111111", t.list);
                    for (var e = 0; e < t.list.length; e++) t.list[e].key = e;
                    a.setData({
                        fixList: t.list
                    }), console.log("故障", a.data.fixList);
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                console.log("微信获得的", t), o.getSmallModel({
                    name: t.model
                }, "GET").then(function(o) {
                    if (0 == o.error_code) {
                        console.log("这是我获得的机型", o.data);
                        var i = o.data.name, s = i;
                        s.indexOf("(") >= 0 ? s = s.substring(0, s.indexOf("(")) : s.indexOf("<") >= 0 && (s = s.substring(0, s.indexOf("<"))), 
                        "其他" == i && (i = i + "  " + t.model), a.setData({
                            phoneSel: o.data,
                            phoneModel: s,
                            brandimg: o.data.logo_path,
                            modelId: o.data.id
                        }), e.data.modelId = o.data.id, e.data.modelName = s, e.data.brandimg = o.data.logo_path, 
                        e.data.modelColor = o.data.color;
                    }
                });
            }
        }), o.getModels({
            store_id: e.data.id
        }, "POST").then(function(e) {
            if (0 == e.error_code) {
                for (var o = [], i = [], s = [], l = e.list, n = 0; n < l.length; n++) o.push({
                    id: l[n].id,
                    name: l[n].name,
                    logo_path: l[n].logo_path
                }), s.push(l[n].products);
                for (n = 0; n < s.length; n++) i.push(s[n].手机 || s[n].平板);
                console.log("存储手机型号", i), console.log("存储手机品牌", o), a.setData({
                    modelList: i,
                    brandList: o
                });
                var d, r;
                a.data.brandList.forEach(function(t, e) {
                    a.data.phoneSel.brand_name == t.name && (d = e);
                }), a.data.modelList[d].forEach(function(t, e) {
                    a.data.phoneSel.name == t.name && (r = e);
                }), t.setData({
                    value: [ d, r ]
                });
            }
        });
    },
    onShow: function() {
        var t = this;
        console.log("onShowapp", e), e.data.orderis = 0, console.log("app.data.orderis", e.data.orderis);
        var a = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        this.animation1 = a, this.setData({
            topAnimationData: a.export()
        }), 0 == e.data.hasToLink && (console.log("onShow渲染故障，此时的门店id和机型id为"), "" != e.data.id && "" != e.data.modelId && (this.setData({
            pickerStatus: !1,
            priceInfoStatus: !1
        }), console.log("onShow渲染故障，此时的门店id和机型id为2"), console.log(e.data.id + "......" + e.data.modelId), 
        o.getFaults({
            store_id: e.data.id,
            model_id: e.data.modelId
        }, "POST").then(function(a) {
            console.log("data.list11111111", a.list);
            for (var e = 0; e < a.list.length; e++) a.list[e].key = e, a.list[e].status = !1;
            t.setData({
                fixList: a.list
            });
        }))), console.log("app.data111", e.data), this.setData({
            store_message: e.data
        }), console.log("app.data222", e.data), console.log(" store_message", this.data.store_message);
    },
    onShareAppMessage: function(t) {
        return t.from, {
            title: e.data.sharetitle,
            path: "onehour_fix/pages/index/index",
            imageUrl: e.data.shareimg,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {}
        };
    },
    sharebutton: function(t) {
        wx.showShareMenu({
            withShareTicket: !0
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});