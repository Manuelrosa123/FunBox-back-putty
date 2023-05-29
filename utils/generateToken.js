const jwt = require('jsonwebtoken');
const User = require('../models/user');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  
function createToken(email, password) {
  return User.findOne({ email, password })
    .then(user => {
      if (!user) {
        console.log('User not found');
        return null;
      }
      else{
        console.log('User found!');
        const payload = { userId: user._id };
        const secret = generateRandomString(20);
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secret, options);

        return {"token":token, "user":user };
      }
    });
}

module.exports = {createToken:createToken};
