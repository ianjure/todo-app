const express = require("express");
const { createTodo } = require("../controllers/todo.controller");

const router = express.Router();

router.post("/api", createTodo);

module.exports = router;