const express = require("express");
const {signup, login, logout, getMe} = require("../controllers/auth.controller");
const {verifyToken} = require("../middleware/verifyToken");


const router = express.Router();

router.get("/getme", verifyToken, getMe)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports.authRoutes = router