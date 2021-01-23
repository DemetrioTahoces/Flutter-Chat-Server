var socket = io();

socket.on('connect', function() {
    console.log('Conectado al sevidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el sevidor');
});