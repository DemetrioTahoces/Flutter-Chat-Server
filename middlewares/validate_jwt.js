const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const validateJWT = (req = request, res = response, next) => {

    if (req.headers.authorization) {

        try {

            const token = req.headers.authorization.replace('Bearer', '').trim();

            const { uuid } = jwt.verify(token, process.env.JWT_KEY);
            req.uuid = uuid;

            next();

        } catch (e) {

            return res.status(401).json({
                ok: false,
                message: 'Unauthorized',
            });
        }

    } else {

        return res.status(401).json({
            ok: false,
            message: 'Unauthorized',
        });
    }
}

module.exports = {
    validateJWT,
}