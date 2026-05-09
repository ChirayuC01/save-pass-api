const { Router } = require('express');
const passwordsController = require('../../controllers/passwords.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { validate, schemas } = require('../../middleware/validate.middleware');

const router = Router();

router.use(authenticate);

router.get('/', passwordsController.getAll);
router.post('/', validate(schemas.savePassword), passwordsController.create);
router.put('/:id', validate(schemas.updatePassword), passwordsController.update);
router.delete('/:id', passwordsController.remove);

module.exports = router;
