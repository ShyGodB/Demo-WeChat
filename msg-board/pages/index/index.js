//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: "",
    msg: []
  },
  changeInputValue(ev) {
    this.setData({
      inputValue: ev.detail.value
    })
  },
  delMsg(ev) {
    var n = ev.target.dataset.index;
    var list = this.data.msg;
    list.splice(n, 1);
    this.setData({
      msg: list
    })
  },
  addMsg() {
    var list = this.data.msg;
    console.log(list)
    list.push({
      msg:this.data.inputValue
    });
    this.setData({
      msg: list,
      inputValue: ''
    })
  }
})
