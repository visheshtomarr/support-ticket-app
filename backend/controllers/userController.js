const asyncHandler = require("express-async-handler");

// Description - Register a new user
// Route - /api/users
// Access - Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // User's validation
    if (!name || !email || !password) {
        // If any one field is missing for validation, we return a 
        // status of 400, client error.
        res.status(400);
        // This will return the standard Error in an HTML format.
        throw new Error("Please include all fields");
    }

    res.send("Register Route");
})

// Description - Login a user
// Route - /api/users/login
// Access - Public
const loginUser = asyncHandler(async (req, res) => {
    res.send("Login Route");
})

module.exports = {
    registerUser,
    loginUser,
}