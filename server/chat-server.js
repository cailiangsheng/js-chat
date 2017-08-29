var WebSocketServer = require('ws').Server;
var events = require('./chat-events');
var sockets = require('./chat-sockets');
var server = null;

module.exports = createChatServer;

function createChatServer(port) {
    server = new WebSocketServer({ port: port });
    monitor(server);
    sockets.monitor(server);
}

function monitor(server) {
    server.on('listening', function () {
        events.emit(events.SERVER_LISTENING, server);
    });

    server.on('error', function (error) {
        events.emit(events.SERVER_ERROR, server, error);
    });
}