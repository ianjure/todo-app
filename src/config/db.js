const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config();

const connectDB = async (callback) => {
    try {
        // Connect to MongoDB
        const client = await mongoose.connect(process.env.MONGO_URI);
        
        // Check if the client is connected
        if (client) {
            console.log(`MongoDB Connected: ${client.connection.host}`);
            return callback(client);
        }

        // If the client is not connected, return null
        return callback(null);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;