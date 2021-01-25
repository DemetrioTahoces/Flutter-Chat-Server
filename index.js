const express = require('express');
const path = require('path');
require('dotenv').config();

// Express
const app = express();

// DB config
require('./database/config').dbConnection();

// use express para API REST
app.use(express.json());

// Server de sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

// Path public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// My routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running at port ${process.env.PORT}!!!`);
});