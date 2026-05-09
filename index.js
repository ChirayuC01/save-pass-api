require('dotenv').config();
require('./src/config/env');

const { connect } = require('./src/config/database');
const app = require('./src/app');
const logger = require('./src/utils/logger');
const { port } = require('./src/config/env');

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
