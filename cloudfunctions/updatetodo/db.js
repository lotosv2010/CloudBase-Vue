
const cloudbase = require('@cloudbase/node-sdk')

const cloudDb = cloudbase.init({
  env: 'robin-4g8t276zfdd0395e',
  secretId: 'AKIDzwpX8VeZFhvufDajdhX9WfbJ9l9IDwLW',
  secretKey: 'zmMiqjXQOCpIXYKcsAMUQ9evyoPmxufB'
})

// 1. 获取数据库引用
var db = cloudDb.database();

module.exports = db;