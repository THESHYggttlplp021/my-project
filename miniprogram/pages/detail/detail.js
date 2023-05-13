let id;
const db = wx.cloud.database();
const _ = db.command;
let speak = "";
let reply = "";
let index;
let idx;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    show: true,
    noLogin:false,
    likeShow:false,
    list:[],
    showReply:false,
    value:"",
    replyVal:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    id = options.id;

    const detail = this.data.detail;
    wx.cloud.callFunction({
      name:"get_Data"
    }).then(res=>{
      
      for(let i = 0; i < res.result.list[0].id.length; i++){
        this.setData({
          list:res.result.list[0].id
        })
      }

      if(this.data.list.indexOf(id) >= 0){
        this.setData({
          likeShow:true
        })
      }else{
        this.setData({
          likeShow:false
        })
      }

    })

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
  send(e) {
    
    
    let userInfo = wx.getStorageSync('userInfo');
    let userId = userInfo._id;
    console.log(userId);

    let openId = wx.getStorageSync('openid')
    if(speak == ""){
      wx.showToast({
        title: '请输入内容',
        icon: "error"
      })
    }else{
      // if(!this.data.detail.commentList){
      //   //第一条评论
      //   let commentList = [{
      //     nickName:userInfo.nickName,
      //     avatarUrl:userInfo.avatarUrl,
      //     comment:speak,
      //     openId:openId,
      //     createTime:Number(new Date()),
      //     commentId:`id_${openId}_${Number(new Date())}`,
      //     replyComment:[]
      //   }]
      //   db.collection("blog").doc(id).update({
      //     data:{
      //       commentList
      //     }
      //   }).then(res=>{
      //     this.getData();
      //     wx.showToast({
      //       title: '评论完成',
      //       icon:"success"
      //     })
      //     this.setData({
      //       show:true
      //     })
      //   })
      // }else{
        let newCommentList = [{
          nickName:userInfo.nickName,
          avatarUrl:userInfo.avatarUrl,
          comment:speak,
          openId:openId,
          createTime:Number(new Date()),
          commentId:`id_${openId}_${Number(new Date())}`,
          replyComment:[]
        }];
        
        this.data.detail.commentList.push(newCommentList)
        console.log(this.data.detail.commentList);
        db.collection("blog").doc(id).update({
          data:{
            commentList:_.push(newCommentList)
          }
        }).then(res=>{
          this.getData();
          wx.showToast({
            title: '评论完成',
            icon:"success"
          })
          this.setData({
            show:true,
            value:""
          })
        })
      //}
    }
  },

  //回复评论
  replyComment(e){
    index = e.currentTarget.dataset.id;
    idx = this.data.detail.commentList[index].commentId;
    this.replySend(index, idx);
    this.setData({
      showReply:true
    })
  },

  //获取回复
  getReplyComment(e){
    this.setData({
      replyVal:e.detail.value
    })
    reply = this.data.replyVal
  },

  //回复按钮
  replySend(){

    let userInfo = wx.getStorageSync('userInfo');
    let openId = wx.getStorageSync('openid')
    
    
    if(this.data.replyVal == ""){
      wx.showToast({
        title: '请输入内容',
        icon:"error"
      })
    }else{
      
        
      let replyComment = {
        nick:userInfo.nickName,
        avatar:userInfo.avatarUrl,
        reComment:reply,
        openid:openId,
        time:Number(new Date())
      }

      this.data.detail.commentList[index].replyComment.push(replyComment);

      console.log(this.data.detail.commentList);

      db.collection("blog").doc(id).update({
        data:{
          commentList:this.data.detail.commentList
        }
      }).then(res=>{
        this.getData();
        wx.showToast({
          title: '添加成功',
          icon:"success"
        })
        this.setData({
          showReply:false,
          replyVal:""
        })
      })
    }
  },

  //获取输入内容
  getComment(e){
    this.setData({
      value:e.detail.value
    })
    console.log(this.data.value);
    speak = this.data.value
  },

  onClose() {
    this.setData({ 
      show: true,
      showReply:false 
    });
  },

  //点赞
  clickLike(e){

    let data = wx.getStorageSync('userInfo');
    if(data && data.nickName){
      let { id } = e.currentTarget.dataset;
      let detail = this.data.detail;

      console.log(this.data.list);

      if(this.data.list.indexOf(id) >= 0){
        this.setData({
          likeShow:false,
        })
        detail.like--
      }else{
        this.setData({
          likeShow:true
        })
        detail.like++
      }

      data.likeShow = !data.likeShow;

      
      this.setData({
        detail
      })

      wx.cloud.callFunction({
        name:"update_Data",
        data:{
          id,
          nickName:data.nickName,
          avatarUrl:data.avatarUrl
        }
        }).then(res=>{
          console.log(res);
        })
    }else{
      wx.showModal({
        title: '请先登录',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            wx.switchTab({
              url: '../mine/mine',
            })
          }
        }
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
  onShow:function() {
    this.readNumAdd();
  },

  readNumAdd(){
    db.collection("blog").doc(id).update({
      data:{
        readnum:_.inc(1)
      }
    })
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