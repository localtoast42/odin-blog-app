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
        isPublished: post.isPublished,
        publishedDateFormatted: post.publishedDateFormatted,
        author: post.author.fullName,
    }
  
    res.status(200).json(postData);
});

exports.post_list_get = asyncHandler(async (req, res, next) => {
    const filter = req.user.isAuthor ? {} : { isPublished: true };

    const allPosts = await Post.find(filter, "title isPublished publishedDate")
        .sort({ publishedDate: -1 })
        .populate("author", "firstName lastName")
        .exec();

    const allPostData = allPosts.map(post => {
        return {
            id: post.id,
            title: post.title,
            isPublished: post.isPublished,
            publishedDateFormatted: post.publishedDateFormatted,
            author: post.author.fullName
        }
    })
  
    res.status(200).json(allPostData);
});

exports.post_create = [
    isAuthor,

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = new Post({
            title: req.body.title,
            author: req.user.id,
            text: req.body.text,
        });

        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const newPost = await post.save();
            res.status(201).json(newPost);
        };
    }),
];

exports.post_update = [
    isAuthor,

    body("title")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Title must be provided."),
    body("text")
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const post = await Post.findOne({ _id: req.params.postId });

        post.title = req.body.title;
        post.text = req.body.text;

        if (!post.isPublished && req.body.isPublished) {
            post.isPublished = true;
            post.publishedDate = Date.now();
        };

        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {});
            res.status(200).end();
        };
    }),
];

exports.post_delete = [
    isAuthor,

    asyncHandler(async (req, res, next) => {    
        await Comment.deleteMany({ post: req.params.postId });
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).end();
    }),
]