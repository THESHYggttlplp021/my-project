// pages/answer/answer.js
const db = wx.cloud.database();

const app = getApp();

let errorOption = [];
let errorItm = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:"",
    status:"",
    list:[],
    answerNow:0,
    optionList:["A", "B", "C", "D"],
    successNum:0,
    errNum:0,
    percent:0
  },

  selector(e){
    const { item } = e.currentTarget.dataset;
    

    //1.用户选择的选项目
    //2.该选项时正确的还是错误的
    //3.给用户提示，进行背景色的替换
    //4.跳转下一个题目
    const answer = this.data.list[this.data.answerNow].answer;

    if(item === answer){
      //正确
      this.setData({
        select:item,
        status:"success",
        successNum:this.data.successNum + 1,
      })
    }else{
      //错误
      var errorSub = this.data.list[this.data.answerNow];
      var errorItem = item
      
      errorOption.push(errorSub);
      errorItm.push(errorItem);

      wx.setStorageSync('error', errorOption);
      wx.setStorageSync('errorItem', errorItm);

      // app.globalData.globalErrorOption = errorOption;
      // console.log(errorOption);

      this.setData({
        select:item,
        status:"fail",
        errNum:this.data.errNum + 1
      })
    }

    if(this.data.answerNow == this.data.list.length - 1){
      wx.showModal({
        title: '恭喜你',
        content: `你已完成所有题目，共答对${this.data.successNum}题，答错${this.data.errNum}题，错题可以在“我的错题中查看”`,
        showCancel:false,
        success:()=>{
          const { avatarUrl, nickName } = wx.getStorageSync('userInfo');
          const num = this.data.successNum;
          const time = new Date().getTime();

          //数据库中有没有当前用户的答题记录。有则判断本次答对数量是否大于数据库中的，是则替换，否则添加
          const openid = wx.getStorageSync("openid");
          db.collection("answer").where({
            _openid:openid,
          }).get({
            success:(res)=>{
              const { data } = res;
              
              if(data.length > 0){
                if(data[0].num < num){
                  db.collection("answer").doc(data[0]._id).update({
                    data:{
                      num,
                      avatarUrl
                    }
                  });
                }
              }else{
                db.collection("answer").add({ 
                  data:{
                    avatarUrl,
                    nickName,
                    num,
                    time
                  },
                  success:(res)=>{
                    console.log(res);
                    
                  }
                });
              }

              wx.switchTab({
                url: '../text/text',
              })
            }
          });
          

         
        }
      })
    }else{
      setTimeout(()=>{
        this.setData({
          answerNow:this.data.answerNow + 1,
          status:"",
          select:""
        })
      }, 500);
    }

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

    wx.cloud.callFunction({
      name: "get_dataStruct",
    }).then(res => {
      
      this.setData({
        list:res.result.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})