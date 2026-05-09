const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { error } = require('../utils/apiResponse');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Authentication required', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };
