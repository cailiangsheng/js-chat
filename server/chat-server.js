var net = require('net');
var events = require('../common/chat-events');
var sockets = require('../common/chat-sockets');
var server = null;

module.exports = createChatServer;

function createChatServer(port) {
    server = net.createServer(sockets.monitor);
    monitor(server);
    server.listen(port);
}

function monitor(server) {
    server.on('listening', function () {
        events.emit(events.SERVER_LISTENING, server);
    });

    server.on('error', function (error) {
        events.emit(events.SERVER_ERROR, server, error);
    });
}