const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote } = require("../controllers/noteController");

// Protect route middleware.
const { protectRoute } = require("../middleware/authMiddleware");

// Create and protect our get route.
router.route("/").get(protectRoute, getNotes).post(protectRoute, createNote);

module.exports = router