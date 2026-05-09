const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { jwtSecret, jwtRefreshSecret, jwtExpiry, jwtRefreshExpiry } = require('../config/env');

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ sub: userId }, jwtSecret, { expiresIn: jwtExpiry });
  const refreshToken = jwt.sign({ sub: userId }, jwtRefreshSecret, { expiresIn: jwtRefreshExpiry });
  return { accessToken, refreshToken };
};

const signup = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.statusCode = 400;
    throw err;
  }
  if (password.length < 8) {
    const err = new Error('Password must be at least 8 characters');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({ email, password });
  return { user, ...generateTokens(user._id.toString()) };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  return { user, ...generateTokens(user._id.toString()) };
};

const refresh = async (token) => {
  if (!token) {
    const err = new Error('Refresh token required');
    err.statusCode = 401;
    throw err;
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtRefreshSecret);
  } catch {
    const err = new Error('Invalid or expired refresh token');
    err.statusCode = 401;
    throw err;
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 401;
    throw err;
  }

  return { user, ...generateTokens(user._id.toString()) };
};

module.exports = { signup, login, refresh };
