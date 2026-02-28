const express = require("express");
const router = express.Router();
const { loginUser, signupUser, HandleRefreshToken, logoutUser} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/refresh", HandleRefreshToken);
router.post("/logout", logoutUser);

module.exports = router;