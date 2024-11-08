const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// Description - Get user tickets
// Route - GET api/tickets
// Access - Private
const getTickets = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "getTickets" });
})

// Description - Create new ticket
// Route - POST api/tickets
// Access - Private
const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "createTicket" });
})

module.exports = {
    getTickets,
    createTicket
}