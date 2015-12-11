var events = require('events');

module.exports = {
    emitter: new events.EventEmitter(),
    SOCKET_CONNECT: 'socketConnect',
    SOCKET_DISCONNECT: 'socketDisconnect',
    MESSAGE_RECEIVED: 'messageReceived',
    SERVER_LISTENING: 'serverListening'
};