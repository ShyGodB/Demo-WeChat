//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        html:[{
            name: "h2",
            attrs: {
                class: "main_title",
                style: "color: red"
            },
            children: [{
                type: "text",
                text: "来一场愉快的旅途吧:"
            }]
        }],
        gasoline: [
            {
                type: '89#',
                price: 7.43
            }, {
                type: '92#',
                price: 7.01
            }
            , {
                type: '95#',
                price: 7.59
            }
        ],
        user: "true",
        index: "",
        amount: "",
        trip: "",
        result: "",
        gasolineType: "",
        gasolinePrice: '',
        onOff: false
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
            url: 'https://www.tripspend.com:8888/index',
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
                // console.log(this)
            },
            fail(err) {
                console.log(err);
            },
            complete() {
                console.log("完成");
            }
        })
    },
    onLoad() {
        this.setData({
            gasolineType: this.data.gasoline[0].type,
            gasolinePrice: this.data.gasoline[0].price
        })
    }
})
