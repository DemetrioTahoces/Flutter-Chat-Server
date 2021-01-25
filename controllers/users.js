const { request, response } = require("express");
const User = require('../models/user');

const getUsers = async(req = request, res = response) => {

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 20;

    const users = await User.find({
            _id: {
                $ne: req.uuid,
            },
        }).sort('-online')
        .skip(from)
        .limit(limit);

    return res.json({
        ok: true,
        users,
    })
}

module.exports = {
    getUsers,
}