const mongoose = require('mongoose');
const userSchema = require('./userModel');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

main()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  });

// 导出model
module.exports = {
  //模型构造函数
  user: mongoose.model('User', userSchema),
};
