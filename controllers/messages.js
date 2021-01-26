const { response, request } = require('express');
const Message = require('../models/message');

const obtainChat = async(req = request, res = response) => {

    const myId = req.uuid;
    const messagesFrom = req.params.from;

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 20;

    const messages = await Message.find({
        $or: [{ from: myId, to: messagesFrom }, { from: messagesFrom, to: myId }],
    }).sort({
        createdAt: 'desc',
    }).skip(from).limit(limit);

    res.json({
        ok: true,
        messages
    })
}

module.exports = {
    obtainChat,
}