const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.comment_list_get = asyncHandler(async (req, res, next) => {
    const allComments = await Comment.find()
        .sort({ timestamp: 1 })
        .populate("author")
        .exec();
  
    res.render("comment_list", { title: "Comments", user: req.user, comment_list: allComments });
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
            post: req.body.postid,
            timestamp: Date.now(),
        });

        if (!errors.isEmpty()) {
            return;
        } else {
            await comment.save();
            res.redirect('/');
        };
    }),
];

exports.comment_update = [];

exports.comment_delete = asyncHandler(async (req, res, next) => {    
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect("/comments");
});