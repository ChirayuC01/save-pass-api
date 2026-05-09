const { Router } = require('express');
const authRoutes = require('./auth.routes');
const passwordsRoutes = require('./passwords.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/passwords', passwordsRoutes);

module.exports = router;
