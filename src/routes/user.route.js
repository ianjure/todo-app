const express = require("express");
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/api", createUser);

module.exports = router;