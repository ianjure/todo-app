const express = require("express");

const connectDB = require("./config/db");

const User = require("./models/user.model");
const Todo = require("./models/todo.model");

const app = express();

app.use(express.json());

// Route: POST /api/products - Create a Product
app.post("/user/create", async (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newUser = new User(user); // create a new product with the data sent by the user

    try {
        await newUser.save(); // save the product to the database
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

app.post("/todo/create", async (req, res) => {
    const todo = req.body;

    if(!todo.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newTodo = new Todo(todo); // create a new product with the data sent by the user

    try {
        await newTodo.save(); // save the product to the database
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        console.error("Error in creating product: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

connectDB((client) => {
    if (client) {
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        })
    } else {
        console.log("Error connecting to database!");
        process.exit(1);
    }
});