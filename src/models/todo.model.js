const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ["To Do", "Priority", "In Progress", "Done"],
        default: "To Do"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;