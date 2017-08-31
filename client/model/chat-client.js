var sockets = require('./chat-sockets');
var client = null;

module.exports = createChatClient;

function createChatClient(host, port) {
    client = new WebSocket(`ws://${host}:${port}`);
    sockets.monitor(client);
}