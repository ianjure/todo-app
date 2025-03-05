const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisClient");

const authMiddleware = async (req, res, next) => {
    // Get the token from the header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    // Check if token is blacklisted in Redis
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
        return res.status(401).json({ success: false, message: "Token is blacklisted." });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object
        req.user = verified;

        // Move to the next middleware
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;