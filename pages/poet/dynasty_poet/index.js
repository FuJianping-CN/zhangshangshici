
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynasty:"",
    poets: null,
    current_page: 1,
    last_page: 1,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      dynasty:options.dynasty
    });
    wx.setNavigationBarTitle({
      title: "朝代名家 | "+that.data.dynasty+"名家"
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getPoetData?dynasty=' + that.data.dynasty,
      data: {
        page: 1
      },
      success: res => {
        if (res.data) {
          that.setData({
            poets: res.data.poets.data,
            current_page: res.data.poets.current_page,
            last_page: res.data.poets.last_page,
            total: res.data.poets.total
          });
          wx.hideNavigationBarLoading()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    wx.showNavigationBarLoading();
    if (that.data.current_page > that.data.last_page) {
      wx.hideNavigationBarLoading()
      return false;
    }
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getPoetData?dynasty='+that.data.dynasty,
      data:{
      },
      success: res =>{
        if(res.data){
          this.setData({
            poets: that.data.poets.concat(res.data.poets.data),
            current_page: res.data.poets.current_page,
            last_page: res.data.poets.last_page
          });
          wx.hideNavigationBarLoading()
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '古代诗人一览',
      path: '/pages/poet/index/index',
      // imageUrl:'/images/poem.png',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
});