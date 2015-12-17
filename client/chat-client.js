var net = require('net');
var sockets = require('../common/chat-sockets');
var client = null;

module.exports = createChatClient;

function createChatClient(host, port) {
    var options = {host: host, port: port};
    client = net.connect(options);
    sockets.monitor(client);
}