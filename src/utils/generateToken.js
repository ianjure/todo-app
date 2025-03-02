const jwt = require('jsonwebtoken');

function generateToken(id, role) {
    // Generate an access token
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };