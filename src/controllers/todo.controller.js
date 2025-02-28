const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    // code here
};

const createTodo = async (req, res) => {
    // code here
};

const updateTodo = async (req, res) => {
    // code here
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id; // Get the ToDo ID from the request parameters
        const userId = req.user?._id; // Get the authenticated user's ID

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(404).json({ message: "Invalid todoId" });
        }

        // Find the todo by ID and user ID and delete it
        const deletedTodo = await Todo.findOneAndDelete({
            _id: todoId,
            user: userId, // Ensure the todo belongs to the authenticated user
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };