const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
    // code here
;}

const createUser = async (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    // code here
};

module.exports = { getUsers, createUser, deleteUser };