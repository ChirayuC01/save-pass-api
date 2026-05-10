const authService = require('../services/auth.service');
const { success } = require('../utils/apiResponse');

// SameSite=None is required when the frontend and backend are on different
// origins (e.g. save-pass-gold.vercel.app → save-pass-api.vercel.app).
// vercel.app is a public suffix, so different subdomains are treated as
// cross-site by the browser. SameSite=Strict would silently block the
// refresh-token cookie on every cross-site request.
// SameSite=None MUST be paired with Secure=true (https only).
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signup = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, keySalt } = await authService.signup(req.body);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken, keySalt }, 'Account created', 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, keySalt } = await authService.login(req.body);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken, keySalt }, 'Logged in');
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, keySalt } = await authService.refresh(req.cookies.refreshToken);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    success(res, { user, accessToken, keySalt }, 'Token refreshed');
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
