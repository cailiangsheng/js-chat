var chatLogger = require('./chat-logger');
var chatController = require('./chat-controller');
var chatServer = require('./chat-server');

module.exports = function (port) {
    port = parseInt(port);
    if (!port) {
        console.log('Please specify port for server to listen');
        return;
    }

    chatLogger.enableLogging();
    chatController.handleEvents();
    chatServer(port);
}
