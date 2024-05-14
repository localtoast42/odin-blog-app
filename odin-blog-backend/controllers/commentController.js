const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.comment_list_get = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({ post: req.params.postId })
        .sort({ timestamp: 1 })
        .populate("author", "firstName lastName")
        .exec();
  
    res.json(allComments);
});

exports.comment_create = [
    body("text")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Comment must not be empty."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            author: req.user.id,
            text: req.body.text,
            post: req.params.postId,
            postDate: Date.now(),
        });

        if (!errors.isEmpty()) {
            return;
        } else {
            await comment.save();
            res.redirect(process.env.FRONTEND_URL + comment.url);
        };
    }),
];

exports.comment_update = [
    body("text")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Comment must not be empty."),
  
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            text: req.body.text,
            lastEditDate: Date.now(),
        });
  
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
            res.redirect(process.env.FRONTEND_URL + updatedComment.url);
        }
    }),
];

exports.comment_delete = asyncHandler(async (req, res, next) => {    
    await Comment.findByIdAndDelete(req.params.commentId);
    res.redirect(process.env.FRONTEND_URL + '/comments');
});