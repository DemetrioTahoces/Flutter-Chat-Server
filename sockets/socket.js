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

    client.on('disconnect', () => {
        userDisconnected(uuid);
    });
});