const jwt = require('jsonwebtoken');

function generateToken(id) {
    // Generate an access token
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;