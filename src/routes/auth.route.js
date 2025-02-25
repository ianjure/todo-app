const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);

module.exports = router;