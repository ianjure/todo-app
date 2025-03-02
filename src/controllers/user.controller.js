const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ level: -1, exp: -1 });
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
;}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, deleteUser };