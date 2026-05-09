const Password = require('../models/Password.model');

const getAll = (userId) => Password.find({ userId }).sort({ createdAt: -1 });

const create = (userId, { site, username, password }) =>
  Password.create({ userId, site, username, password });

const update = async (userId, id, data) => {
  const doc = await Password.findOneAndUpdate(
    { _id: id, userId },
    { $set: data },
    { returnDocument: 'after', runValidators: true }
  );
  if (!doc) {
    const err = new Error('Password entry not found');
    err.statusCode = 404;
    throw err;
  }
  return doc;
};

const remove = async (userId, id) => {
  const doc = await Password.findOneAndDelete({ _id: id, userId });
  if (!doc) {
    const err = new Error('Password entry not found');
    err.statusCode = 404;
    throw err;
  }
  return doc;
};

module.exports = { getAll, create, update, remove };
