const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 100 },
    password: { type: String, required: true },
    firstName: { type: String, required: true, maxLength: 100 },
    lastName: { type: String, required: true, maxLength: 100 },
    isAuthor: { type: Boolean, default: false },
});

UserSchema.virtual("fullName").get(function () {
    let fullName = "";
    if (this.firstName && this.lastName) {
        fullName = `${this.firstName} ${this.lastName}`;
    }
  
    return fullName;
});

UserSchema.virtual("url").get(function () {
    return `/users/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);