const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// Description - Get notes for a ticket
// Route - GET api/tickets/:ticketId/notes
// Access - Private
const getNotes = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not authorized!");
    }

    // Fetch the notes for a particular ticket Id from the Note schema.
    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(200).json(notes);
})

// Description - Create note for a ticket
// Route - POST api/tickets/:ticketId/notes
// Access - Private
const createNote = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not authorized!");
    }

    // Create a single note for a ticket.
    const note = await Note.create({ 
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId, 
        user: req.user.id
    });

    res.status(200).json(note);
})

module.exports = {
    getNotes,
    createNote,
}