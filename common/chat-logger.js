var events = require('../common/chat-events');

module.exports = {
    enableLogging: enableLogging
};

function enableLogging() {
    events.emitter.on(events.SOCKET_CONNECT, onSocketConnect);
    events.emitter.on(events.SOCKET_DISCONNECT, onSocketDisconnect);
    events.emitter.on(events.MESSAGE_RECEIVED, onMessageReceived);
    events.emitter.on(events.SERVER_LISTENING, onServerListening);
}

function onSocketConnect() {
    console.log("Socket connected");
}

function onSocketDisconnect() {
    console.log("Socket disconnected");
}

function onMessageReceived(socket, message) {
    console.log("Message received:", message);
}

function onServerListening(port) {
    console.log("Server listening to port:", port);
}