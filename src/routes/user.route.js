const express = require("express");
const { getUsers, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/api/leaderboard", getUsers);
router.delete("/api/:id", deleteUser);

module.exports = router;