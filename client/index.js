//var chatLogger = require('../common/chat-logger');
var chatClient = require('./chat-client');

module.exports = function (port) {
    port = parseInt(port);
    if (!port) {
        console.log('Please specify port for client to connect');
        return;
    }

    //chatLogger.enableLogging();
    chatClient('localhost', port);
}