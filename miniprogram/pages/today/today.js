// pages/today/today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
  },


  getData(size=0){
    wx.cloud.callFunction({
      name:"get_Blok",
      data:{
        size:size
      }
    }).then(res=>{
      if(res.result.data <= 0){
        this,this.setData({
          loading:false
        })
      }
      let oldData = this.data.listArr;
      let newData = oldData.concat(res.result.data);
      this.setData({
        listArr:newData
      })
    })
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
    this.getData(this.data.listArr.length);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})