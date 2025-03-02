const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");
// const todoRouter = require("./routes/todo.route");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
// app.use("/todo", todoRouter);

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