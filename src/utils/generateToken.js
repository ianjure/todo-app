const jwt = require('jsonwebtoken');

function generateToken(id) {
    // Generate an access token with the user ID
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = generateToken;