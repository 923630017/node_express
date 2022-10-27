const { user } = require('../model/index');
const { createToken } = require('../until/jwt')
exports.getList = async (req, res, next) => {
  const list = await user.find();
  console.log(233232);
  res.status(200).send({
    code: 200,
    data: list,
  });
};

exports.register = async (req, res, next) => {
  // 模型实例话
  const userIntance = new user(req.body);
  try {
    const user = await userIntance.save();
    user.delete.password;
    res.status(200).send({
      code: 200,
      message: '保存成功',
      ...user,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: '保存失败',
    });
  }
};
exports.login = async (req, res, next) => {
    
  try {
    let userinfo = await user.findOne(req.body);
    if (!userinfo) {
      res.status(401).send({
        code: 400,
        message: '用户名或者密码错误',
      });
    }
    // 将用户信息json
    userinfo = userinfo.toJSON();

    // 创建token
    const token = await createToken(userinfo)
    res.status(200).json({
      code: 200,
      message: '登录成功',
      token,
      ...userinfo,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: '服务器错误',
    });
  }
};
