//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  traceUser: true,
  env: 'cx-0b000a'
})
const db = wx.cloud.database({ env: 'cx-0b000a' })
const nsj = db.collection('nsj')
var cxid
Page({
  data: {
    name: '',
    code: '',
    text: '',
    note:'',
    note_title:'',
    note_hidden:true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  formSubmit: function (e) {
    
    if (e.detail.value.id != null){
      cxid = e.detail.value.id
      
    }
    else if(e.detail.value.id==null && e.detail.value!=null){
      cxid = e.detail.value
      
    }
    cxid = Number(cxid)
    this.setData({code:cxid})
    nsj.where({id: cxid,}).get({
        success: res => {
          console.log(res.data[0])
          if (res.data[0] ==null) {
            wx.showModal({
              content: '暂未收录该笔交易',
              showCancel: false
            })}
          else {
          this.setData({
            text: res.data[0].need,
            name:res.data[0].name,
          })
          if(res.data[0].note!=''){
            this.setData({
              note_title:'注意事项',
              note:res.data[0].note,
              note_hidden:false
            })
          }
          else{this.setData({note_hidden:true})}
          }
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
