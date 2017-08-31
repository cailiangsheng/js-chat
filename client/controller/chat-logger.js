var events = require('../model/chat-events');

module.exports = {
    enableLogging: enableLogging
};

function enableLogging() {
    events.on(events.SOCKET_CONNECT, onSocketConnect);
    events.on(events.SOCKET_DISCONNECT, onSocketDisconnect);
    events.on(events.MESSAGE_RECEIVED, onMessageReceived);
}

function onSocketConnect() {
    console.log('Socket connected\n');
}

function onSocketDisconnect() {
    console.log('Socket disconnected\n');
}

function onMessageReceived(socket, message) {
    console.log('Message received: ' + message + '\n');
}
