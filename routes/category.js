const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/categoryId', passport.authenticate('jwt', {session: false}), controller.remove);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:categoryId', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);

module.exports = router;
