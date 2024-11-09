const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote, deleteNote, updateNote } = require("../controllers/noteController");

// Protect route middleware.
const { protectRoute } = require("../middleware/authMiddleware");

// Create and protect our get and post routes.
router.route("/").get(protectRoute, getNotes).post(protectRoute, createNote);

// Create and protect our delete and put routes.
router.route("/:noteId").delete(protectRoute, deleteNote).put(protectRoute, updateNote);

module.exports = router