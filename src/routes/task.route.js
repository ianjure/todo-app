const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task.controller");

const router = express.Router();

router.get("/", authMiddleware(['user']), getTasks);
router.post("/", authMiddleware(['user']), createTask);
router.patch("/:id", authMiddleware(['user']), updateTask);
router.delete("/:id", authMiddleware(['user']), deleteTask);

module.exports = router;