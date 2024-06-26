const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    postDate: { type: Date, required: true },
    lastEditDate: { type: Date },
});

CommentSchema.virtual("url").get(function () {
    return `/posts/${this.post.id}/comments/${this._id}`;
});

CommentSchema.virtual("postDateFormatted").get(function () {
    return this.postDate ? DateTime.fromJSDate(this.postDate).toLocaleString(DateTime.DATETIME_SHORT) : '';
});

CommentSchema.virtual("lastEditDateFormatted").get(function () {
    return this.lastEditDate ? DateTime.fromJSDate(this.lastEditDate).toLocaleString(DateTime.DATETIME_SHORT) : '';
});

module.exports = mongoose.model("Comment", CommentSchema);