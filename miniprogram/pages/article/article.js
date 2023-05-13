let id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentList:'',
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    id = options.id
    this.getData();
  },

  getData(e){
    wx.cloud.callFunction({
      name:"getArticle",
      data:{
        id
      }
    }).then(res=>{
      let newContent = res.result.data.content.replace(/\<img/g, '<img style="width:100%;height:auto;display:block"');
      this.setData({
        dataList:res.result.data,
        contentList:newContent
      })
      
    })
  },

  richTextClick(){
    // 富文本
    const richContent = this.data.dataList.content;
    // 判断含有图片
    if (richContent.indexOf("src") >= 0) {
        const imgs = [];
        richContent.replace(/]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
            imgs.push(capture);
        })
        wx.previewImage({
            current: imgs[0], // 当前显示图片的链接
            urls: imgs
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