// 路由
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const {
  registerValidator,
  loginValidator,
} = require('../middiware/validation/userValidation');
const { auth } = require('../until/jwt');
// const
router
  .post('/register', registerValidator, userController.register)
  .post('/login', loginValidator, userController.login)
  .get('/list', auth, userController.getList);

module.exports = router;
