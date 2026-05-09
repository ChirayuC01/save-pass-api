const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { mongoUri } = require('./env');

const connect = async () => {
  await mongoose.connect(mongoUri);
  logger.info('MongoDB connected');
};

module.exports = { connect };
