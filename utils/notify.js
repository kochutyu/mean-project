module.exports = (res, statusCode, message, body) => {
    res.status(statusCode).json({type: 'toastr', message, body});
}
