// 新增评论云函数
const cloud = require('wx-server-sdk')
var env = 'hsf-blog-product-xxxxx'; // 正式环境
// var env = 'xxxxxxxxxxxxx'; // 测试环境
cloud.init({
  env: env
})
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => {
  try {
    let res = await db.collection('comment').add({
      data: {
        _openid: event._openid,
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        comment: event.comment,
        create_date: event.create_date,
        flag: event.flag,
        article_id: event.article_id,
        timestamp: event.timestamp,
        childComment: [],
      }
    }).then(res => {
      return res;
    })
    await db.collection('article').doc(event.id).update({
      data: {
        comment_count: _.inc(1)
      }
    })
    return res;
  } catch (e) {
    console.error(e)
  }
}