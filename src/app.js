const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { clientUrl } = require('./config/env');
const v1Routes = require('./routes/v1');
const { errorHandler, notFound } = require('./middleware/errorHandler.middleware');
const logger = require('./utils/logger');

const app = express();

app.use(cors({
  origin: clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
    });
  });
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.use('/api/v1', v1Routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
