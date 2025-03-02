const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
    // code here
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
    // code here
}

module.exports = { getUsers, createUser, deleteUser };