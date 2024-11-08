const express = require("express");
const router = express.Router();
const {getTickets, createTicket} = require("../controllers/ticketController");

// Protect middleware.
const { protectRoute } = require("../middleware/authMiddleware");

// Create and protect our get and post routes.
// A user cannot get other user's tickets.
// Also, user cannot create a ticket for some other user.
router.route("/").get(protectRoute, getTickets).post(protectRoute, createTicket);

module.exports = router