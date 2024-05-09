const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.post_list_get = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find()
        .sort({ timestamp: 1 })
        .populate("author")
        .exec();
  
    res.render("post_list", { title: "Posts", user: req.user, post_list: allPosts });
});

exports.post_create = [
    body("title")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Title must be provided."),
    body("text")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Post must not be empty."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            author: req.user.id,
            text: req.body.text,
        });

        if (!errors.isEmpty()) {
            return;
        } else {
            await post.save();
            res.redirect('/');
        };
    }),
];

exports.post_update = [
    body("title")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Title must be provided."),
    body("text")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Post must not be empty."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            _id: req.params.id,
            title: req.body.title,
            author: req.user.id,
            text: req.body.text,
        });

        if (req.body.isPublished) {
            post.isPublished = true;
            post.publishedDate = Date.now();
        };

        if (!errors.isEmpty()) {
            return;
        } else {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {});
            res.redirect(updatedPost.url);
        };
    }),
];

exports.post_delete = asyncHandler(async (req, res, next) => {    
    await Comment.deleteMany({ post: req.params.id });
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
});