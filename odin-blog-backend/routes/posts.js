const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentsRouter = require('./comments');

const postController = require('../controllers/postController');

router.use('/:postId/comments', commentsRouter);

router.get('/', 
    passport.authenticate('jwt', { session: false }),
    postController.post_list_get
);

router.get('/:postId', 
    passport.authenticate('jwt', { session: false }), 
    postController.post_get
);

router.post('/', 
    passport.authenticate('jwt', { session: false }), 
    postController.post_create
);

router.put('/:postId', 
    passport.authenticate('jwt', { session: false }),  
    postController.post_update
);

router.delete('/:postId', 
    passport.authenticate('jwt', { session: false }), 
    postController.post_delete
);

module.exports = router;