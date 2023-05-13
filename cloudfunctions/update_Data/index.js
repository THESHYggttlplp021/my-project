// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  let { id,nickName,avatarUrl } = event;
  let inc = 1;
  
  let res1 = await db.collection("blogUser").where({
    openid
  }).get();

  if(res1.data.length){

    let res2 = await db.collection("blogUser").where({
      openid,
      id:_.all([id])
    }).count();

    //如果已经点赞，则取消点赞
    if(res2.total){
      //删除
      await db.collection("blogUser").where({
        openid
      }).update({
        data:{
          id:_.pull(id)
        }
      })
      inc = -1;
    }else{
      //追加
      await db.collection("blogUser").where({
        openid
      }).update({
        data:{
          id:_.addToSet(id)
        }
      })
    }
    
  }else{

    await db.collection("blogUser").add({
      data:{
        id:[id],
        nickName,
        avatarUrl,
        openid
      }
    })

  }

  //修改点赞数量
  return await db.collection("blog").doc(id).update({
    data:{
      like:_.inc(inc)
    }
  })
}