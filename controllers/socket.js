const User = require('../models/user');

const userConnected = async(uuid = '') => {

    await changeOnline(uuid, true);
}

const userDisconnected = async(uuid = '') => {

    await changeOnline(uuid, false);
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