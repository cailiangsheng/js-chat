var net = require('net');
var events = require('../common/chat-events');
var sockets = require('../common/chat-sockets');
var client = null;

module.exports = function (host, port) {
    createChatClient(host, port);
    handleMessages();
}

function createChatClient(host, port) {
    var options = {host: host, port: port};
    client = net.connect(options, function () {
        sockets.monitor(client);
    });
}

function handleMessages() {
    process.stdin.pipe(client);

    events.emitter.on(events.MESSAGE_RECEIVED, handleReceivedMessage)
}

function handleReceivedMessage(socket, message) {
    var obj = JSON.parse(message);
    console.log('[', obj.timestamp, ']', obj.message);
}