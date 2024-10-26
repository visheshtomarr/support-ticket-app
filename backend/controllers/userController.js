const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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

    // If the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password using bcryptjs.
    // Create a salt that will be the hashed string.
    const salt = await bcrypt.genSalt(10);
    // Create the hashed password using the salt.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user using hashed password.
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            // MongoDB syntax to store id.
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
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