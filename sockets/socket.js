const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected } = require('../controllers/socket');

// Mensajes de sockets
io.on('connection', async client => {
    const token = client.handshake.headers['authorization'];
    const uuid = validateJWT(token);

    // Verify client
    if (uuid == null) {
        return client.disconnect();
    }

    // Client authenticated
    await userConnected(uuid);

    client.on('disconnect', () => {
        await userDisconnected(uuid);
    });
});