const express = require("express");
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", getTodos);
router.post("/api", createTodo);
router.patch("/api/:id", updateTodo);
router.delete("/api/:id", deleteTodo);

module.exports = router;