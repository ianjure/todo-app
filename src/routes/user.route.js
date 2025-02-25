const express = require("express");
const { getUsers, createUser, deleteUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.post("/api", createUser);
router.delete("/api/:id", deleteUser);
router.post("/api/login", loginUser);

module.exports = router;