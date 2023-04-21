Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  toAnswer(){
    const data = wx.getStorageSync('userInfo');
    if(data){
      wx.navigateTo({
        url: '../answer/answer',
      })
    }else{
      wx.showModal({
        title: '请先登录...',
        complete: (res) => {
          if (res.cancel) {
            
          }
          if (res.confirm) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      })
    }
  },

  toRank(){
    const data = wx.getStorageSync('userInfo');
    if(data){
      wx.navigateTo({
        url: '../rank/rank',
      })
    }else{
      wx.showModal({
        title: '请先登录...',
        complete: (res) => {
          if (res.cancel) {
            
          }
          if (res.confirm) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //排行榜
    //将所有答题用户的最终结果降序排列，展示头像和昵称以及答对的数量
    //当用户答题完成，将其基本信息存入数据库
    //获取用户的头像和昵称
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