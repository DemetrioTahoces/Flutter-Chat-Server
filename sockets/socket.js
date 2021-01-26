const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, recordMessage } = require('../controllers/socket');

io.on('connection', async(client) => {
    const token = client.handshake.headers['authorization'];
    const uuid = validateJWT(token);

    // Verify client
    if (uuid == null) {
        return client.disconnect();
    }

    // Client authenticated
    await userConnected(uuid);
    client.broadcast('connected-user', {
        uuid,
    });

    // User into global room
    // client.id, 35324tg2435643526
    client.join(uuid);

    client.on('personal-message', async(payload) => {
        await recordMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', async() => {
        await userDisconnected(uuid);
        client.broadcast('disconnected-user', {
            uuid,
        });
    });
});