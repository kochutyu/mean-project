const swPostLogin = require('./sw-post-login').swPostLogin;
const swPostLogin = require('./sw-post-register').swPostRegister;

module.exports.docs = {
    "/auth": {
        "post": {
            ...swPostLogin
        },
        "patch": {
            ...swPostLogin
        }
    }
}
