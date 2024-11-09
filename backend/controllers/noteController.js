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

// Description - Delete a note
// Route - DELETE api/tickets/:ticketId/notes/:noteId
// Access - Private
const deleteNote = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

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

    // Fetch note using noteId from req.params
    const note = await Note.findById(req.params.noteId);

    // Only the note associated with the ticket can be deleted.
    if(!note || note.ticket.toString() !== ticket.id) {
        // Note not found for the specified ticket
        res.status(404);
        throw new Error("Ticket does not have a note!");
    }
    
    await note.deleteOne();

    res.status(200).json({ success: true });
})

// Description - Update a note
// Route - PUT api/tickets/:ticketId/notes/:noteId
// Access - Private
const updateNote = asyncHandler(async (req, res) => {
    // Get user from id in the JSON Web Token.
    const user = await User.findById(req.user.id);

    if (!user) {
        // Unauthorized user
        res.status(401);
        throw new Error("User not found!");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

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

    // Fetch the note by noteId.
    const note = await Note.findById(req.params.noteId);

    // Check if the note exists and belongs to the specific ticket.
    if (!note || note.ticket.toString() !== ticket.id) {
        res.status(404);
        throw new Error("Note not found for this ticket!");
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId, 
        req.body,
        { new: true }
    )

    res.status(200).json(updatedNote);
})

module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
}