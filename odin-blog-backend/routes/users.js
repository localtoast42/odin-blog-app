const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/self', 
    passport.authenticate('jwt', { session: false }), 
    userController.user_self_get
);

router.post('/', userController.user_create);

router.put('/:userId',
    passport.authenticate('jwt', { session: false }), 
    userController.user_update
);

router.delete('/:userId',
    passport.authenticate('jwt', { session: false }),
    userController.user_delete
);

module.exports = router;