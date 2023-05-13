Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    record:0
  },

  //登陆
  async login(){
    //1.用户授权获取信息
    const{ userInfo } = await wx.getUserProfile({
      desc: '获取用户信息',
    })

    //2.将当前用户信息交给后端，存储生成账号
    
    const { result } = await wx.cloud.callFunction({
      name:"Login",
      data:{
        nickName:userInfo.nickName,
        avatarUrl:userInfo.avatarUrl
      }
    })

    //将用户信息进行存储
    wx.setStorageSync('userInfo', result.data)

    this.setData({
      userInfo:result.data
    })
  },

  //获取用户信息
  async getUser(){
    //判断用户是否登陆
    const data = wx.getStorageSync('userInfo');
    if(data){
      //登陆了，更新数据
      const userInfo = await wx.cloud.database().collection('userinfo').doc(data._id).get()
      this.setData({
        userInfo:userInfo.data
      })
    }
  },

  //退出登陆
  exit(){
    wx.clearStorage()
    this.setData({
      userInfo:null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid');
    const error = wx.getStorageSync('error');
    this.setData({
      record:error.length
    })
    console.log(this.data.record);
    
    if(!openid){
      wx.cloud.callFunction({
        name:"getOpenId",
        success:(res)=>{
          const { result:{ openid } } = res;
          wx.setStorageSync('openid', openid)
        }
      })
    }
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
    this.getUser();
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