const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        res.status(500).json({ success: false, message: "User already exists. Please choose a different username." });
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            const newUser = new User({
                username: username,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({ success: true, data: newUser });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    try {
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            res.status(500).json({ success: false, message: "User does not exists." });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            res.status(500).json({ success: false, message: "You entered the wrong password." });
        }
        else {
            res.status(201).json({ success: true, message: "Logged-in successfully!" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { registerUser, loginUser };