Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    VIPlist:[],
    workList:[],
    suanfaList:[],
    baguwenList:[],
    promoteList:[],
    qualiList:[],
    swiper:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getVIP();
    this.getWork();
    this.getSuanfa();
    this.getBaguwen();
    this.getPromote();
    this.getQual();
    this.getSwiper();
  },

  getSwiper(){
    wx.cloud.callFunction({
      name:"get_Swiper"
    }).then(res=>{
      this.setData({
        swiper:res.result.data
      })
    })
  },

  //获取热门书籍数据
  getData(){
    wx.cloud.callFunction({
      name:"get_Book"
    }).then(res=>{
      this.setData({
        dataList:res.result.data
      })
    })
  },

  //获取VIP书籍数据
  getVIP(){
    wx.cloud.callFunction({
      name:"get_VIPbooks"
    }).then(res=>{
      this.setData({
        VIPlist:res.result.data
      })
    })
  },

  //获取求职书籍数据
  getWork(){
    wx.cloud.callFunction({
      name:"get_Work"
    }).then(res=>{
      
      this.setData({
        workList:res.result.data
      })
    })
  },

  //获取求职书籍数据
  getSuanfa(){
    wx.cloud.callFunction({
      name:"get_Suanfa"
    }).then(res=>{
      this.setData({
        suanfaList:res.result.data
      })
    })
  },
  
  //获取八股文书籍数据
  getBaguwen(){
    wx.cloud.callFunction({
      name:"get_Baguwen"
    }).then(res=>{
      
      this.setData({
        baguwenList:res.result.data
      })
    })
  },

  //获取综合提升书籍数据
  getPromote(){
    wx.cloud.callFunction({
      name:"get_Promote"
    }).then(res=>{
      
      this.setData({
        promoteList:res.result.data
      })
    })
  },

  //获取品质书籍
  getQual(){
    wx.cloud.callFunction({
      name:"get_Qual"
    }).then(res=>{
      
      this.setData({
        qualiList:res.result.data
      })
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