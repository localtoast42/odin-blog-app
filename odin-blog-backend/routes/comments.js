const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.get('/', commentController.comment_list_get);

router.post('/', commentController.comment_create);

router.put('/:id', commentController.comment_update);

router.delete('/:id', commentController.comment_delete);

module.exports = router;