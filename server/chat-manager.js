var net = require('net');
var events = require('./chat-events');
var sockets = require('./chat-sockets');
var commands = require('./chat-commands');
var messenger = require('./chat-messenger');
var server = null;;

module.exports = {
    createChatServer: createChatServer,
    handleMessages: handleMessages
};

function createChatServer(port) {
    server = net.createServer(sockets.monitor);
    server.listen(port);
    events.emitter.emit(events.SERVER_LISTENING, port);
}

function handleMessages() {
    events.emitter.on(events.MESSAGE_RECEIVED, onMessageReceived);
}

function onMessageReceived(fromSocket, message) {
    var timestamp = new Date().getTime();
    if (commands.isCommand(message)) {
        commands.execute(fromSocket, message, timestamp);
    }
    else {
        messenger.broadcast(fromSocket, message, timestamp);
    }
}