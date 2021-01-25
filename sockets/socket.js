const { validateJWT } = require('../helpers/jwt');
const { io } = require('../index');

// Mensajes de sockets
io.on('connection', client => {
    const token = client.handshake.headers['authorization'];
    const uuid = validateJWT(token);

    if (uuid == null) {
        return client.disconnect();
    }

    client.on('disconnect', () => {

    });
});