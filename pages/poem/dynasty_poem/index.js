
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poems: null,
    current_page: 1,
    last_page: 1,
    types: ["全部","诗","词","曲","文言文"],
    dynasty:"",
    total: 0,
    selected_type:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dynasty:options.dynasty
    })
    wx.setNavigationBarTitle({
      title: '朝代名作',
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '古诗文',
      path: '/pages/poem/index/index',
      // imageUrl:'/images/poem.png',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  
  selectByDynastyAndType: function (e) {
    let that = this;
    this.setData({
      selected_type: e.currentTarget.id
    });
    wx.setNavigationBarTitle({
      title: that.data.dynasty + ' | ' + that.data.selected_type
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getPoemData?dynasty=' + that.data.dynasty + '&type=' + that.data.selected_type,
      data: {
        page: 1
      },
      success: res =>{
        if(res.data){
          that.setData({
            poems: res.data.poems.data,
            current_page: res.data.poems.current_page,
            last_page: res.data.poems.last_page,
            total: res.data.poems.total
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
      url: 'https://xuegushi.cn/wxxcx/getPoemData?dynasty=' + that.data.dynasty + '&type=' + that.data.selected_type,
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
});