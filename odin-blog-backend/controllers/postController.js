const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

function isAuthor(req, res, next) {
    if (req.user.isAuthor){
        next();
    } else {
        return res.status(401).json({ success: false, msg: "Not an author" });
    };
};

exports.post_get = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId)
        .populate("author")
        .exec();

    const postData = {
        id: post.id,
        title: post.title,
        text: post.text,
        publishedDate: post.publishedDate,
        author: post.author.fullName,
    }
  
    res.json(postData);
});

exports.post_list_get = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}, "title publishedDate")
        .sort({ publishedDate: -1 })
        .populate("author", "firstName lastName")
        .exec();
  
    res.json(allPosts);
});

exports.post_create = [
    isAuthor(req, res, next),

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
            res.redirect(process.env.FRONTEND_URL + post.url);
        };
    }),
];

exports.post_update = [
    isAuthor(req, res, next),

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
            _id: req.params.postId,
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
            const updatedPost = await Post.findByIdAndUpdate(req.params.postId, post, {});
            res.redirect(process.env.FRONTEND_URL + updatedPost.url);
        };
    }),
];

exports.post_delete = [
    isAuthor(req, res, next),

    asyncHandler(async (req, res, next) => {    
        await Comment.deleteMany({ post: req.params.postId });
        await Post.findByIdAndDelete(req.params.postId);
        res.redirect(process.env.FRONTEND_URL + '/posts');
    }),
]