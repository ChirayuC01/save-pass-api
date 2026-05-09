require('dotenv').config();
require('./src/config/env');

const { connect } = require('./src/config/database');
const app = require('./src/app');
const logger = require('./src/utils/logger');
const { port } = require('./src/config/env');

if (require.main === module) {
  connect()
    .then(() => {
      app.listen(port, () => {
        logger.info(`Server running on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      logger.error('Failed to connect to database', err);
      process.exit(1);
    });
}

// Vercel imports this file as a module and calls the exported value as the
// serverless handler. DB connection is ensured per-request in app.js.
module.exports = app;
