Page({

  /**
   * 页面的初始数据
   */
  data: {
    myType: "",
    type_item: "",
    
    poems: null,
    current_page: 1,
    last_page: 1,
    index: 10,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      myType: options.type,
      type_item: options.type_item
    })
    wx.setNavigationBarTitle({
      title: '类型精选 | ' + options.type_item,
    })



    that.selectByType();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  selectByType: function() {
    let that = this;

    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getHomeData?name=' + that.data.myType,
      success: res => {
        if (res.data) {
          this.setData({
            poems: res.data.poems.data,
            current_page: res.data.poems.current_page,
            last_page: res.data.poems.last_page
          });
          wx.hideNavigationBarLoading()
        }
      }
    })
  },

  onReachBottom: function() {
    if (this.data.last_page < this.data.current_page) {
      return false;
    }
    wx.showNavigationBarLoading();
    let that = this;
    // Do something when page reach bottom.
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getHomeData?name=' + that.data.myType,
      data: {
        page: that.data.current_page + 1
      },
      success: res => {
        if (res.data) {
          this.setData({
            poems: that.data.poems.concat(res.data.poems.data),
            current_page: res.data.poems.current_page,
            last_page: res.data.poems.last_page
          });
          wx.hideNavigationBarLoading()
        }
      }
    })
  }

})