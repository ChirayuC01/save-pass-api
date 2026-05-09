const passwordsService = require('../services/passwords.service');
const { success } = require('../utils/apiResponse');

const getAll = async (req, res, next) => {
  try {
    const passwords = await passwordsService.getAll(req.user.sub);
    success(res, passwords);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const password = await passwordsService.create(req.user.sub, req.body);
    success(res, password, 'Password saved', 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const password = await passwordsService.update(req.user.sub, req.params.id, req.body);
    success(res, password, 'Password updated');
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await passwordsService.remove(req.user.sub, req.params.id);
    success(res, null, 'Password deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, remove };
