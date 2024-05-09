const express = require('express');
const router = express.Router();

const commentsRouter = require('./comments');

const postController = require('../controllers/postController');

router.get('/', postController.post_list_get);

router.post('/', postController.post_create);

router.update('/:id', postController.post_update);

router.delete('/:id', postController.post_delete);

module.exports = router;