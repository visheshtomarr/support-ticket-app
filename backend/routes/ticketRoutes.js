const express = require("express");
const router = express.Router();
const {getTickets, getTicket, createTicket, deleteTicket, updateTicket} = require("../controllers/ticketController");

// Protect middleware.
const { protectRoute } = require("../middleware/authMiddleware");

// Create and protect our get and post routes.
// A user cannot get other user's tickets.
// Also, user cannot create a ticket for some other user.
router.route("/").get(protectRoute, getTickets).post(protectRoute, createTicket);

// Route to get a single ticket.
router.route("/:id")
.get(protectRoute, getTicket)
.delete(protectRoute, deleteTicket)
.put(protectRoute, updateTicket);

module.exports = router