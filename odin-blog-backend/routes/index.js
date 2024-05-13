const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const usersRouter = require('./users');
const postsRouter = require('./posts');

router.post('/login', userController.user_login);

router.use('/users', usersRouter)
router.use('/posts', postsRouter)

module.exports = router;
