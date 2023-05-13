const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    userName:"",//用户昵称;
    avatarUrl:""//用户头像
  },

  //上传图片
  addImg(){

    wx.showActionSheet({
      itemList: ["上传图片"],
      success:res=>{
        if(res.tapIndex == 0){
          wx.chooseMedia({
            count:9,
            sizeType:['original'],
            sourceType:["album","camera"],
            success:res=>{

              wx.showLoading({
                title: '上传中',
              })

              //console.log(res.tempFiles);//图片的临时路径
              let time = Date.now();
              for(var i = 0; i < res.tempFiles.length; i++){
                wx.cloud.uploadFile({
                  cloudPath:"blogs.images/" + time + i,
                  filePath:res.tempFiles[i].tempFilePath
                }).then(res=>{
                  this.setData({
                    imageList:this.data.imageList.concat(res.fileID)
                  })
                  wx.hideLoading();
                  wx.showToast({
                    title: '上传成功',
                    icon:"success"
                  })
                })
              }
            }
          })
        }
      }
    })

    
  },

  //查看图片
  preview(e){
    console.log(e.currentTarget.dataset.src);
    wx.previewImage({
      current:e.currentTarget.dataset.src,
      urls: this.data.imageList
    })
  },

  submitBlog(e){
    let userInfo = wx.getStorageSync('userInfo')
    let userId = userInfo._id;db.collection("userinfo").doc(userId).get().then(res=>{
      console.log(res.data);
      this.setData({
        nickName:res.data.nickName,
        avatarUrl:res.data.avatarUrl
      })
    })
    
    if(!wx.getStorageSync('userInfo')){
      wx.showModal({
        title:"请先登录!",
        success:res=>{
          if(res.confirm == true){
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
      })
    }else if(e.detail.value.title == "" || e.detail.value.content == ""){
      wx.showToast({
        title: '请输入内容',
        icon:"error"
      })
    }else{
      
      
      wx.showModal({
        title: '确定发布？',
        complete: (res) => {
          if (res.confirm) {
            db.collection("blog").add({
              data:{
                pic:this.data.imageList,
                userimg:this.data.avatarUrl,
                username:this.data.nickName,
                content:e.detail.value.content,
                title:e.detail.value.title,
                readnum:0,
                like:0,
                type:"",
                _createTime:Date.now(),
                commentList:[]
              }
            }).then(res=>{
              wx.showToast({
                title: '发布成功',
                icon:"success"
              })
              wx.switchTab({
                url: '../today/today',
              })
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