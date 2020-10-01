const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

const encrypt = (password) =>{
    
    hashedPassword = bcrypt.hashSync(String(password), BCRYPT_SALT_ROUNDS)
    return  hashedPassword
}

const comparePassword = (password, hashedPassword)=>{    

    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {encrypt, comparePassword}



