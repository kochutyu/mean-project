const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {jwtKey} = require('../config/keys');
const errorHandler = require('../utils/error-handler');
const notify = require('../utils/notify');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, jwtKey, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'password_not_matched'
            });
        }
    } else {
        try {
            res.status(404).json({
                message: 'user_not_found'
            });
        } catch (e) {
            errorHandler(res, e);
        }
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'user_already_exist'
        });
    } else {
        const salt = bcryptjs.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcryptjs.hashSync(password, salt)
        });

        try {
            await user.save();
            notify(res, 201, 'user_has_been_registered', user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
}

