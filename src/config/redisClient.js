const { createClient } = require("redis");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config();

// Create a Redis client
const redisClient = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// Log Redis client errors
redisClient.on("error", (err) => console.log("Redis client error!", err));

// Connect to Redis
redisClient.connect()
    .then(() => console.log(`Redis Connected: ${process.env.REDIS_HOST}`))
    .catch(err => console.error("Redis connection failed!", err));

module.exports = redisClient;