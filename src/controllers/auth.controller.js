const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const Admin = require('../models/admin.model');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const signupUser = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(500).json({ success: false, message: "User already exists. Please choose a different username." });
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        try {
            const newUser = new User({
                username: username,
                password: hashedPassword
            });
            await newUser.save();
            return res.status(201).json({ success: true, message: "Signed-up successfully!", data: newUser });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
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
            return res.status(500).json({ success: false, message: "User does not exists." });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(500).json({ success: false, message: "You entered the wrong password." });
        }
        else {
            const token = generateToken(existingUser._id, 'user');
            return res.status(201).json({ success: true, message: "Logged-in successfully!", token: token });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    try {
        const existingAdmin = await Admin.findOne({ username: username });
        if (!existingAdmin) {
            return res.status(500).json({ success: false, message: "Admin does not exists." });
        }

        const validPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!validPassword) {
            return res.status(500).json({ success: false, message: "You entered the wrong password." });
        }
        else {
            const token = generateToken(existingAdmin._id, 'admin');
            return res.status(201).json({ success: true, message: "Logged-in successfully!", token: token });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { signupUser, loginUser, loginAdmin };