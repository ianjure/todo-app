const cors = require('cors');
const express = require("express");
const connectDB = require("./config/db");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));
app.use('/api/admin', adminRouter);
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

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