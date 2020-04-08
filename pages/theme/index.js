Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "",
    theme_types: [],
    poems: null,
    current_page: 1,
    last_page: 1,
    total_pages: 0,

    selected_type:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    var list = options.types.split(",");
    var _types = new Array()
    for (var i = 0; i < list.length; i++) {
      _types.push(list[i]);
    }
    this.setData({
      theme: options.theme,
      theme_types: _types,
    })

    wx.setNavigationBarTitle({
      title: '类型精选 | ' + options.theme,
    })
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

  selectByThemeAndType: function(e) {
    let that = this;

    this.setData({
      selected_type: e.currentTarget.id
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getSentenceData?theme=' + that.data.theme + '&type=' + that.data.selected_type,
      data: {
        page: 1
      },
      success: res => {
        if (res.data) {
          that.setData({
            poems: res.data.poems.data,
            current_page: res.data.poems.current_page,
            last_page: res.data.poems.last_page,
            total_pages: res.data.poems.total
          });
          wx.hideNavigationBarLoading()
        }
      }
    })
  },

  // 到底部刷新
  onReachBottom: function () {
    if (this.data.last_page < this.data.current_page) {
      return false;
    }
    wx.showNavigationBarLoading();
    let that = this;
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getSentenceData?theme=' + that.data.theme + '&type=' + that.data.selected_type,
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
  },

  // 跳转到搜索页面
  searchSentenceBySelf: function() {
    wx.switchTab({
      url: '/pages/search/search',
    })
  }
})