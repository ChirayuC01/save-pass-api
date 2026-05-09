const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { mongoUri } = require('./env');

// Cache the connection across serverless function invocations.
// On Vercel, function instances are reused between requests within the same
// container — reusing the existing connection avoids a new TCP handshake.
let cached = global._mongooseConn ?? null;

const connect = async () => {
  if (cached && mongoose.connection.readyState === 1) return cached;
  cached = await mongoose.connect(mongoUri);
  global._mongooseConn = cached;
  logger.info('MongoDB connected');
};

module.exports = { connect };
