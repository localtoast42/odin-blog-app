const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list_get);

router.post('/', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: process.env.FRONTEND_URL + "/login"
    }),  
    commentController.comment_create
);

router.put('/:id', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: process.env.FRONTEND_URL + "/login"
    }),   
    commentController.comment_update
);

router.delete('/:id', 
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: process.env.FRONTEND_URL + "/login"
    }),   
    commentController.comment_delete
);

module.exports = router;