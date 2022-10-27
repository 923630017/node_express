const { Schema } = require('mongoose');
const md5 = require('../until/md5')
// 定义Schema(骨架) 字段
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: val => md5(val),
    select: false
  },
  email: {
    type: String,
    require: true
  }
});

module.exports = userSchema


// 定义模型 如果数据库没有改模型 会默认创建这个集合