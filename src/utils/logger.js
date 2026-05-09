const winston = require('winston');

const { combine, timestamp, errors, json, printf, colorize } = winston.format;
const isProd = process.env.NODE_ENV === 'production';

const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const base = `${timestamp} [${level}]: ${typeof message === 'object' ? JSON.stringify(message) : message}`;
  const metaStr = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
  return stack ? `${base}${metaStr}\n${stack}` : `${base}${metaStr}`;
});

const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'HH:mm:ss' }),
    errors({ stack: true }),
    isProd ? json() : devFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
