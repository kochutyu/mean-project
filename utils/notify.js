module.exports = (res, statusCode, message, body) => {
    res.status(statusCode).json({message, body});
}
