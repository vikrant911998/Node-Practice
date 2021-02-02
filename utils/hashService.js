const bcrypt = require('bcryptjs');

const hashService = {
  generateHash: (input_string) =>{
    return bcrypt.hash(input_string,8);
  },
  comparePasswordHash: (password, hash) =>{
    return bcrypt.compare(password,hash);
  }
};

module.exports = hashService;