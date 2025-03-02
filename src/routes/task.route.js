const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task.controller");

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;