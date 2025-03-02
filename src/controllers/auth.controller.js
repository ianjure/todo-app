const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Admin = require('../models/admin.model');
const generateToken = require("../utils/generateToken");

const signupUser = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check if the username and password are provided
    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(500).json({ success: false, message: "User already exists. Please choose a different username." });
    
    // If the user does not exist, hash the password and save the user
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
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check if the username and password are provided
    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res.status(500).json({ success: false, message: "User does not exists." });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(500).json({ success: false, message: "You entered the wrong password." });
        }

        // If the password is correct, generate a token and send it to the user
        else {
            const token = generateToken(existingUser._id);
            return res.status(200).json({ success: true, message: "Logged-in successfully!", token: token });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const signupAdmin = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check if the username and password are provided
    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ username: username });
    if (existingAdmin) {
        return res.status(500).json({ success: false, message: "Admin already exists. Please choose a different username." });
    
    // If the admin does not exist, hash the password and save the admin
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        try {
            const newAdmin = new Admin({ username: username, password: hashedPassword });
            await newAdmin.save();
            return res.status(201).json({ success: true, message: "Signed-up successfully!", data: newAdmin });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

const loginAdmin = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;

    // Check if the username and password are provided
    if(!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }
    
    try {
        // Check if the admin exists
        const existingAdmin = await Admin.findOne({ username: username });
        if (!existingAdmin) {
            return res.status(500).json({ success: false, message: "Admin does not exists." });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!validPassword) {
            return res.status(500).json({ success: false, message: "You entered the wrong password." });
        }

        // If the password is correct, generate a token and send it to the admin
        else {
            const token = generateToken(existingAdmin._id);
            return res.status(201).json({ success: true, message: "Logged-in successfully!", token: token });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { signupUser, loginUser, signupAdmin, loginAdmin };