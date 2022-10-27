const { body } = require('express-validator');
const { user } = require('../../model/index');
const validator = require('./errorBack');
const registerValidator = validator([
  body('name')
    .notEmpty()
    .withMessage('用户名不能为空')
    .bail()
    .isLength({ min: 6 })
    .withMessage('用户名不能少于6位')
    .bail()
    .custom(async (val) => {
      const userInfo = await user.findOne({ name: val });
      if (userInfo) {
        return Promise.reject('该用户名已存在');
      }
    })
    .bail(),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
    .bail()
    .isLength({ min: 6 })
    .withMessage('密码不能少于6位')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('邮箱必填')
    .bail()
    .isEmail()
    .withMessage('邮箱格式不正确')
    .bail()
    .custom(async (val) => {
      const userInfo = await user.findOne({ email: val });
      if (userInfo) {
        return Promise.reject('该邮箱已存在');
      }
    }),
]);
const loginValidator = validator([
  body('name').notEmpty().withMessage('用户名必填').bail(),
  body('password').notEmpty().withMessage('密码必填').bail(),
]);
module.exports = {
    registerValidator,
    loginValidator
}