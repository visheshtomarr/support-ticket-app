const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Add a middleware for request's body.
// This will be used to get the data from the "POST" request.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support desk API"});
})

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// This error handler will send the error message along with the stack
// trace in a json format.
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));