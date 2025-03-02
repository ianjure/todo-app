const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ["To Do", "Priority", "In Progress", "Done"],
        default: "To Do"
    }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;