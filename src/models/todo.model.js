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
        enum: ["To Do", "In Progress", "Done", "Priority"],
        default: "To Do"
    }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;