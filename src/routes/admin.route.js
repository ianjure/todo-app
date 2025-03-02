const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { loginAdmin, signupAdmin } = require("../controllers/auth.controller");
const { getUsers, deleteUser } = require("../controllers/admin.controller");

const router = express.Router();

// router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.get("/users", authMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;