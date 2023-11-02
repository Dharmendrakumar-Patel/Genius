const express = require('express');
const router = express.Router();

const { signup, login, logout, deleteUser, getUserByToken } = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/deleteUser/:userId").delete(deleteUser);
router.route("/getUserByToken").post(getUserByToken);

module.exports = router;