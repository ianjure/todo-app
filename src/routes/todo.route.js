const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", authMiddleware(['user']), getTodos);
router.post("/", authMiddleware(['user']), createTodo);
router.patch("/:id", authMiddleware(['user']), updateTodo);
router.delete("/:id", authMiddleware(['user']), deleteTodo);

module.exports = router;