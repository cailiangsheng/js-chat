var chatLogger = require('./chat-logger');
var chatUI = require('./chat-ui');
var chatClient = require('./chat-client');

init('localhost', 8888);

function init(host, port) {
    chatLogger.enableLogging();
    chatUI.handleEvents();
    chatClient(host, port);
}
