const express = require('express');
const router = express.Router();

const commentsRouter = require('./comments');

const postController = require('../controllers/postController');

router.use('/comments', commentsRouter);

router.get('/', postController.post_list_get);

router.get('/:id', postController.post_get);

router.post('/', postController.post_create);

router.put('/:id', postController.post_update);

router.delete('/:id', postController.post_delete);

module.exports = router;