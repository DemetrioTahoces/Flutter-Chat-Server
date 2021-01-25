const { request, response } = require("express");
const User = require('../models/user');

const getUsers = async(req = request, res = response) => {



    const users = await User.find({
        _id: {
            $ne: req.uuid,
        },
    }).sort('-online');

    return res.json({
        ok: true,
        users,
    })
}

module.exports = {
    getUsers,
}