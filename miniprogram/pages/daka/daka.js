// pages/index/index.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    todayClick: false,
    clickStatusKey: '',
    clickListKey: 'clickListKey',
    clickList: [],
    listSize: '0'
  },
 
  /**
   * 点击打卡
   */
  punchTheClock() {
    if (this.data.todayClick) {
      //如果今天已打卡
    } else {
      wx.setStorageSync(this.data.clickStatusKey, true)
      let itemData = {
        date: this.getNowDate(),
        // date: '2021-7-10',
        status: true,
        desc: ''
      }
      this.getTodayClickStatus()
      let clickList = this.getClickList()
      this.setData({
        clickList: clickList
      })
      this.data.clickList.unshift(itemData)
      wx.setStorageSync(this.data.clickListKey, this.data.clickList)
      
      this.getClickDayCount()
    }
  },
  getClickList() {
    return wx.getStorageSync(this.data.clickListKey) || []
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      clickStatusKey: 'clickStatus_' + this.getNowDate()
    })
    this.getTodayClickStatus()
  },
  /**
   * 获取今天的打卡状态
   */
  getTodayClickStatus() {
    let status = wx.getStorageSync(this.data.clickStatusKey)
    if (status != null) {
      this.setData({
        todayClick: status
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.addUnPunchDay()
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getClickDayCount()
  },
  /**
   * 添加未打卡日期数据
   */
  addUnPunchDay() {
    //当前添加的日期
    let currentAddDate = ''
    let list = wx.getStorageSync(this.data.clickListKey) || []
    if (list.length == 0 || list[0].date == this.getNowDate()) {
      //从未打过卡或者最后一个打卡的是昨天
      return
    }
    currentAddDate = list[0].date
    //一直添加直到添加到昨天
    while (true) {
      if (currentAddDate >= this.getNowDate()) {
        return
      }
      currentAddDate = this.getAppointDayDate(currentAddDate, 1)
      //所有status为false,没打卡状态
      let itemData = {
        date: currentAddDate,
        status: false,
        desc: ''
      }
      //倒序把距离上一次打开的每一天都添加上
      list.unshift(itemData)
      if (currentAddDate == this.getAppointDayDate(this.getNowDate(), -1)) {
        console.log("添加到昨天之后跳出循环")
        break
      }
    }
    wx.setStorageSync(this.data.clickListKey, list)
  },
 
  /**
   * 获取指定日期的前几天或者后几天
   * day: -1前一天  1后一天
   */
  getAppointDayDate(date, day) {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
  },
 
  /**
   * 获取真正的打卡天数
   */
  getClickDayCount() {
    let clickList = this.getClickList()
    let clickSize = 0
    for (let index = 0; index < clickList.length; index++) {
      if (clickList[index].status) {
        clickSize++
      }
    }
    this.setData({
      listSize: clickSize
    })
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
  // 获取当前日期
  getNowDate: function () {
    let dateTime
    let YYYY = new Date().getFullYear()
    let MM = new Date().getMonth() + 1
    let DD = new Date().getDate()
    dateTime = YYYY + '-' + MM + '-' + DD
    return dateTime
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  },
 
  jumpDetail() {
    wx.navigateTo({
      url: '../listdetail/listdetail',
    })
  }
})