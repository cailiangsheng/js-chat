var events = require('events');
var emitter = new events.EventEmitter();

module.exports = {
    on: emitter.on,
    emit: emitter.emit,
    SOCKET_CONNECT: 'socketConnect',
    SOCKET_DISCONNECT: 'socketDisconnect',
    MESSAGE_RECEIVED: 'messageReceived',
    SERVER_LISTENING: 'serverListening',
    SERVER_ERROR: 'serverError',
    USER_ADDED: 'userAdded',
    USER_REMOVED: 'userRemoved',
    USER_NAME_CHANGED: 'userNameChanged',
    USER_COLOR_CHANGED: 'userColorChanged'
};
