const User = require('../models/user');
const Message = require('../models/message');

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

const recordMessage = async() => {

    try {
        const message = new Message(payload);
        await message.save();

        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    recordMessage,
}