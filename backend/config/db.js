const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connec = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connec.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        // If it fails to connect, it will exit the entire process.
        process.exit(1);
    }
}

module.exports = connectDB;