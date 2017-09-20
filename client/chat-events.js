import { EventEmitter } from 'events';

const emitter = new EventEmitter();

export default {
    on: emitter.on,
    emit: emitter.emit,
    SOCKET_CONNECT: 'socketConnect',
    SOCKET_DISCONNECT: 'socketDisconnect',
    MESSAGE_RECEIVED: 'messageReceived'
};
