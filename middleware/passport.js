const JwTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const {jwtKey} = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtKey
}

module.exports = passport => {
    passport.use(
        new JwTStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id');

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
}
