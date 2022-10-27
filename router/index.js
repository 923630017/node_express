// 路由
const express = require('express');
const router = express.Router();

// 份别引入个路由

const userRouter = require('./user');

router.use('/user', userRouter)




// 导出
module.exports = router;

