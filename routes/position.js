const express = require('express');
const controller = require('../controllers/position');
const router = express.Router();

router.get('/:categoryId', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:positionId', controller.update);
router.delete('/:positionId', controller.remove);

module.exports = router;
