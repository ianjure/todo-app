const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    exp: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;