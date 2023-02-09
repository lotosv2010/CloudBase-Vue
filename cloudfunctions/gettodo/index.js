const app = require("./db");

const getTodo = async () => {
  // 2. 构造查询语句
  const result = await app
    // collection() 方法获取一个集合的引用
    .collection("todo")
    // where() 方法传入一个 query 对象，数据库返回集合中字段等于指定值的 JSON 文档。
    // .where({
    //   name: "The Catcher in the Rye"
    // })
    // get() 方法会触发网络请求，往数据库取数据
    .get()
  return result
}

exports.main = async (event, context) => {
  return getTodo();
};
