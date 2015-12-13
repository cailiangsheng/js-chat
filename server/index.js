var chatLogger = require('../common/chat-logger');
var chatServer = require('./chat-server');

module.exports = function (port) {
    port = parseInt(port);
    if (!port) {
        console.log('Please specify port for server to listen');
        return;
    }

    chatLogger.enableLogging();
    chatServer(port);
}
