const express = require('express');
const passport = require('passport');
const router = express.Router({mergeParams: true});

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list_get);

router.post('/', 
    passport.authenticate('jwt', { session: false }),  
    commentController.comment_create
);

router.put('/:commentId', 
    passport.authenticate('jwt', { session: false }),   
    commentController.comment_update
);

router.delete('/:commentId', 
    passport.authenticate('jwt', { session: false }),   
    commentController.comment_delete
);

module.exports = router;