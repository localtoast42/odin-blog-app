const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, minLength: 3, maxLength: 100 },
    text: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    publishedDate: { type: Date },
});

PostSchema.virtual("url").get(function () {
    return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);