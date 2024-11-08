const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// Description - Get user tickets
// Route - GET api/tickets
// Access - Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
})

// Description - Get user ticket
// Route - GET api/tickets/:id
// Access - Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.id);

    // If ticket with the passed id does not exist.
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found!");
    }

    // Only the ticket owner can fetch their ticket.
    if(ticket.user.toString() !== req.user.id) {
        // Unauthorized user
        res.status(401);
        throw new Error("Not Authorized!");
    }

    res.status(200).json(ticket);
})

// Description - Create new ticket
// Route - POST api/tickets
// Access - Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if(!product || !description) {
        // Bad request
        res.status(400)
        throw new Error("Please add a product and description!");
    }

    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: "new"
    })

    // A new ticket is created successfully, so we return a 201 status.
    res.status(201).json(ticket);
})

// Description - Delete a ticket
// Route - DELETE api/tickets/:id
// Access - Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.id);

    // If ticket with the passed id does not exist.
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found!");
    }

    // Only the ticket owner can fetch their ticket.
    if(ticket.user.toString() !== req.user.id) {
        // Unauthorized user
        res.status(401);
        throw new Error("Not Authorized!");
    }
    
    await Ticket.deleteOne(ticket);

    res.status(200).json({ success: true });
})

// Description - Update a ticket
// Route - PUT api/tickets/:id
// Access - Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.id);

    // If ticket with the passed id does not exist.
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found!");
    }

    // Only the ticket owner can fetch their ticket.
    if(ticket.user.toString() !== req.user.id) {
        // Unauthorized user
        res.status(401);
        throw new Error("Not Authorized!");
    }
    
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
    )

    res.status(200).json(updatedTicket);
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}