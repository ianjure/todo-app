const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    task: {
        type: String,
        required: true,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["To Do", "Priority", "In Progress", "Done"],
        default: "To Do"
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;