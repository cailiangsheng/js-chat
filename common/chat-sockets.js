
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

function monitor(socket) {
    handleConnecting(socket);
    handleReadingData(socket);
    handleDisconnecting(socket);
}

function handleConnecting(socket) {
    if (socket._connecting) {
        socket.on('connect', onConnect);
    }
    else {
        onConnect();
    }

    function onConnect() {
        sockets.push(socket);
        events.emitter.emit(events.SOCKET_CONNECT, socket);
    }
}

function handleReadingData(socket) {
    socket.on('readable', function () {
        var chunk = socket.read();
        if (chunk) {
            var message = chunk.toString('utf-8');
            events.emitter.emit(events.MESSAGE_RECEIVED, socket, message);
        }
    });
}

function handleDisconnecting(socket) {
    socket.on('end', onDisconnect);
    socket.on('error', onDisconnect);

    function onDisconnect() {
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        events.emitter.emit(events.SOCKET_DISCONNECT, socket);
    }
}
