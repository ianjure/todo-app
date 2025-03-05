const dotenv = require("dotenv");
const { createClient } = require("redis");

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
redisClient.on("error", (error) => console.log("Redis client error!", error));

// Connect to Redis
redisClient.connect()
    .then(() => console.log(`Redis Connected: ${process.env.REDIS_HOST}`))
    .catch(error => console.error("Redis connection failed!", error));

module.exports = redisClient;