// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "turing-5gubqv7a09691a78" }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event) => {
  const { nickName, avatarUrl } = event
  const { OPENID } = cloud.getWXContext()

  //检查用户是否重复注册过
  const { data } = await await db.collection("userinfo").where({
    _openId:OPENID
  }).get()

  if(data.length == 0){
    //数据库中没有当前用户信息，注册
    const { _id } = await db.collection("userinfo").add({
      data:{
        nickName,
        avatarUrl,
        money:0,
        sign:"没有人永远18岁",
        goal:0,
        record:0,
        _openId:OPENID
      }
    })

    const user = await db.collection("userinfo").doc(_id).get()

    return {
      data:user.data
    }
  }else{
    //登陆
    return {
      data:data[0]
    }
  }

 

  return {
    data
  }
}