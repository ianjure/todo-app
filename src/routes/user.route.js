const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { signupUser, loginUser } = require("../controllers/auth.controller");
const { getLeaderboard, getStatus } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get('/leaderboard', authMiddleware, getLeaderboard);
router.get('/', authMiddleware, getStatus);

module.exports = router;