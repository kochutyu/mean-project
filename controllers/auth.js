module.exports.login = function (req, res) {
    res.status(200).json({
        mail: req.body.email,
        password: req.body.password
    })
}

module.exports.register = function (req, res) {
    res.status(200).json({
        login: 'register user'
    })
}

