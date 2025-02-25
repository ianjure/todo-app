const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ level: -1, exp: -1 });
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
;}

const deleteUser = async (req, res) => {
    // code here
};

module.exports = { getUsers, deleteUser };