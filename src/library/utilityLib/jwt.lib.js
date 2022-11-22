const jwt = require('jsonwebtoken');
const { JWT_SECRET } = JSON.parse(process.env.AUTH);

class JWT {

    createJwtToken(userObj) {
        return jwt.sign(userObj, JWT_SECRET, {});
    }
}

module.exports = new JWT;
