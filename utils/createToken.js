const jwt = require('jsonwebtoken');
const {
  JWT_SECRET_KEY,
  JWT_EXPIRE_TIME
} = process.env

const createToken = ({ id, role }) =>
  jwt.sign(
    { userId: id, role: role },
    JWT_SECRET_KEY,
    { expiresIn: JWT_EXPIRE_TIME, }
  );

module.exports = createToken;