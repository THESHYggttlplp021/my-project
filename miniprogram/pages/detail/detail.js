
// pages/detail/detail.js
let id;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    show: true,
    noLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    id = options.id;
    this.getData();
  },

  getData() {
    wx.cloud.callFunction({
      name: "get_Detail",
      data: {
        id: id
      }
    }).then(res => {
      this.setData({
        detail: res.result.data
      })
    })
  },

  previewImage(e) {
    console.log(e);
    var current = e.currentTarget.dataset.src;
    // console.log(this.data.detail.pic);
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.detail.pic, // 需要预览的图片http链接列表
    })
  },

  clickBtn(e) {
    //判断用户是否登陆
    const data = wx.getStorageSync('userInfo');
    if(!data){
      this.setData({
        noLogin:true
      })
    }else{
      this.setData({
        noLogin:false
      })
      this.setData({
        show: false
      })
    }
  },

  Login(){
    wx.switchTab({
      url: '../mine/mine',
    })
  },

  // 发送按钮
  send() {
    console.log(123);
  },

  onClose() {
    this.setData({ show: true });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})