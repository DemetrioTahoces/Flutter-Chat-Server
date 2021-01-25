const jwt = require('jsonwebtoken');

const generateJWT = (uuid) => {
    return new Promise((resolve, reject) => {
        const payload = { uuid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) {
                reject('Could not create token');
            } else {
                resolve(token);
            }
        });
    });
}

const validateJWT = (token = '') => {

    try {

        const { uuid } = jwt.verify(token, process.env.JWT_KEY);
        return uuid;

    } catch (e) {

        return null;
    }
}

module.exports = {
    generateJWT,
    validateJWT,
}