// 这是项目初始话
const express = require('express');
const cors = require('cors');
const app = express();
// 路由
const router = require('./router/index');
// 中间件
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/api/v1',router);

// 请求路径没有时报错
app.use((req, res) => {
  res.status(403).send({
    code: 9001,
    message: '请求路径不存在',
  });
});
// 请求服务端内部错误 内部逻辑错误
app.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: '服务器错误',
  });
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
});
