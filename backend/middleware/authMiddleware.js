const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Function to protect routes.
const protectRoute = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header.
            // This will split the word "Bearer token" and with 1st index,
            // we can get the "token".
            token = req.headers.authorization.split(" ")[1];
            
            // Verify the token.
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token.
            // We need the user id but not the password.
            req.user = await User.findById(decodeToken.id).select("-password");

            // After getting the user, we will call the next middleware (if there is any).
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized");
    }
})

module.exports = { protectRoute }