const { z } = require('zod');
const { error } = require('../utils/apiResponse');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    // Zod v4 uses .issues; fall back to .errors for v3 compatibility
    const issues = result.error.issues ?? result.error.errors ?? [];
    const messages = issues.map((e) => e.message);
    return error(res, 'Validation failed', 400, messages);
  }
  req.body = result.data;
  next();
};

const schemas = {
  signup: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),

  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),

  savePassword: z.object({
    encryptedData: z.string().min(1, 'Encrypted data is required'),
    iv: z.string().length(24, 'IV must be 24 hex characters (12 bytes)'),
  }),

  updatePassword: z.object({
    encryptedData: z.string().min(1, 'Encrypted data is required'),
    iv: z.string().length(24, 'IV must be 24 hex characters (12 bytes)'),
  }),
};

module.exports = { validate, schemas };
