Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      '../../images/lunbo/1.jpg',
      '../../images/lunbo/2.jpg',
      '../../images/lunbo/3.jpg',
      '../../images/lunbo/4.jpg',
      '../../images/lunbo/5.jpg'
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    Height: "",     //这是swiper要动态设置的高度属性

    themes1:[],
    themes1_types:[],
    themes2:[],
    themes2_types: [],
    themes3:[],
    themes3_types: [],

    dynasty1: [],
    dynasty2: [],
    dynasty3: [],
    dynasty4:[],

    recentTopic:[],

    poets1:[],
    poets2:[],
    poets3: [],
    poets4: [],

    typeArray1: ['诗经', '楚辞', '乐府'],
    typeArray2: ['小学古诗', '初中古诗', '高中古诗'],
    typeArray3: ['宋词精选', '古诗十九', '唐诗三百首'],
    typeArray4: ['宋词三百首', '古诗三百首'],

    typeObjectArray: ['shijing', 'chuci', 'yuefu', 'xiaoxue', 'chuzhong', 'gaozhong', 'songci', 'shijiu', 'tangshi', 'songcisanbai', 'sanbai'],

  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw + "px"
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: swiperH//设置高度
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    var that = this
    that.setThemes();
    that.setDynasty();
    that.setRecentHotTopic();
  },

//设置主题名句的主题数据
  setThemes:function() {
    var that = this
    var index
    var _themes1 = new Array()
    var _themes2 = new Array()
    var _themes3 = new Array()
    var _themes1_types = new Array()
    var _themes2_types = new Array()
    var _themes3_types = new Array()

    //加载主题themes
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getSentenceData', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       // console.log(res.data)
        for (index = 0; index < 4; index++) {
          _themes1.push(res.data.types[index].theme_name)
          _themes1_types.push(res.data.types[index].types)
        }
        for (index = 4; index < 8; index++) {
          _themes2.push(res.data.types[index].theme_name)
          _themes2_types.push(res.data.types[index].types)
        }
        for (index = 8; index < res.data.types.length; index++) {
          _themes3.push(res.data.types[index].theme_name)
          _themes3_types.push(res.data.types[index].types)
        }
        that.setData({
          themes1: _themes1,
          themes2: _themes2,
          themes3: _themes3,
          themes1_types: _themes1_types,
          themes2_types: _themes2_types,
          themes3_types: _themes3_types
        })
      }
    })
  },
  

  setDynasty: function () {
    var that = this
    var index
    var _dynasty1 = new Array()
    var _dynasty2 = new Array()
    var _dynasty3 = new Array()
    var _dynasty4 = new Array()
    //加载主题themes
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getPoemData', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (index = 0; index < 4; index++) {
          _dynasty1.push(res.data.dynasty[index])
        }
        for (index = 4; index < 8; index++) {
          _dynasty2.push(res.data.dynasty[index])
        }
        for (index = 8; index < 12; index++) {
          _dynasty3.push(res.data.dynasty[index])
        }
        for (index = 12; index < res.data.dynasty.length; index++) {
          _dynasty4.push(res.data.dynasty[index])
        }
        that.setData({
          dynasty1: _dynasty1,
          dynasty2: _dynasty2,
          dynasty3: _dynasty3,
          dynasty4: _dynasty4
        })
      }
    })
  },

  //当前热门
  setRecentHotTopic:function() {
    var that = this
    //加载主题themes
    wx.request({
      url: 'https://xuegushi.cn/wxxcx/getRecentTopic', //仅为示例，并非真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          recentTopic:res.data
        })
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})