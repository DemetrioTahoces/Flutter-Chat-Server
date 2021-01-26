const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected } = require('../controllers/socket');

io.on('connection', client => {
    const token = client.handshake.headers['authorization'];
    const uuid = validateJWT(token);

    // Verify client
    if (uuid == null) {
        return client.disconnect();
    }

    // Client authenticated
    userConnected(uuid);

    // User into room
    // client.id, 35324tg2435643526
    client.join(uuid);

    client.on('personal-message', (payload) => {
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        userDisconnected(uuid);
    });
});