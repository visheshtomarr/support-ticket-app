const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { protectRoute } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
// We want this route to be protected.
router.get("/me", protectRoute, getMe);

module.exports = router;