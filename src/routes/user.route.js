const express = require("express");
const { getUsers, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.get('/', authMiddleware(['user', 'admin']), getUsers);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;