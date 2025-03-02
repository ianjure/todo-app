const express = require("express");

const { getUsers, createUser, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.post("/api", createUser);
router.delete("/api/:id", deleteUser);

module.exports = router;