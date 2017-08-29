var events = require('events');
var emitter = new events.EventEmitter();

module.exports = {
    on: emitter.on,
    emit: emitter.emit,
    SOCKET_CONNECT: 'socketConnect',
    SOCKET_DISCONNECT: 'socketDisconnect',
    MESSAGE_RECEIVED: 'messageReceived'
};
