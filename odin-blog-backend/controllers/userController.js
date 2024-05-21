const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const utils = require('../lib/utils');
const { JsonWebTokenError } = require("jsonwebtoken");

function isUserCreator(req, res, next) {
    User.findOne({ _id: req.params.userId })
        .then((user) => {
            if (user.id === req.user.id) {
                return next();
            } else {
                return res.status(401).json({ success: false, msg: "Unauthorized" });
            }
        })
        .catch((err) => next(err));
};

exports.user_login = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ success: false, msg: "Incorrect username" });
        };
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, msg: "Incorrect password" });
        }
        const tokenObject = utils.issueJWT(user);
        res
            .status(200)
            .json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
    } catch(err) {
        return next(err);
    }
});

exports.user_logout = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .cookie('jwt', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        })
        .end();
});

exports.user_list_get = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, "username firstName lastName").sort({ lastName: 1 }).exec();
    res.json(allUsers);
});

exports.user_self_get = asyncHandler(async (req, res, next) => {
    const user = {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username
    }

    res.json(user);
});

exports.user_create = [
    body("username")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Username must be provided.")
        .isAlphanumeric()
        .withMessage("Username has non-alphanumeric characters."),
    body("password")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Password must be provided."),
    body("confirm_password")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Password must be provided.")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Passwords must match."),
    body("firstName")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("First name must be provided.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("lastName")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Last name must be provided.")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            isAuthor: !(undefined===req.body.isAuthor),
            username: req.body.username,
        });

        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if (err) {
                    return next(err);
                }
                user.password = hashedPassword;
                const result = await user.save();
                res.redirect(process.env.FRONTEND_URL + '/login');
            });
        };
    }),
];

exports.user_update = [
    isUserCreator,

    body("firstName")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("First name must be provided.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("lastName")
        .trim()
        .isLength( { min: 1 })
        .escape()
        .withMessage("Last name must be provided.")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters."),
  
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
  
        if (!errors.isEmpty()) {
            res.send(errors.array());
        } else {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, user, {});
            res.redirect(process.env.FRONTEND_URL + updatedUser.url);
        }
    }),
];

exports.user_delete = [
    isUserCreator,

    asyncHandler(async (req, res, next) => {
        await User.findByIdAndDelete(req.params.userId);
        res.redirect(process.env.FRONTEND_URL + '/users');
    }),
];