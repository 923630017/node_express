const crypto = require('crypto');

const md5 = (val) => {
  // MD5是一种常用的哈希算法 然后加密 最后返回十六进制
  return crypto.createHash('md5').update(val).digest('hex');
};

module.exports = md5