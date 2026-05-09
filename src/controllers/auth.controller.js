const authService = require('../services/auth.service');
const { success } = require('../utils/apiResponse');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signup = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.signup(req.body);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken }, 'Account created', 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken }, 'Logged in');
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.refresh(req.cookies.refreshToken);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken }, 'Token refreshed');
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie('refreshToken', COOKIE_OPTIONS);
  success(res, null, 'Logged out');
};

const me = (req, res) => {
  success(res, { userId: req.user.sub });
};

module.exports = { signup, login, refresh, logout, me };
