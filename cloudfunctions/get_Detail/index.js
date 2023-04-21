// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "turing-5gubqv7a09691a78" }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id;
  return await db.collection("blog").doc(id).get();
}