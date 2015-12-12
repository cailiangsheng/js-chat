
var chatLogger = require('../common/chat-logger');
var chatServer = require('./chat-server');

chatLogger.enableLogging();
chatServer(7171);
