const express = require('express');
const controller = require('../controllers/category');
const router = express.Router();

router.get('/login', controller.getAll);
router.get('/:categoryId', controller.getById);
router.delete('/categoryId', controller.remove);
router.post('/', controller.create);
router.patch('/:categoryId', controller.update);

module.exports = router;
