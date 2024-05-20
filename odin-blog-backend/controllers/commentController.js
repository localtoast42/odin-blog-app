const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

function isCommentAuthor(req, res, next) {
    Comment.findOne({ _id: req.params.commentId })
        .then((comment) => {
            if (comment.author.toString() === req.user.id) {
                return next();
            } else {
                return res.status(401).json({ success: false, msg: "Unauthorized" });
            }
        })
        .catch((err) => next(err));
};

exports.comment_list_get = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find({ post: req.params.postId })
        .sort({ timestamp: -1 })
        .populate("author", "username firstName lastName")
        .exec();

    const allCommentData = allComments.map(comment => {
        return {
            id: comment.id,
            author: comment.author,
            text: comment.text,
            postDateFormatted: comment.postDateFormatted,
            lastEditDateFormatted: comment.lastEditDateFormatted
        }
    })
  
    res.status(200).json(allCommentData);
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
            res.status(400).json(errors);
        } else {
            const newComment = await comment.save();
            res.status(201).json(newComment);
        };
    }),
];

exports.comment_update = [
    isCommentAuthor,

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
            res.status(400).json(errors);
        } else {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
            res.status(200).json(updatedComment);
        }
    }),
];

exports.comment_delete = [
    isCommentAuthor,

    asyncHandler(async (req, res, next) => {   
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).end();
    }),
];