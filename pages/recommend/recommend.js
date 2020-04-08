//index.js
const app = getApp()
const jinrishici = require('../../utils/jinrishici.js')
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    gushi: "",
    title: "",
    author: "",
    dynasty: "",
    content: "",
    translate: "",
    matchTags: [],
    ipAddress: ""
  },

  onLoad: function () {
    // if (!wx.cloud) {
    //   wx.redirectTo({
    //     url: '../chooseLib/chooseLib',
    //   })
    //   return
    // }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onPullDownRefresh: function () {
    jinrishici.load(result => {
      // 下面是处理逻辑示例
     // console.log(result.data.origin.translate)
      
      this.setData({
        gushi: result.data.content,
        title: result.data.origin.title,
        matchTags: result.data.matchTags,
        ipAddress: result.ipAddress,
        author: result.data.origin.author,
        dynasty: result.data.origin.dynasty,
        content: result.data.origin.content,
        translate: result.data.origin.translate
      })

      if (result.data.origin.translate == null){
        this.setData({ translate: "额...抱歉！未获取到这首诗的翻译哦...敬请期待数据更新..." })
      } else {
        this.setData({ translate: result.data.origin.translate })
      }
    })
    wx.stopPullDownRefresh()
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  }

})