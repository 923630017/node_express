// jwt 签名和验证
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { screcretKey } = require('../config/config');

// 实现签名和验证的promise话
const signToken = promisify(jwt.sign);
const verifyToken = promisify(jwt.verify);

// 创建token
const createToken = async (val) => {
  return await signToken(val, screcretKey, {
    // 配置过期时间
    expiresIn: 60 * 60 * 24,
  });
};

// 验证token

// 解析验证token 需要验证有token得路由都需要 因此是路由中间件
const auth = async (req, res, next) => {
  // token 用户是存在headers中得
  let token = req.headers.authorization;
  // 获取token内容
  token = token ? token.split('Bearer ')[1] : null;
  if (!token) {
    return res.status(402).send({ message: '请传token', code: 400 });
  }
  try {
    // 解析jwt 必须带上密钥secretKey  和生成jwt时密钥一样
    const userInfo = await verifyToken(token, screcretKey);
    // 表示正确token 因此放行
    next();
  } catch (error) {
    // token 时间失效或者不对 时间失效jwt内部处理 不需要开发管
    return res.status(402).send({ message: 'token失效', code: 400 });
  }
};

module.exports = {
  createToken,
  auth,
};
