Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    showAvatarUrl:'',
    avatarUrl:'',
    nickName:''
  },

  //获取用户信息
  async getUserInfo(){
    const { data } = await wx.cloud.database().collection("userinfo").doc(this.data.userId).get();
    this.setData({
      showAvatarUrl:data.avatarUrl,
      avatarUrl:data.avatarUrl,
      nickName:data.nickName
    })
  },

  //修改用户信息
  async submit(){
    const { nickName, userId, avatarUrl, showAvatarUrl } = this.data;
    let bufferAvatarUrl = '';
    wx.showLoading({
      title: '修改中...',
    })

    if(avatarUrl !== showAvatarUrl){
      bufferAvatarUrl = wx.getFileSystemManager().readFileSync(showAvatarUrl);
    }

    const data = await wx.cloud.callFunction({
      name:"update_UserInfo",
      data:{
        nickName,
        bufferAvatarUrl,
        userId
      }
    });

    wx.hideLoading();
    wx.navigateBack()
  },

  //修改头像
  async chooseImg(){
    const { tempFiles } = await wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType:['album','camera']
    })
    console.log(tempFiles[0]);
    this.setData({
      showAvatarUrl:tempFiles[0].tempFilePath
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userId:userInfo._id
      })

      this.getUserInfo()
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