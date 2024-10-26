const errorHandler = (err, req, res, next) => {
    // status code "500" is server error.
    const statusCode = res.statusCode ? res.statusCode : 500; 
    res.status(statusCode);
    res.json({
        message: err.message,
        // We only want to send the stack trace if we are in development phase and not in production.
        stack: process.env.NODE_ENV === "production" ? null : err.stack,  
    })
}

module.exports = {errorHandler}