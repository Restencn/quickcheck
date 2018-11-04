//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  traceUser: true,
  env: 'cx-0b000a'
})
const db = wx.cloud.database({ env: 'cx-0b000a' })
const sj = db.collection('sj')
var cxid
Page({
  data: {
    motto: 'Hello World',
    hello: '123',
    text: '开始查询吧1',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  formSubmit: function (e) {
    cxid = e.detail.value.id
    cxid=Number(cxid)
    console.log(cxid)
    sj.where({id: cxid,}).get({
        success: res => {
          this.setData({
            text: res.data[0].need
          })
        }
      })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
