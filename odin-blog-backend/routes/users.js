const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.post('/', userController.user_create);

router.update('/:id', userController.user_update);

router.delete('/:id', userController.user_delete);

module.exports = router;