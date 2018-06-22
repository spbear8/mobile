var t = getApp(), e = require("order-model.js");

Page({
    data: {
        accountid: "",
        deviceid: 0,
        color: 6,
        colorItem: "",
        fixType: 2,
        fixIntro: [ "30分钟上门服务，让维修变得随时随地", "全国连锁，统一门店，静候您的光临", "我们为客户承担来回运费，请放心邮寄", "现场急速下单，指定师傅维修" ],
        modalStatus: !1,
        serverAddr: "请选择服务地址",
        timePickerStatus: !1,
        dateList: [],
        timeList: [ "08:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00" ],
        todayTimeList: [],
        date: "",
        time: "",
        serverTime: "请选择上门时间",
        _color: "",
        value: [ 0, 0, 0 ],
        isToday: !0,
        totalPrice: 0,
        brandimg: "",
        right_jt_blue: "../../images/right_jt_blue.png",
        right_jt_grey: "../../images/right_jt_grey.png",
        message_tb: "../../images/message_tb.png",
        time_tb: "../../images/time_tb.png",
        house_tb: "../../images/house_tb.png",
        address_tb: "../../images/address_tb.png",
        phone_tb: "../../images/phone_tb.png",
        address_status1: !0,
        address_status2: !1,
        userName: "",
        address: "",
        user_phone: "",
        category: "",
        troubleList: [],
        colorList: [],
        door_message: [],
        repairWay: 2,
        mobile: "",
        remark: "",
        severdoor: t.data,
        province: t.data.province,
        city: t.data.city,
        region: t.data.region,
        xieyi_choose: !0,
        showModalStatus: !1,
        fault_str: "",
        chooseColor: !1,
        mailStore: t.data.mailStore,
        repairType: 2,
        provinceName: "",
        cityName: "",
        countyName: "",
        userInfo: t.globalData.userInfo,
        onOff: ""
    },
    bindusername: function(t) {
        this.setData({
            userName: t.detail.value
        });
    },
    bindmobile: function(t) {
        console.log("phone", t), this.setData({
            mobile: t.detail.value,
            user_phone: t.detail.value
        });
    },
    formSubmit: function(a) {
        var o = this, s = this.data, i = (s.serverAddr, t.data.id, "");
        if (i = this.data.chooseColor ? this.data.colorItem : "全色系", console.log(s), console.log("color ", this.data.colorItem), 
        "" != i) if (s.userName) if (s.user_phone) if (s.xieyi_choose) {
            switch (s.repairWay) {
              case 0:
                if (!s.date || !s.time) return void this.checkInfo("请填写时间");
                break;

              case 1:
                "到店";
            }
            var r = wx.getStorageSync("userId"), n = this.data.fault_str, d = t.data.modelId, c = t.data.id, l = this.data.repairWay, u = s.userName, h = s.user_phone, m = t.data.longitude, g = t.data.latitude, f = s.provinceName, p = s.cityName, v = s.countyName, _ = s.address, y = s.remark, D = s.serverTime, T = a.detail.formId;
            console.log("sdad", l, n, r, c, i), console.log("app.data.orderis", t.data.orderis), 
            0 == t.data.orderis && (this.setData({
                onOff: !0
            }), e.addOrder({
                fault_str: n,
                visit_type: 2,
                model_id: d,
                store_id: c,
                repair_type: l,
                color: i,
                name: u,
                phone: h,
                lng: m,
                lat: g,
                province: f,
                city: p,
                area: v,
                address: _,
                user_remark: y,
                form_id: T,
                book_time: D
            }, "POST").then(function(e) {
                console.log("111", e), 0 == e.error_code ? (wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 1500
                }), o.setData({
                    onOff: ""
                }), t.data.orderis = 1, t.data.hasToLink = 0, setTimeout(function() {
                    wx.navigateTo({
                        url: "../detail/detail?order_sn=" + e.data.order_sn
                    });
                }, 1800)) : (o.setData({
                    onOff: ""
                }), wx.showToast({
                    title: e.error_msg,
                    icon: "none",
                    duration: 2e3
                }));
            }).catch(function() {
                wx.showToast({
                    title: "网络故障，请返回首页",
                    icon: "none",
                    duration: 2e3
                });
            })), 1 == t.data.orderis && wx.showToast({
                title: "您已提交过订单，请返回首页",
                icon: "none",
                duration: 2e3
            });
        } else this.checkInfo("请勾选同意协议"); else this.checkInfo("请输入的您的信息"); else this.checkInfo("请选择您的信息"); else this.checkInfo("请选择颜色");
    },
    bindWorker: function(t) {
        var e = t.detail.value;
        this.setData({
            workerId: e
        });
    },
    bindremark: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    xieyi_choose: function() {
        console.log(123), 1 == this.data.xieyi_choose ? this.setData({
            xieyi_choose: !1
        }) : this.setData({
            xieyi_choose: !0
        });
    },
    xieyi_bind: function(t) {
        var e = t.currentTarget.dataset.statu;
        this.util(e), console.log(t), "open" == e && this.setData({
            showModalStatus: !0
        });
    },
    close_xy: function(t) {
        var e = t.currentTarget.dataset.statu;
        this.util(e), console.log(t), "close" == e && this.setData({
            showModalStatus: !1
        });
    },
    util: function(t) {
        var e = wx.createAnimation({
            duration: 0,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.opacity(0).rotateX(-100).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), this.setData({
                animationData: e
            });
        }.bind(this), 0);
    },
    backTo: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    showModal: function() {
        this.setData({
            modalStatus: !0
        });
    },
    selectColor: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.item;
        this.setData({
            color: e,
            colorItem: a
        });
    },
    selectType: function(e) {
        console.log("event.currentTarget.dataset", e.currentTarget.dataset.repairway);
        var a = e.currentTarget.dataset.repairway, o = t.data.serviceRange;
        console.log("serviceRanges", o);
        var s = "";
        if ("2" == a && (s = "到店"), "1" == a && (s = "上门"), "3" == a && (s = "邮寄"), -1 == o.indexOf(a)) return wx.showToast({
            title: "本店暂未开通" + s + "维修,敬请期待!",
            icon: "none",
            duration: 2e3
        }), !1;
        var i = e.currentTarget.dataset.id;
        console.log("id", i);
        var r = "2";
        switch (i) {
          case "1":
            r = 1;
            break;

          case "3":
            r = 3;
            break;

          case "2":
          default:
            r = 2;
        }
        console.log("repairWay", r), this.setData({
            fixType: i,
            repairWay: r
        });
    },
    choose_address: function() {
        var t = this;
        wx.chooseAddress ? wx.chooseAddress({
            success: function(e) {
                console.log(e), t.setData({
                    address_status1: !1,
                    address_status2: !0,
                    smwx_address: "",
                    userName: e.userName,
                    user_phone: e.telNumber,
                    address: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    serverAddr: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    provinceName: e.provinceName,
                    countyName: e.countyName,
                    cityName: e.cityName
                });
            },
            fail: function() {
                console.log("拒绝地址授权"), wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.address"] || wx.showModal({
                            title: "温馨提醒",
                            content: "点击确定获取您的通讯地址",
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        t.authSetting["scope.address"];
                                    },
                                    fail: function(t) {}
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    chooseTime: function(t) {
        console.log(t), this.setData({
            timePickerStatus: !0,
            _color: 333
        }), console.log(this.data._color);
    },
    bindChange: function(t) {
        var e = t.detail.value;
        0 == e[0] ? this.setData({
            isToday: !0,
            time: this.data.todayTimeList[e[1]]
        }) : this.setData({
            isToday: !1,
            time: this.data.timeList[e[2]]
        }), this.setData({
            date: this.data.dateList[e[0]],
            value: e
        });
    },
    callphone: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.mailStore.phone,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    hideTimePicker: function() {
        this.setData({
            timePickerStatus: !1
        });
    },
    timeSelect: function() {
        var t = this.data.date || this.data.dateList[0], e = this.data.time || this.data.todayTimeList[0], a = t + " " + e;
        "" == e && (e = ""), this.setData({
            serverTime: a,
            date: t,
            time: e
        }), this.hideTimePicker();
    },
    hideModal: function() {
        this.setData({
            modalStatus: !1
        });
    },
    linkToDetail: function() {
        wx.navigateTo({
            url: "../my/my"
        });
    },
    submitData: function() {},
    checkInfo: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            image: "../../resource/images/warn-red.png",
            duration: 2e3
        });
    },
    onShow: function() {},
    onLoad: function(e) {
        this.setData({
            onOff: ""
        }), console.log("order oreder app.data.serviceRange", t.data.serviceRange);
        var a = t.data.serviceRange;
        -1 == a.indexOf(2) && -1 != a.indexOf(1) && this.setData({
            fixType: 1
        }), -1 == a.indexOf(2) && -1 == a.indexOf(1) && -1 != a.indexOf(3) && this.setData({
            fixType: 3
        }), t.data.hasToLink = 1;
        var o = this;
        console.log(e), o.setData({
            brandimg: t.data.brandimg,
            userInfo: t.data.userInfo
        }), console.log(this.data.brandimg), console.log("app.data", t.data), this.setData({
            totalPrice: e.price,
            fault_str: e.fault_str,
            category: t.data.modelName
        }), console.log(), wx.setNavigationBarTitle({
            title: "维修方案"
        });
        for (var s = [], i = [ "立即上门" ], r = [], n = 0; n <= 15; n++) {
            var d = new Date(), c = d.getFullYear();
            d.setDate(d.getDate() + n);
            var l = d.getMonth() + 1;
            l = l > 10 ? l : "0" + l;
            var u = d.getDate(), h = c + "-" + l + "-" + (u = u > 10 ? u : "0" + u);
            s.push(h);
        }
        for (var m = new Date().getHours() + 1; m < 21; m++) m > 10 && (i.push(m + ":00:00"), 
        r.push(m + ":00:00"));
        this.setData({
            dateList: s,
            todayTimeList: r
        }), console.log("app.data.modelColor", t.data.modelColor);
        for (var g = t.data.modelColor.split(","), f = 0; f < t.data.modelFaults.length; f++) 1 == t.data.modelFaults[f].choose_color && this.setData({
            chooseColor: !0
        });
        console.log(this.data.chooseColor), console.log(g), this.setData({
            troubleList: t.data.modelFaults,
            colorList: g
        }), t.getUserInfo(function(t) {
            o.setData({
                userInfo: t
            });
        });
    }
});