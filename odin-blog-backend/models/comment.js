const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

CommentSchema.virtual("url").get(function () {
    return `/posts/${this.post.id}/comments/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);