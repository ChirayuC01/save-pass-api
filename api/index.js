// Vercel serverless entry point.
// Vercel auto-detects files in api/ as serverless functions.
// This re-exports the Express app so Vercel can call it as a request handler.
module.exports = require('../index');
