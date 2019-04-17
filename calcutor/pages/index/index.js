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
        result: ""
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
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
})
