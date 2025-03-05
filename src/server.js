const express = require("express");
const connectDB = require("./config/db");
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");

const app = express();

app.use(express.json());
app.use('/api/admin', adminRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

connectDB((client) => {
    if (client) {
        app.listen(3000, () => {
            console.log("Server: http://localhost:3000");
        })
    } else {
        console.log("Error connecting to database!");
        process.exit(1);
    }
});