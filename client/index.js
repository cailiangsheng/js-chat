import chatLogger from './chat-logger';
import chatUI from './chat-ui';
import chatClient from './chat-client';

init('ecs.zeta.name', 8888);

function init(host, port) {
    chatLogger.enableLogging();
    chatUI.handleEvents();
    chatClient(host, port);
}
