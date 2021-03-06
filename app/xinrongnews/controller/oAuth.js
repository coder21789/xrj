const crypto = require('crypto');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports.__controller__ = false;

exports.state = async function (ctx) {
  var data = 'xinrongnews';
  var key = 'Password!';
  var encrypted = aesEncrypt(data, key);
  var decrypted = aesDecrypt(encrypted, key);

  if(ctx.query.state && ctx.query.state == encrypted){
    return {
      state: true, 
      encrypted: encrypted
    };
  }else{
    return {
      state: false,
      encrypted: encrypted
    };
  }
}
//console.log(exports.state);
// 设置为非路由
