const db = wx.cloud.database();
let id;

Page({
  data: {
    userId: '',
    showAvatarUrl: '',
    fileID: '',
    nickName: ''
  },

  /* 获取用户信息 */
  async getUserInfo(){
    const { data } = await wx.cloud.database().collection('userinfo').doc(this.data.userId).get()
    this.setData({
      showAvatarUrl: data.avatarUrl,
      fileID: data.avatarUrl,
      nickName: data.nickName
    })
  },

  /* 选择头像 */
  async chooseImg(){
    const { tempFiles } = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType:["original", "compressed"]
    })

    this.setData({
      showAvatarUrl: tempFiles[0].tempFilePath
    })
  },

  /* 修改信息 */
  async submit(){
    const that = this;
    const { nickName, userId, fileID, showAvatarUrl } = this.data;
    let bufferAvatarUrl = ''
    wx.showLoading({
      title: '修改中...',
    })

    if(fileID !== showAvatarUrl){
      bufferAvatarUrl = wx.getFileSystemManager().readFileSync(showAvatarUrl)
    }

    const data = await wx.cloud.callFunction({
      name: 'update_UserInfo',
      data: {
        nickName,
        bufferAvatarUrl,
        userId 
      }
    })

    id = wx.getStorageSync('openid')
    

    
    db.collection("blog").where({ _openid:id }).update({
      data:{
        userimg:fileID,
        username:nickName
      }
    }).then(res=>{
      console.log(res);
    })

    wx.cloud.callFunction({
      name:"Update_Blog",
      data:{
        id,
        nickName,
        fileID
      }
    }).then(res=>{
      
    })

    wx.cloud.callFunction({
      name:"Update_reply",
      data:{
        id,
        nickName,
        fileID
      }
    }).then(res=>{
      console.log(res);
    })

    
    wx.hideLoading()

    wx.navigateBack({
      delta: 1,
    })
  },


  onLoad(){
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userId: userInfo._id
      })

      this.getUserInfo()
    }

    
  }
})