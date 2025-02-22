const mongoose = require("mongoose");
const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    // code here
;}

const createTodo = async (req, res) => {
    const todo = req.body;

    if(!todo.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newTodo = new Todo(todo);

    try {
        await newTodo.save();
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTodo = async (req, res) => {
    // code here
};

const deleteTodo = async (req, res) => {
    // code here
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };