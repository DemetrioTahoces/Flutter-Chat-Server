const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                message: 'Email already registered',
            })
        }

        const user = new User(req.body);

        // Encrypt Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        user.online = undefined;

        return res.json({
            ok: true,
            body: user,
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: 'Speak with admin',
        });
    }
}

const loginUser = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorized',
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorized',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        user.online = undefined;

        return res.json({
            ok: true,
            body: user,
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: 'Speak with admin',
        });
    }
}

const renewToken = async(req = request, res = response) => {

    const uuid = req.uuid

    const token = await generateJWT(uuid);

    const user = await User.findById(uuid);

    user.online = undefined;

    return res.json({
        ok: true,
        body: user,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}