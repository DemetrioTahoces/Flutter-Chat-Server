const User = require('../models/user');

const userConnected = async(client, uuid = '') => {

    await changeOnline(uuid, true);
    client.broadcast('connectedUser', {
        uuid
    });
}

const userDisconnected = async(client, uuid = '') => {

    await changeOnline(uuid, false);
    client.broadcast('disconnectedUser', {
        uuid
    });
}

const changeOnline = async(uuid, online) => {
    const user = await User.findById(uuid);
    user.online = online;
    await user.save();
    return user;
}

module.exports = {
    userConnected,
    userDisconnected,
}