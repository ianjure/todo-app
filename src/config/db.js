const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (callback) => {
    try {
        const client = await mongoose.connect(process.env.MONGO_URI);
        
        if (client) {
            console.log(`MongoDB Connected: ${client.connection.host}`);
            return callback(client);
        }

        return callback(null);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;