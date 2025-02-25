const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    const userId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    try {
        const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 }); // Get user's todos, sorted by newest first
        return res.status(200).json({ success: true, data: todos });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const createTodo = async (req, res) => {
    const { description, status } = req.body;
    const userId = req.params.id || req.user?._id; // Extract user ID from params or authenticated user

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "User not found." });
    }

    if(!description) {
        return res.status(400).json({ success: false, message: "Please create a task." });
    }

    if (!userId) {
        return res.status(401).json({ success: false, message: "User ID is required." });
    }

    try {
        const newTodo = new Todo({
            description: description,
            status: status,
            user: userId
        });
        await newTodo.save();
        return res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateTodo = async (req, res) => {
    // code here
};

const deleteTodo = async (req, res) => {
    // code here
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };