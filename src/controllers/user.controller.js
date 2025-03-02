// $env:MONGO_URI="mongodb://localhost:27017/todoapp" - for testing
const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users! Please try again!" });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Account successfully created!" });

    } catch (error) {
        res.status(500).json({ message: "Failed to create account! Please try again." });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ message: "User does not exist!" });

        res.json({ message: "User successfully removed!" });

    } catch (error) {
        res.status(500).json({ message: "Failed to delete user! Please try again." });
    }
}

module.exports = { getUsers, createUser, deleteUser };