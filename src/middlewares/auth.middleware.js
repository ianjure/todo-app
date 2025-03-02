const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.header("Authorization")?.split(" ")[1]; // Expected format: "Bearer <token>"

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in .env
        req.user = await User.findById(decoded.id).select("-password"); // Attach user to request (excluding password)

        if (!req.user) {
            return res.status(401).json({ success: false, message: "Invalid token. User not found." });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;