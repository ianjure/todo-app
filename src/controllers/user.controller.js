const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        // Find all users and sort them by level and experience points in descending order
        const users = await User.find().select('-password').sort({ level: -1, exp: -1 });
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
;}

const deleteUser = async (req, res) => {
    // Get the user ID from the authenticated user
    const userId = req.user?._id;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ message: "User not found." });
    }

    try {
        // Find the user by ID and delete it
        const deleteUser = await User.findOneAndDelete({ _id: userId });
        return res.status(201).json({ success: true, message: "User deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getUsers, deleteUser };