const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

exports.user_list_get = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, "username firstName lastName").sort({ lastName: 1 }).exec();
    res.json(allUsers);
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
                res.redirect("/");
            });
        };
    }),
];

exports.user_update = [
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
            const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {});
            res.redirect(updatedUser.url);
        }
    }),
];

exports.user_delete = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.body.userid);
    res.redirect("/users");
});