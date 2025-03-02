const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { signupUser, loginUser } = require("../controllers/auth.controller");
const { getUsers } = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get('/', authMiddleware, getUsers);

module.exports = router;