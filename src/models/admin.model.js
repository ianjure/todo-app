const mongoose = require("mongoose");

// Define the admin schema
const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;