
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
}

function handleConnecting(socket) {
    $(socket).on('open', onConnect);

    function onConnect() {
        sockets.push(socket);
        events.emit(events.SOCKET_CONNECT, socket);

        handleMessage(socket);
        handleDisconnecting(socket);
    }
}

function handleMessage(socket) {
    $(socket).on('message', function (event) {
        events.emit(events.MESSAGE_RECEIVED, socket, event.originalEvent.data);
    });
}

function handleDisconnecting(socket) {
    $(socket)
        .on('close', onDisconnect)
        .on('error', onDisconnect);

    function onDisconnect() {
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        events.emit(events.SOCKET_DISCONNECT, socket);
    }
}
