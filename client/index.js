
var chatLogger = require('../common/chat-logger');
var chatClient = require('./chat-client');

chatLogger.enableLogging();
chatClient('localhost', 7171);