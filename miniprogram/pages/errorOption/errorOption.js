// pages/errorOption/errorOption.js
const app = getApp();

let titles = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      errorItem:[],
      current:0,
      optionList:["A", "B", "C", "D"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //1.从本地缓存获取
    let arr = wx.getStorageSync('error');
    let errArr = wx.getStorageSync('errorItem')

    if(arr && arr.length > 0){
      
      this.setData({
        list:arr,
        errorItem:errArr
      })
      console.log(this.data.list);
      console.log(this.data.errorItem);
    }

    //2.从全局变量获取
    // console.log("全局变量", app.globalData.globalErrorOption);
  },

  next(){
    let currentNum = this.data.current + 1;
    if(currentNum === this.data.list.length){
      wx.showModal({
        title: '您已完成复习',
        complete: (res) => {
          if (res.cancel) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
      
          if (res.confirm) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      })
    }else{
      this.setData({
        current:currentNum
      })
    }
  },

  last(){
    let currentNum = this.data.current - 1;
    if(currentNum < 0){
      wx.showToast({
        title: '没有上一题',
        icon:"error"
      })
    }else{
      this.setData({
        current:currentNum
      })
    }
   
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