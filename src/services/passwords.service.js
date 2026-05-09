const Password = require('../models/Password.model');

const getAll = (userId) => Password.find({ userId }).sort({ createdAt: -1 });

const create = (userId, { encryptedData, iv }) =>
  Password.create({ userId, encryptedData, iv });

const update = async (userId, id, { encryptedData, iv }) => {
  const doc = await Password.findOneAndUpdate(
    { _id: id, userId },
    { $set: { encryptedData, iv } },
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
