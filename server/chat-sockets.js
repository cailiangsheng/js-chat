
var _ = require('underscore');
var events = require('./chat-events');
var sockets = [];

module.exports = {
    monitor: monitor,
    sockets: sockets,
    socket: socket
};

function socket() {
    return _.first(sockets);
}

function monitor(server) {
    handleConnecting(server);
}

function handleConnecting(server) {
    server.on('connection', onConnect);

    function onConnect(socket) {
        sockets.push(socket);
        events.emit(events.SOCKET_CONNECT, socket);

        handleMessage(socket);
        handleDisconnecting(socket);
    }
}

function handleMessage(socket) {
    socket.on('message', function (message) {
        events.emit(events.MESSAGE_RECEIVED, socket, message);
    });
}

function handleDisconnecting(socket) {
    socket.on('close', onDisconnect);
    socket.on('error', onDisconnect);

    function onDisconnect() {
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        events.emit(events.SOCKET_DISCONNECT, socket);
    }
}
