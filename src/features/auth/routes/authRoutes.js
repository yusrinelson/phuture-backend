const express = require("express");
const router = express.Router();
const { loginUser, signupUser, HandleRefreshToken, logoutUser} = require("../controllers/authController");

const {protect} = require("../../../middlewares/authorise")

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/refresh", HandleRefreshToken);
router.post("/logout", protect, logoutUser);

module.exports = router;