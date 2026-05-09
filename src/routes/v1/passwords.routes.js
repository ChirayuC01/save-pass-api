const { Router } = require('express');
const passwordsController = require('../../controllers/passwords.controller');
const { authenticate } = require('../../middleware/auth.middleware');

const router = Router();

router.use(authenticate);

router.get('/', passwordsController.getAll);
router.post('/', passwordsController.create);
router.put('/:id', passwordsController.update);
router.delete('/:id', passwordsController.remove);

module.exports = router;
