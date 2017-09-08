var chatLogger = require('./controller/chat-logger');
var chatUI = require('./controller/chat-ui');
var chatClient = require('./model/chat-client');

init('ecs.zeta.name', 8888);

function init(host, port) {
    chatLogger.enableLogging();
    chatUI.handleEvents();
    chatClient(host, port);
}
