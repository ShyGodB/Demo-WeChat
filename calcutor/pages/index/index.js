const app = getApp()

Page({
    data: {
        gasoline: [
            {
                type: '0#',
                price: 7
            }, 
            {
                type: '89#',
                price: 7
            }, 
            {
                type: '90#',
                price: 7
            }, 
            {
                type: '92#',
                price: 7
            },
            {
                type: '93#',
                price: 7
            }
            , 
            {
                type: '95#',
                price: 7
            }
            , 
            {
                type: '97#',
                price: 7
            },
            {
                type: '98#',
                price: 7
            }
        ],
        car: "Car",
        user: "true",
        index: "",
        amount: "",
        trip: "",
        result: "",
        gasolineType: "89#",
        gasolinePrice: "7.01",
        place: "广东",
        onOff: false,
        defaultPlace: '深圳',
        region: ['','深圳',''],
        customItem: '全部',
        userSet: false,
        cars:['hat'],
        add: '添加'
    },
    changePlace(ev) {
        console.log(ev);
    }, 
    changePrice(ev) {
        this.setData({
            price: ev.detail.value
        });
    },
    changeAmount(ev) {
        this.setData({
            amount: ev.detail.value
        });
    },
    changeTrip(ev) {
        this.setData({
            trip: ev.detail.value
        });
    },
    calculate(ev) {
        const index = Number(this.data.index);
        const price = this.data.gasoline[index].price;
        const amount = Number(this.data.amount);
        const trip = Number(this.data.trip);
        this.setData({
            result: price * amount * trip
        });
    },
    changeCar(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindPickerChange(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            onOff: true,
            index: e.detail.value
        })
    },
    uploadData() {
        const that = this;
        const index = Number(this.data.index);
        const price = this.data.gasoline[index].price;
        const amount = Number(this.data.amount);
        const trip = Number(this.data.trip);
        const result = price * amount * trip;
        console.log(result);
        wx.request({
            url: "https://www.tripspend.com:8888/index",
            method: "post",
            data: {
                result: result
            },
            header: {
                "Content-Type": "application/json"
            },
            success(res) {
                console.log(res.data);
                that.setData({
                    result: result
                })
            },
            fail(err) {
                console.log(err);
            },
            complete() {
                console.log("完成");
            }
        });
    },
    bindRegionChange(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            userSet: true,
            region: e.detail.value
        })
    }
    // onLoad() {
    //     const that = this;
    //     const place = that.data.place;
    //     const url = `https://api.jisuapi.com/oil/query?appkey=62ea23ffe7a3a991&province=${place}`;
    //     wx.request({
    //         url: url,
    //         method: "get",
    //         header: {
    //             "Content-Type": "application/json"
    //         },
    //         success(res) {
    //             console.log(res.data.result);
    //             that.setData({
    //                 gasoline: res.data.result,
    //                 place: res.data.result.province
    //             });
    //             console.log(that.data.gasoline)
    //         },
    //         fail(err) {
    //             console.log(err);
    //         },
    //         complete() {
    //             console.log("完成");
    //             // that.setData({
    //             //     gasolineType: that.data.gasoline[0].type,
    //             //     gasolinePrice: that.data.gasoline[0].price
    //             // });
    //         }
    //     });
    // }
})


/*
 * 启动小程序
 * 1、获取用户信息（并上传到服务器端，存储至数据库 -- 第一次）
 * 2、将用户的默认数据展示到指定位置
 * 
 * 
 * 用户默认信息设置
 * 1、无默认数据 => 弹窗提醒用户是否将数据设置为默认，并告知设置默认数值的位置，设置与否都不再进行二次弹窗
 * 2、用户设置默认数据后，上传，存储到对应的用户信息中 
 * 
 * 
 * 需要用户设置的默认数据：
 * 1、油价
 * 2、油耗
 * 3、车辆
 * 4、地区 ---- 也可以在页面加载时自动定位
 * 
 * 
 * 用户数据分析 
 * 1、总值  =>  总次数、总开销、总路程
 * 2、平均  =>  平均路程、开销、油耗
 * 3、数据展示  =>  可以考虑画图 ---- 折线图
 */
